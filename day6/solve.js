const fs = require('fs')

let data;
try {
  data = fs.readFileSync('./answers.txt', 'utf8');
} catch (err) {
  console.error(err)
}

// part one
const answerGroups = data.split('\n\n').map(lines => lines.split('\n'));
let answerCount = 0;

// for(let group of answerGroups) {
//   let answers = new Set();
//   for (let answer of group) {
//     answer.split('').map(x => answers.add(x));
//   }
//   answerCount += answers.size;
// }
// 
// console.log(answerCount);

// part two
for(let group of answerGroups) {
  let counts = group.reduce((agg, answers) => {
    answers.split('').map(answer => {
      agg[answer] = agg[answer] || 0;
      agg[answer] += 1;
    });

    return agg;
  }, {});

  for (count in counts) {
    if (counts[count] === group.length) {
      answerCount++;
    }
  }
}

console.log(answerCount);