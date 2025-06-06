import { computeCosineSimilarity, normalizeVector, isNormalized, meanVector } from '../src/utils/similarity';

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
        const expected = (1 * 2 + 2 * 3) / (Math.sqrt(1 * 1 + 2 * 2) * Math.sqrt(2 * 2 + 3 * 3));
        expect(computeCosineSimilarity(a, b)).toBeCloseTo(expected);
    });

    test('returns 0 if one vector is zero', () => {
        expect(computeCosineSimilarity([0, 0], [1, 2])).toBe(0);
    });
});

describe('normalizeVector', () => {
    test('normalizes a 2D vector correctly', () => {
        const vec = [3, 4];
        const normalized = normalizeVector(vec);
        expect(normalized).toHaveLength(2);
        expect(normalized[0]).toBeCloseTo(0.6);
        expect(normalized[1]).toBeCloseTo(0.8);
    });

    test('normalizes a 3D vector correctly', () => {
        const vec = [1, 1, 1];
        const normalized = normalizeVector(vec);
        const length = Math.sqrt(normalized.reduce((sum, x) => sum + x * x, 0));
        expect(length).toBeCloseTo(1);
        normalized.forEach(val => {
            expect(val).toBeCloseTo(1 / Math.sqrt(3));
        });
    });

    test('returns a copy of zero vector unchanged', () => {
        const vec = [0, 0, 0];
        const normalized = normalizeVector(vec);
        expect(normalized).toEqual(vec);
        expect(normalized).not.toBe(vec);
    });

    test('handles empty vector', () => {
        const vec = [];
        const normalized = normalizeVector(vec);
        expect(normalized).toEqual([]);
    });

    test('does not modify original vector', () => {
        const vec = [5, 0];
        const copy = [...vec];
        normalizeVector(vec);
        expect(vec).toEqual(copy);
    });
});

describe('isNormalized', () => {
    test('returns true for exact unit vectors', () => {
        expect(isNormalized([1, 0, 0])).toBe(true);
        expect(isNormalized([0, 1, 0])).toBe(true);
    });

    test('returns true for approximately normalized vector within epsilon', () => {
        expect(isNormalized([0.6, 0.8])).toBe(true);
        expect(isNormalized([0.7071067, 0.7071067])).toBe(true);
    });

    test('returns false for zero vector', () => {
        expect(isNormalized([0, 0, 0])).toBe(false);
    });

    test('returns false for vector with length not close to 1', () => {
        expect(isNormalized([3, 4])).toBe(false);
        expect(isNormalized([2, 0])).toBe(false);
    });

    test('respects custom epsilon', () => {
        const vec = [0.999999, 0];
        expect(isNormalized(vec, 1e-7)).toBe(false);
        expect(isNormalized(vec, 1e-5)).toBe(true);
    });

    test('handles empty vector (length zero)', () => {
        expect(isNormalized([])).toBe(false);
    });
});


describe('meanVector', () => {
    test('computes the mean of 2D vectors correctly', () => {
        const input = [[1, 2], [3, 4], [5, 6]];
        const result = meanVector(input);
        expect(result).toEqual([3, 4]);
    });

    test('computes the mean of 1D vectors', () => {
        const input = [[1], [3], [5]];
        const result = meanVector(input);
        expect(result).toEqual([3]);
    });

    test('returns empty array for empty input', () => {
        const result = meanVector([]);
        expect(result).toEqual([]);
    });

    test('handles single vector correctly (returns same vector)', () => {
        const input = [[42, -7]];
        const result = meanVector(input);
        expect(result).toEqual([42, -7]);
    });

    test('returns precise mean for decimal values', () => {
        const input = [[0.1, 0.2], [0.3, 0.4]];
        const result = meanVector(input);
        expect(result[0]).toBeCloseTo(0.2);
        expect(result[1]).toBeCloseTo(0.3);
    });

    test('handles negative numbers properly', () => {
        const input = [[-1, -2], [-3, -4]];
        const result = meanVector(input);
        expect(result).toEqual([-2, -3]);
    });

    test('does not mutate input vectors', () => {
        const input = [[1, 2], [3, 4]];
        const copy = JSON.parse(JSON.stringify(input));
        meanVector(input);
        expect(input).toEqual(copy);
    });
});