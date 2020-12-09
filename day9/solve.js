const fs = require('fs');

let data;
try {
  data = fs.readFileSync('./input.txt', 'utf8');
} catch (err) {
  console.error(err)
}

// data = `35
// 20
// 15
// 25
// 47
// 40
// 62
// 55
// 65
// 95
// 102
// 117
// 150
// 182
// 127
// 219
// 299
// 277
// 309
// 576`;

// part one

function partOne() {
  const PREAMBLE_LENGTH = 25;
  const numbers = data.split('\n').map(x => parseInt(x));

  function sum(index, answer) {
    for (let i = index; i > (index - PREAMBLE_LENGTH - 1); i--) {
      for (let j = index; j > (index - PREAMBLE_LENGTH - 1); j--) {
        if (i === j) {
          break;
        }
    
        if (numbers[i] + numbers[j] === answer) {
          return true;
        }
      }
    }
    
    return false;
  }

  for (let i = PREAMBLE_LENGTH; i < numbers.length; i++) {
    if (!sum(i, numbers[i])) {
      console.log(`Answer is ${numbers[i]}`);
      return;
    }
  }
}

// partOne();

// data = `35
// 20
// 15
// 25
// 47
// 40
// 62
// 55
// 65
// 95
// 102
// 117
// 150
// 182
// 127
// 219
// 299
// 277
// 309
// 576`;

function partTwo() {
  const PREVIOUS_ANSWER = 1930745883;
  const numbers = data.split('\n').map(x => parseInt(x));

  for (let i = 0; i < numbers.length; i++) {
    let sum = numbers[i];

    for (let j = i; j < numbers.length; j++) {
      if (i === j) {
        continue;
      }

      sum += numbers[j];

      if (sum > PREVIOUS_ANSWER) {
        break;
      }

      if (sum === PREVIOUS_ANSWER) {
        let answers = [];
        for (let x = j; x >= i; x--) {
          answers.push(numbers[x])
        }
        console.log(Math.min(...answers), Math.max(...answers));
        console.log(`Answer is ${Math.min(...answers) + Math.max(...answers)}`);
      }
    }
  }
}

partTwo();