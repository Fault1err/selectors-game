/* eslint-disable strict */
const levels = require('./levels');

describe('levels', () => {
  test('levels should have a length more than 9', () => {
    expect(levels.default.length).toBeGreaterThan(9);
  });

  levels.default.forEach((level, i) => {
    it(`level ${i + 1} has 5 properties`, () => {
      expect(Object.keys(level).length).toBe(5);
    });
  });

  it('level should have expected properties', () => {
    const thatLevel = levels.default.find((level) => level.levNumCur === 5);
    const expectedProperties = [
      'levNumCur',
      'levName',
      'levAnswer',
      'levStrobe',
      'levBoardMarkup'
    ];
    expect(Object.keys(thatLevel)).toEqual(expect.arrayContaining(expectedProperties));
  });
});
