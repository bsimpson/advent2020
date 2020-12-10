const fs = require('fs');

let data;
try {
  data = fs.readFileSync('./input.txt', 'utf8');
} catch (err) {
  console.error(err)
}

// data = `16
// 10
// 15
// 5
// 1
// 11
// 7
// 19
// 6
// 12
// 4`;

// data = `28
// 33
// 18
// 42
// 31
// 14
// 46
// 20
// 48
// 47
// 24
// 23
// 49
// 45
// 19
// 38
// 39
// 11
// 1
// 32
// 25
// 35
// 8
// 17
// 7
// 9
// 4
// 2
// 34
// 10
// 3`;

// part one

function partOne() {
  let differences = {
    1: 1, // wall to device is one difference
    2: 0,
    3: 1, // last adapter to device is three difference
  }

  const sortedNumbers = data.split('\n').map(x => parseInt(x)).sort((a,b) => a-b);

  for (let i = 0; i < sortedNumbers.length - 1; i++) {
    let difference = sortedNumbers[i + 1] - sortedNumbers[i];
    differences[difference]++;
  }

  console.log(differences);
  console.log(differences[1] * (differences[2] || 1) * differences[3]);
}
// 220 - too low
// 2368

// partOne();

// part two

function partTwo() {

  const sortedNumbers = [0, ...data.split('\n').map(x => parseInt(x)).sort((a,b) => a-b)];
  let validCombinations = 0;

  // [ 1, 4, 5, 6, 7, 10, 11, 12, 15, 16, 19 ]
  function recurse(index = 0, array = []) {
    // debugger

    if (index >= sortedNumbers.length - 1) {
      // console.log(array)
      validCombinations++;
      return array;
    }

    // returns 1-3 entity arrays
    let validDifferences = [];
    if ((sortedNumbers[index + 1] - sortedNumbers[index]) <= 3) { // within difference of three
      validDifferences.push(recurse(index + 1, array.concat(sortedNumbers[index + 1])));
    }

    if ((sortedNumbers[index + 2] - sortedNumbers[index]) <= 3) { // within difference of three
      validDifferences.push(recurse(index + 2, array.concat(sortedNumbers[index + 2])));
    }

    if ((sortedNumbers[index + 3] - sortedNumbers[index]) <= 3) { // within difference of three
      validDifferences.push(recurse(index + 3, array.concat(sortedNumbers[index + 3])));
    }

    return validDifferences;
  }

  recurse();
  console.log(validCombinations);
}

partTwo();