const assert = require('assert');
const subject = require('../solve.js');

const partOneData = `class: 1-3 or 5-7
row: 6-11 or 33-44
seat: 13-40 or 45-50

your ticket:
7,1,14

nearby tickets:
7,3,47
40,4,50
55,2,20
38,6,12`;

const partTwoData = `class: 0-1 or 4-19
row: 0-5 or 8-19
seat: 0-13 or 16-19

your ticket:
11,12,13

nearby tickets:
3,9,18
15,1,5
5,14,9`;

describe('solve', function() {
  describe('rangesObject', function() {
    it('has ranges', function() {
      const results = subject.rangesObject(partOneData);
      assert.deepStrictEqual(results.class, [[1,3], [5,7]]);
      assert.deepStrictEqual(results.row, [[6,11], [33,44]]);
      assert.deepStrictEqual(results.seat, [[13,40], [45,50]]);
    });
  });

  describe('nearbyTickets', function() {
    it('has array of values', function() {
      assert.deepStrictEqual(subject.nearbyTickets(partOneData), [
        [7,3,47],
        [40,4,50],
        [55,2,20],
        [38,6,12],
      ]);
    });
  });

  describe('partOne', function() {
    it('returns sum of invalid values', function() {
      assert.strictEqual(subject.partOne(partOneData), 71);
    });
  });

  describe('filteredTickets', function() {
    it('returns product of destination fields', function() {
      assert.deepStrictEqual(subject.filteredTickets(partOneData), [
        [7,3,47]
      ]);
    });
  });

  describe('determineRangePositions', function() {
    it('returns ticket position for each rule', function() {
      assert.deepStrictEqual(subject.determineRangePositions(partTwoData), {
        row: 0,
        class: 1,
        seat: 2,
      });
    });
  });

  describe('myTicket', function() {
    it('returns my ticket values', function() {
      assert.deepStrictEqual(subject.myTicket(partTwoData), [
        11,12,13
      ]);
    });
  });

  describe('partTwo', function() {
    it('returns the product of departure fields', function() {
      assert.strictEqual(subject.partTwo(partTwoData, /^class.*/), 12);
      assert.strictEqual(subject.partTwo(partTwoData, /^row.*/), 11);
      assert.strictEqual(subject.partTwo(partTwoData, /s/), 156);
      assert.strictEqual(subject.partTwo(partTwoData, /.*/), 1716);
    });
  });

  describe('unambiguate', function() {
    it('returns correct positions', function() {
      let rangePositions = {
        "class": [
          1,
          2,
        ],
        "row": [
          0,
          1,
          2,
        ],
        "seat": [
          2,
        ],
      }

      assert.deepStrictEqual(subject.unambiguate(rangePositions), {
        row: 0,
        class: 1,
        seat: 2,
      });
    });
  })
});
