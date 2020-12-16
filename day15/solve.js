function partOne() {
  const TURNS = 2020;

  const startingNumbers = [10,16,6,0,1,17];
  let history = {};

  startingNumbers.map((x, i) => {
    history[x] = [NaN, i + 1]
    console.log(`Turn ${i + 1} - number spoken ${x}`);
  });

  let lastNumber = startingNumbers[startingNumbers.length - 1];

  // start the turn after the starting numbers
  for (let i = startingNumbers.length + 1; i <= TURNS; i++) {

    // "first time the number had been spoken"
    if (isNaN(history[lastNumber][0])) {
      lastNumber = 0;
    } else {
      // take the pentultimate time it was called and subtract last time it was called
      lastNumber = history[lastNumber][1] - history[lastNumber][0];
    }

    console.log(`Turn ${i} - number spoken ${lastNumber}`);

    if (!history[lastNumber]) {
      // first time we've seen this number
      history[lastNumber] = [NaN, i];
    } else {
      // set the pentultimate call to the last call
      history[lastNumber][0] = history[lastNumber][1];
      // set the last call to this turn
      history[lastNumber][1] = i;
    }
  }
}

partOne();