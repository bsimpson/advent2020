const fs = require('fs')

let data;
try {
  data = fs.readFileSync('./seats.txt', 'utf8').split('\n');
} catch (err) {
  console.error(err)
}

// part one
// data = ['BBFFBBFRLL'];
let seatIds = [];

for (datum of data) {
  let rowDirections = datum.substr(0, 7).split('');
  let seatDirections = datum.substr(7, 10).split('');

  let row = bisect(0, 127, rowDirections);
  let seat = bisect(0, 7, seatDirections);
  let seatId = row * 8 + seat;
  seatIds.push(parseInt(seatId));
}
seatIds = seatIds.sort((a, b) => a - b);
// console.log(seatIds[seatIds.length - 1]);

function bisect(lower, upper, rowDirections, rowIndex = 0) {
  if (lower === upper) {
    return lower;
  }

  if (['F', 'L'].includes(rowDirections[rowIndex])) {
    return bisect(lower, Math.floor([lower + upper] / 2), rowDirections, rowIndex + 1);
  } else {
    return bisect(Math.round((lower + upper) / 2), upper, rowDirections, rowIndex + 1);
  }
}

// part two
// let missing = new Array(seatIds.length);
for (let i = 0; i < seatIds.length; i++) {
  if ((seatIds[i] + 1) !== seatIds[i + 1]) {
    console.log(seatIds[i] + 1)
  }
}