const { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } = require('constants');
const { resolve } = require('dns');
const fs = require('fs')

let data;
try {
  data = fs.readFileSync('./bags.txt', 'utf8');
} catch (err) {
  console.error(err)
}

// data = `light red bags contain 1 bright white bag, 2 muted yellow bags.
// dark orange bags contain 3 bright white bags, 4 muted yellow bags.
// bright white bags contain 1 shiny gold bag.
// muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
// shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
// dark olive bags contain 3 faded blue bags, 4 dotted black bags.
// vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
// faded blue bags contain no other bags.
// dotted black bags contain no other bags.`;

// part one
const tester = new RegExp(/(?<target>.*) bags contain (?<contents>.*)?./);
const eachContentTester = new RegExp(/(?<amount>\d*) ?(?<content>[\w ]*) bags?\.?/);
const WINNING_COLOR = 'shiny gold';
const answerColors = new Set();

const bagRules = {};

data.split('\n').forEach((datum) => {
  const results = datum.match(tester);
  bagRules[results.groups.target] = [];
  results.groups.contents.split(', ').forEach((content => {
    const results2 = content.match(eachContentTester);
    const key = results2.groups.content;

    if (key != 'no other') {
      bagRules[results.groups.target].push(key);
    }
  }));
});

for (let color of [].concat(...Object.keys(bagRules), ...Object.values(bagRules))) {
  if (resolveColor(color) && color !== WINNING_COLOR) {
    answerColors.add(color);
  };
}

function resolveColor(color) {
  if (!bagRules[color]) {
    return false;
  }

  if (bagRules[color].includes(WINNING_COLOR)) {
    return true;
  } else {
           // flatten                  // recursion               // any
    return [].concat(...bagRules[color].map(x => resolveColor(x))).filter(x => x).length > 0;
  }
}

// console.log(answerColors.size);

// part two
data.split('\n').forEach((datum) => {
  const results = datum.match(tester);
  bagRules[results.groups.target] = {};
  results.groups.contents.split(', ').forEach((content => {
    const results2 = content.match(eachContentTester);
    const key = results2.groups.content;

    if (key != 'no other') {
      bagRules[results.groups.target][key] = parseInt(results2.groups.amount);
    }
  }));
});


function counter(color) {
  let bags = Object.values(bagRules[color]).reduce((agg, x) => { return agg + x}, 0)
  return bags + Object.keys(bagRules[color]).map(content => {
    return bagRules[color][content] * counter(content);
  }).reduce((agg, x) => { return agg + x }, 0)
}


console.log(counter(WINNING_COLOR));