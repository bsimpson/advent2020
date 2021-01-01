const assert = require('assert');
const subject = require('../solve.js');

const data = `class: 1-3 or 5-7
row: 6-11 or 33-44
seat: 13-40 or 45-50

your ticket:
7,1,14

nearby tickets:
7,3,47
40,4,50
55,2,20
38,6,12`;

describe('solve', function() {
  describe('rangesObject', function() {
    it('has ranges', function() {
      const results = subject.rangesObject(data);
      assert.deepStrictEqual(results.class, [[1,3], [5,7]]);
      assert.deepStrictEqual(results.row, [[6,11], [33,44]]);
      assert.deepStrictEqual(results.seat, [[13,40], [45,50]]);
    });
  });

  describe('nearbyTickets', function() {
    it('has array of values', function() {
      assert.deepStrictEqual(subject.nearbyTickets(data), [7,3,47,40,4,50,55,2,20,38,6,12]);
    });
  });

  describe('partOne', function() {
    it('returns sum of invalid values', function() {
      assert.strictEqual(subject.partOne(data), 71);
    });
  });
});
