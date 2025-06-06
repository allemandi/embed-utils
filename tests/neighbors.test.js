import { findNearestNeighbors, rankBySimilarity } from '../src/utils/neighbors';

describe('findNearestNeighbors', () => {
    const samples = [
        { embedding: [1, 0], label: 'A' },
        { embedding: [0, 1], label: 'B' },
        { embedding: [1, 1], label: 'C' },
    ];
    test('returns the closest sample by default', () => {
        const input = [1, 0];
        const result = findNearestNeighbors(input, samples);
        expect(result.length).toBe(1);
        expect(result[0].label).toBe('A');
    });
    test('returns top K results', () => {
        const input = [1, 1];
        const result = findNearestNeighbors(input, samples, { topK: 2 });
        expect(result.length).toBe(2);
        expect(result[0].label).toBe('C');
    });
    test('filters by threshold', () => {
        const input = [1, 0];
        const result = findNearestNeighbors(input, samples, { threshold: 0.9 });
        expect(result.length).toBe(1);
        expect(result[0].label).toBe('A');
    });
    test('returns empty if no samples meet threshold', () => {
        const input = [-1, 0];
        const result = findNearestNeighbors(input, samples, { threshold: 1 });
        expect(result.length).toBe(0);
    });
});

describe('rankBySimilarity', () => {
    const samples = [
        { embedding: [1, 0], label: 'A' },
        { embedding: [0, 1], label: 'B' },
        { embedding: [1, 1], label: 'C' },
    ];
    test('ranks samples by cosine similarity to [1, 0]', () => {
        const results = rankBySimilarity([1, 0], samples);

        expect(results.length).toBe(samples.length);
        expect(results[0].label).toBe('A');
        expect(results[0].similarityScore).toBeCloseTo(1);
        expect(results[results.length - 1].label).toBe('B');
        expect(results[results.length - 1].similarityScore).toBeCloseTo(0);
    });
    test('ranks samples by cosine similarity to [0, 1]', () => {
        const results = rankBySimilarity([0, 1], samples);

        expect(results[0].label).toBe('B');
        expect(results[0].similarityScore).toBeCloseTo(1);
        expect(results[1].label).toBe('C');
        expect(results[1].similarityScore).toBeCloseTo(0.707);
    });
    test('ranks samples with opposite vector [-1, 0]', () => {
        const results = rankBySimilarity([-1, 0], samples);

        expect(results[0].label).toBe('B');
        expect(results[0].similarityScore).toBeCloseTo(0);
        expect(results[results.length - 1].label).toBe('A');
        expect(results[results.length - 1].similarityScore).toBeCloseTo(-1);
    });
    test('handles zero vector query gracefully', () => {
        const results = rankBySimilarity([0, 0], samples);
        for (const res of results) {
            expect(res.similarityScore).toBe(0);
        }
    });
    test('returns empty array if samples is empty', () => {
        const results = rankBySimilarity([1, 0], []);
        expect(results).toEqual([]);
    });
});