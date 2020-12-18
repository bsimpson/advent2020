const fs = require('fs');

let data;
try {
  data = fs.readFileSync('./input.txt', 'utf8');
} catch (err) {
  console.error(err)
}

// data = `1 + 2 * 3 + 4 * 5 + 6`;
// data = `1 + (2 * 3) + (4 * (5 + 6))`;
// data = `2 * 3 + (4 * 5)`;
// data = `5 + (8 * 3 + 9 + 3 * 4 * 3)`;
// data = `5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))`;
// data = `((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2`;

function partOne() {
  const expressions = data.split('\n');

  let answer = expressions.reduce((sum, expression) => {
    // give the entire expression on outermost grouping of parens to resolve starting point
    return sum += innerParens(`(${expression})`);
  }, 0)
  console.log(answer);
}

function innerParens(expression) {
  // debugger

  // exit when the expression is a single number
  if (expression.match(/^\d*$/)) {
    return parseInt(expression);
  }

  let match = expression.match(/\((?!.*\()([^\)]*)\)/);

  if (match) {
    return innerParens(expression.replace(match[0], solver(match[1])));
  } else {
    return solver(expression);
  }
}

function solver(expression) {
  // exit when the expression is a single number
  if (expression.match(/^\d*$/)) {
    return expression;
  }

  // TODO match parens
  let [matched, leftHand, operation, rightHand] = expression.match(/(\d*) ([\*\+]) (\d*)/).slice(0, 4);
  leftHand = parseInt(leftHand);
  rightHand = parseInt(rightHand);

  if (isNaN(leftHand)) {
    console.error(`Invalid number ${leftHand}`);
  }

  if (isNaN(rightHand)) {
    console.error(`Invalid number ${rightHand}`);
  }

  let sum = 0;

  switch (operation) {
    case '+':
      sum = leftHand + rightHand;
      break;
    case '*':
      sum = leftHand * rightHand;
      break;
    default:
      console.error(`Unknown operation ${operation}`);
  }

  // recurse, replacing this expression with the product
  return solver(expression.replace(matched, sum));
}

partOne();