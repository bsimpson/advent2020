const fs = require('fs');

let data;
try {
  data = fs.readFileSync(require('path').join(process.cwd(), 'input.txt') , 'utf8');
} catch (err) {
  console.error(err)
}

function partOne(input = data) {
  let invalidValues = [];
  let values = nearbyTickets(input);
  for(let value of values) {
    let match = false;

    let ranges = rangesObject(input);

    for(let rule in ranges) {
      ranges[rule].forEach(([min, max]) => {
        if (value >= min && value <= max) {
          match = true;
        }
      })
    }

    if (!match) // this value didn't fit in any range
      invalidValues.push(value);
  }

  return invalidValues.reduce((agg, x) => {
    return agg + x;
  }, 0);
}

function rangesObject(input = data) {
  let rangesObject = {};

  let sections = input.split('\n\n');
  let rules = sections[0].split('\n');
  for(let rule of rules) {
    let [name, ranges] = rule.split(': ');
    ranges = ranges.split(' or ').map(r => r.split('-').map(v => parseInt(v))); // [[1,3], [5,7]]

    rangesObject[name] = ranges;
  }

  return rangesObject;
}

function nearbyTickets(input = data) {
  let sections = input.split('\n\n');
  let seats = sections[2].split('\n');
  let allSeats = [];

  for(let seat of seats) {
    if (seat === 'nearby tickets:')
      continue;

    allSeats.push(...seat.split(',').map(v => parseInt(v)));
  }

  return allSeats;
}

module.exports = {
  rangesObject,
  nearbyTickets,
  partOne,
}