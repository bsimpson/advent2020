const fs = require('fs')

let data;
let valid;
try {
  data = fs.readFileSync('./passwords.txt', 'utf8')
} catch (err) {
  console.error(err)
}

lines = data.split('\n');


// part one

// '6-10 s: snkscgszxsssscss'
// valid = 0;
// for (const line of lines) {
//   let [range, requirement, password] = line.split(' ');

//   let [min, max] = range.split('-');
//   requirement = requirement.substr(0, 1) // strip off :
//   let remainder = password.split('').filter(x => x === requirement);

//   if (remainder.length >= min && remainder.length <= max) {
//     valid++
//     console.log("VALID", line);
//   } else {
//     console.log("INVALID", line);
//   }
// }

// console.log(valid);

// part two
valid = 0;
for (const line of lines) {
  let [range, requirement, password] = line.split(' ');

  let [first, second] = range.split('-');
  requirement = requirement.substr(0, 1) // strip off :

  // debugger
  if (password[parseInt(first) - 1] === requirement ^ password[parseInt(second) - 1] === requirement) {
    valid++
    console.log("VALID", line);
  } else {
    console.log("INVALID", line);
  }
}

console.log(valid);
