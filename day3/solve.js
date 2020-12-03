const fs = require('fs')

let data;
try {
  data = fs.readFileSync('./trees.txt', 'utf8')
} catch (err) {
  console.error(err)
}

// .#.#....###..#.#..............#
// #......#####..##.##.#.......#.#
// .###.....#..#.#..#..#.#......#.
// .........##.#.....#.#..........
// ........##....#.......#.#..#..#
// #.#..####...#.....#.#.#...#....
// #....#...#.........#.....#..#.#
// .#..........#..#.............#.
// ...##..##..#...####.#.#.#.#....
// .#...####............##....#...
// ..##.....#.#......#......#.#.#.
lines = data.split('\n');
const treesArray = [];
for (line of lines) {
  treesArray.push(line.split(''));
};

// part one
// let position = [0,0]; // [right, down]
// let trees = 0;
// while (position[1] < lines.length - 1) {
//   // walk down the slope
//   position[0] = ((position[0] + 3) % 31);
//   position[1] += 1;

//   if (treesArray[position[1]][position[0]] === '#') {
//     trees++;
//   }

//   // let foo = [].concat(treesArray[position[1]]);
//   // foo[position[0]] = `\x1b[36m${foo[position[0]]}\x1b[0m`;
//   // console.log(foo.join(''))
//   // console.log({position})
//   // console.log(treesArray[position[1]][position[0]])
//   // console.log({trees})
//   // debugger

// }

// console.log(trees);

// part two
let position = [0,0]; // [right, down]
let trees = 0;
while (position[1] < lines.length - 1) {
  // walk down the slope
  position[0] = ((position[0] + 1) % 31);
  position[1] += 2;

  if (treesArray[position[1]][position[0]] === '#') {
    trees++;
  }
}

console.log(trees);

// 1,1 = 88
// 3,1 = 145
// 5,1 = 71
// 7,1 = 90
// 1,2 = 42

console.log(88 * 145 * 71 * 90 * 42)