const fs = require('fs');

let data;
try {
  data = fs.readFileSync('./input.txt', 'utf8');
} catch (err) {
  console.error(err)
}

// data = `F10
// N3
// F7
// R90
// F11`;

function partOne() {
  let instructions = data.split('\n');
  let direction = 'E';
  let east = 0;
  let north = 0;

  let maxNS = 0;
  let maxEW = 0;

  let i;

  for (let instruction of instructions) {
    let action = instruction.substr(0, 1);
    let amount = parseInt(instruction.substr(1));

    // debugger
    
    switch (action) {
      case 'N':
        north += amount;
        break;
      case 'S':
        north -= amount;
        break;
      case 'E':
        east += amount;
        break;
      case 'W':
        east -= amount;
        break;
      case 'L':
        const turnLeft = {
          'N': 'W',
          'W': 'S',
          'S': 'E',
          'E': 'N',
        }
        i = amount / 90;
        while(i > 0) {
          direction = turnLeft[direction];
          i--;
        }
        break;
      case 'R':
        const turnRight = {
          'N': 'E',
          'E': 'S',
          'S': 'W',
          'W': 'N',
        }
        i = amount / 90;
        while(i > 0) {
          direction = turnRight[direction];
          i--;
        }
        break;
      case 'F':
        if (direction === 'N') {
          north += amount;
        } else if (direction === 'E') {
          east += amount;
        } else if (direction === 'S') {
          north -= amount;
        } else if (direction === 'W') {
          east -= amount;
        }
        break;
      default:
        console.error(`Problem parsing ${action}${amount}`);
    }

    // if (Math.abs(east) > maxEW) {
    //   maxEW = Math.abs(east);
    // }

    // if (Math.abs(north) > maxNS) {
    //   maxNS = Math.abs(north);
    // }
  }

  debugger
  // console.log(maxEW + maxNS);
  console.log(Math.abs(east) + Math.abs(north));
}

partOne();
// 1140 too low
// 3089 too high