const fs = require('fs');

let data;
try {
  data = fs.readFileSync('./input.txt', 'utf8');
} catch (err) {
  console.error(err)
}

// data = `L.LL.LL.LL
// LLLLLLL.LL
// L.L.L..L..
// LLLL.LL.LL
// L.LL.LL.LL
// L.LLLLL.LL
// ..L.L.....
// LLLLLLLLLL
// L.LLLLLL.L
// L.LLLLL.LL`;

function partOne() {
  const FLOOR = '.';
  const EMPTY = 'L';
  const OCCUPIED = '#';

  let iterations = 0;
  let grid = data.split('\n').map(x => x.split(''));
  let changed = true;
  
  while (changed) {
    changed = false; // reset - JS can't compare arrays so we have this boolean to indicate a change
    let gridCopy = JSON.parse(JSON.stringify(grid)); // gross but we need a deep clone

    for(let i = 0; i < grid.length; i++) {
      for(let j = 0; j < grid[i].length; j++) {
  
        if (grid[i][j] === EMPTY) {
          if (willBecomeOccupied(i, j)) {
            gridCopy[i][j] = OCCUPIED;
            changed = true;
          }
        } else if (grid[i][j] === OCCUPIED) {
          if (willBecomeEmpty(i, j)) {
            gridCopy[i][j] = EMPTY;
            changed = true;
          }
        }
      }
    }

    grid = gridCopy;
    iterations++;
  }

  // console.log(grid.map(row => row.join('')))
  console.log(grid.map(row => row.join('')));
  let totalOccupied = 0;
  for(let i = 0; i < grid.length; i++) {
    for(let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === OCCUPIED) {
        totalOccupied++;
      }
    }
  }
  console.log(`Total occupied: ${totalOccupied}`)

  // If a seat is empty (L) and there are no occupied seats adjacent to it, the seat becomes occupied.
  function willBecomeOccupied(row, col) {
    let spacesToCheck = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      // itself
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];

    let occupiedAdjacentSeat = false;
    for(let space of spacesToCheck) {
      let adjacentSeatRow = row + space[0];
      let adjacentSeatColumn = col + space[1];

      if (grid[adjacentSeatRow] && grid[adjacentSeatRow][adjacentSeatColumn] === OCCUPIED) {
        occupiedAdjacentSeat = true;
      }
    }

    // if no adjacent seats are occupied - so it will become occupied
    return !occupiedAdjacentSeat;
  }

  // If a seat is occupied (#) and four or more seats adjacent to it are also occupied, the seat becomes empty.
  function willBecomeEmpty(row, col) {
    let spacesToCheck = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      // itself
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];

    let numberOfOccupiedAdjacentSeats = 0;
    for(let space of spacesToCheck) {
      let adjacentSeatRow = row + space[0];
      let adjacentSeatColumn = col + space[1];

      if (grid[adjacentSeatRow] && grid[adjacentSeatRow][adjacentSeatColumn] === OCCUPIED) {
        numberOfOccupiedAdjacentSeats++;
      }
    }

    // four or more seats adjacent to it are also occupied, the seat becomes empty.
    return numberOfOccupiedAdjacentSeats >= 4;
  }
}

partOne()