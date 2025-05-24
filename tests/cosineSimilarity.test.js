const computeCosineSimilarity = require('../src/computeCosineSimilarity');

describe('computeCosineSimilarity', () => {
  test('returns 1 for identical vectors', () => {
    const a = [1, 2, 3];
    const b = [1, 2, 3];
    expect(computeCosineSimilarity(a, b)).toBeCloseTo(1);
  });

  test('returns 0 for orthogonal vectors', () => {
    const a = [1, 0];
    const b = [0, 1];
    expect(computeCosineSimilarity(a, b)).toBeCloseTo(0);
  });

  test('returns correct value for simple example', () => {
    const a = [1, 2];
    const b = [2, 3];
    const expected = (1*2 + 2*3) / (Math.sqrt(1*1 + 2*2) * Math.sqrt(2*2 + 3*3));
    expect(computeCosineSimilarity(a, b)).toBeCloseTo(expected);
  });

  test('returns 0 if one vector is zero', () => {
    expect(computeCosineSimilarity([0, 0], [1, 2])).toBe(0);
  });
});
