const fs = require('fs');

let data;
try {
  data = fs.readFileSync(require('path').join(process.cwd(), 'input.txt') , 'utf8');
} catch (err) {
  console.error(err)
}

function partOne(input = data) {
  let invalidValues = [];
  let values = [].concat(...nearbyTickets(input));
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

function filteredTickets(input = data) {
  let tickets = nearbyTickets(input);
  let ranges = rangesObject(input);

  return tickets.filter(ticket => {
    return ticket.every(value => {
      let match = false;
      for(let rule in ranges) {
        ranges[rule].forEach(([min, max]) => {
          if (value >= min && value <= max) {
            match = true;
          }
        });
      }
      return match;
    });
  });
}

function determineRangePositions(input = data) {
  let ranges = rangesObject(input);
  let tickets = filteredTickets(input);
  let rangePositions = {};

  // for each rule
  for (let rule in ranges) {

    // for each ticket position
    for(let x=0; x < tickets[0].length; x++) {

      // do all values at this ticket position match a rule?
      let result = tickets.every(ticket => {
        let value = ticket[x];
        let match = false;
  
        ranges[rule].forEach(([min, max]) => {
          if (value >= min && value <= max) {
            match = true;
          }
        });

        return match;
      });

      // if they all match, mark that rule with the possible ticket position
      if (result) {
        rangePositions[rule] = rangePositions[rule] || [];
        rangePositions[rule].push(x);
        // break;
      }
    }
  }

  return unambiguate(rangePositions);
}

function unambiguate(rangePositions) {
  if (Object.values(rangePositions).every(positions => positions.length === 1)) {
    // takes a value like { "class": [1] } and converts to { "class": 1 }
    for(let rule in rangePositions) {
      rangePositions[rule] = rangePositions[rule][0];
    }

    return rangePositions;
  }

  let definitiveRule;
  while (!definitiveRule) {
    for (let rule in rangePositions) {
      // find a rule with only one position
      // in which at least one other rule contains the same value
      if (rangePositions[rule].length === 1 &&
      [].concat(...Object.values(rangePositions)).filter(x => x === rangePositions[rule][0]).length > 1) {
        definitiveRule = rule;
      }
    }
  }
  let definitePosition = rangePositions[definitiveRule][0];

  for (let rule in rangePositions) {
    if (rule === definitiveRule) {
      continue;
    }
    rangePositions[rule] = rangePositions[rule].filter(position => position !== definitePosition);
  }

  try {
    return unambiguate(rangePositions);
  } catch(err) {
    console.error(err)
  }
}
// guessed  453459307723 - correct
// guessed 1382560228363 - too high
function partTwo(input = data, ruleMatch = /^departure.*/) {
  let rangePositions = determineRangePositions(input);
  let ticket = myTicket(input);
  let product = 1;

  for(let rule in rangePositions) {
    if (rule.match(ruleMatch)) {
      // console.log(rule)
      // console.log(ticket[rangePositions[rule]])
      product *= ticket[rangePositions[rule]];
    }
  }

  return product;
}

function myTicket(input = data) {
  let sections = input.split('\n\n');
  return sections[1].split('\n')[1].split(',').map(x => parseInt(x));
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

    allSeats.push(seat.split(',').map(v => parseInt(v)));
  }

  return allSeats;
}

module.exports = {
  rangesObject,
  nearbyTickets,
  partOne,
  filteredTickets,
  determineRangePositions,
  myTicket,
  partTwo,
  unambiguate,
}