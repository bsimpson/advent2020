const fs = require('fs');

let data;
try {
  data = fs.readFileSync('./input.txt', 'utf8');
} catch (err) {
  console.error(err)
}

// data = `mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
// mem[8] = 11
// mem[7] = 101
// mem[8] = 0`;

function partOne() {
  const lines = data.split('\n');
  let mask;
  let mem = new Array();

  for (line of lines) {
    // debugger
    let [operation, value] = line.split(' = ');
    if (operation === 'mask') {
      mask = value.split('').map(x => x === 'X' ? 'X' : parseInt(x));
    } else {
      let index = parseInt(operation.match(/mem\[(\d*)\]/)[1]);
      let padValue = decbin(value).padStart(36, 0).split('').map(x => parseInt(x));
      let result = new Array(36);

      for (let i = 0; i < mask.length; i++) {
        switch(mask[i]) {
          case 'X':
            result[i] = padValue[i];
            break;
          case 0:
            result[i] = 0;
            break;
          case 1:
            result[i] = 1;
            break;
          default:
            console.log(`Unrecognized value ${mask[i]}`);
        }
      }

      mem[index] = parseInt(result.join(''), 2);
    }
  }

  console.log(mem.reduce((agg, x) => agg + x));
}

// https://stackoverflow.com/questions/9939760/how-do-i-convert-an-integer-to-binary-in-javascript
const decbin = nbr => {
  if(nbr < 0){
     nbr = 0xFFFFFFFF + nbr + 1
  }
  return parseInt(nbr, 10).toString(2)
};


partOne();