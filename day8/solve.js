const fs = require('fs')

let data;
try {
  data = fs.readFileSync('./input.txt', 'utf8');
} catch (err) {
  console.error(err)
}

// data = `nop +0
// acc +1
// jmp +4
// acc +3
// jmp -3
// acc -99
// acc +1
// jmp -4
// acc +6`;

// part one

const defaultInstructions = data.split('\n');

function walk(instructions) {
  let accumulator = 0;
  const instructionsAudit = new Array(instructions.length).fill(false);

  for (let i = 0; i < instructions.length; i++) {
    // debugger
  
    // check if the instructions has been run before
    // if so print accumulator value and exit
    if (instructionsAudit[i] && i < instructions.length) {
      // console.log(`About to repeat step ${i}: ${instructionsAudit[i]}`);
      // console.log({ accumulator });
      throw `About to repeat non-last step ${i} - accumulator at ${accumulator}`;
    }
    
    instructionsAudit[i] = true;
    
    let [operation, value] = instructions[i].split(' ');
    value = parseInt(value);
  
    switch(operation) {
      case 'nop':
        // no op
        break;
      case 'acc':
        accumulator += value;
        break;
      case 'jmp':
        i += value - 1; // -1 because the iterator will add 1
        break;
      default:
        console.error(`Unrecognized operation ${operation}`);
    }
  }

  return accumulator;
}

// walk(defaultInstructions)

// part two

function changeJmpToNop() {
  for(let i = 0; i < defaultInstructions.length; i++) {
    const instructionsClone = [].concat(defaultInstructions);

    if (instructionsClone[i].match(/jmp/)) {
      instructionsClone[i] = instructionsClone[i].replace('jmp', 'nop');
      try {
        console.log(`Solved with ${walk(instructionsClone)}`);
      } catch (e) {
        console.error(e);
      }
    }
  }
}

function changechangeNopToJmp() {
  for(let i = 0; i < defaultInstructions.length; i++) {
    const instructionsClone = [].concat(defaultInstructions);

    if (instructionsClone[i].match(/nop/)) {
      instructionsClone[i] = instructionsClone[i].replace('nop', 'jmp');
      try {
        console.log(`Solved with ${walk(instructionsClone)}`);
      } catch (e) {
        console.error(e);
      }
    }
  }
}

changeJmpToNop();
changechangeNopToJmp();