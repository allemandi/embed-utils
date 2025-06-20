import { findNearestNeighbors, rankBySimilarity } from '../src/utils/neighbors';

describe('findNearestNeighbors', () => {
    const samples = [
        { embedding: [1, 0], label: 'A' },
        { embedding: [0, 1], label: 'B' },
        { embedding: [1, 1], label: 'C' },
    ];
    describe('cosine similarity (default)', () => {
        test('returns the closest sample by default', () => {
            const input = [1, 0];
            const result = findNearestNeighbors(input, samples);
            expect(result.length).toBe(1);
            expect(result[0].label).toBe('A');
            expect(result[0].similarityScore).toBeCloseTo(1);
        });
        test('returns top K results', () => {
            const input = [1, 1];
            const result = findNearestNeighbors(input, samples, { topK: 2 });
            expect(result.length).toBe(2);
            expect(result[0].label).toBe('C');
            expect(result[0].similarityScore).toBeCloseTo(1);
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
        test('explicit method specification', () => {
            const input = [1, 0];
            const result = findNearestNeighbors(input, samples, { method: 'cosine' });
            expect(result[0].label).toBe('A');
            expect(result[0].similarityScore).toBeCloseTo(1);
            expect(result[0].distance).toBeUndefined();
        });
    });

    describe('euclidean distance', () => {
        test('returns closest sample by euclidean distance', () => {
            const input = [1, 0];
            const result = findNearestNeighbors(input, samples, { method: 'euclidean' });
            expect(result.length).toBe(1);
            expect(result[0].label).toBe('A');
            expect(result[0].distance).toBeCloseTo(0);
            expect(result[0].similarityScore).toBeUndefined();
        });
        test('returns top K results by euclidean distance', () => {
            const input = [1, 0];
            const result = findNearestNeighbors(input, samples, { method: 'euclidean', topK: 2 });
            expect(result.length).toBe(2);
            expect(result[0].label).toBe('A');
            expect(result[1].label).toBe('C');
            expect(result[0].distance).toBeCloseTo(0);
            expect(result[1].distance).toBeCloseTo(1);
        });
        test('filters by distance threshold', () => {
            const input = [1, 0];
            const result = findNearestNeighbors(input, samples, { method: 'euclidean', threshold: 1.5 });
            expect(result.length).toBe(3);
            expect(result[0].distance).toBeCloseTo(0);
            expect(result[1].distance).toBeCloseTo(1);
        });
        test('filters out samples beyond distance threshold', () => {
            const input = [1, 0];
            const result = findNearestNeighbors(input, samples, { method: 'euclidean', threshold: 0.5 });
            expect(result.length).toBe(1);
            expect(result[0].label).toBe('A');
        });
    });
    describe('manhattan distance', () => {
        test('returns closest sample by manhattan distance', () => {
            const input = [1, 0];
            const result = findNearestNeighbors(input, samples, { method: 'manhattan' });
            expect(result.length).toBe(1);
            expect(result[0].label).toBe('A');
            expect(result[0].distance).toBeCloseTo(0);
        });
        test('returns top K results by manhattan distance', () => {
            const input = [1, 0];
            const result = findNearestNeighbors(input, samples, { method: 'manhattan', topK: 2 });
            expect(result.length).toBe(2);
            expect(result[0].label).toBe('A');
            expect(result[1].label).toBe('C');
            expect(result[0].distance).toBeCloseTo(0);
            expect(result[1].distance).toBeCloseTo(1);
        });
        test('filters by manhattan distance threshold', () => {
            const input = [0, 0];
            const result = findNearestNeighbors(input, samples, { method: 'manhattan', threshold: 1.5 });
            expect(result.length).toBe(2);
            expect(result.every(r => r.distance <= 1.5)).toBe(true);
        });
        test('handles different manhattan distances correctly', () => {
            const input = [0, 1];
            const result = findNearestNeighbors(input, samples, { method: 'manhattan', topK: 3 });
            expect(result[0].label).toBe('B');
            expect(result[1].label).toBe('C');
            expect(result[2].label).toBe('A');
            expect(result[0].distance).toBe(0);
            expect(result[1].distance).toBe(1);
            expect(result[2].distance).toBe(2);
        });
    });
});

describe('rankBySimilarity', () => {
    const samples = [
        { embedding: [1, 0], label: 'A' },
        { embedding: [0, 1], label: 'B' },
        { embedding: [1, 1], label: 'C' },
    ];
    describe('cosine similarity (default)', () => {
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
            expect(results[1].similarityScore).toBeCloseTo(0.707, 2);
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
        test('explicit method specification', () => {
            const results = rankBySimilarity([1, 0], samples, { method: 'cosine' });
            expect(results[0].label).toBe('A');
            expect(results[0].similarityScore).toBeCloseTo(1);
            expect(results[0].distance).toBeUndefined();
        });
    });
    describe('euclidean distance', () => {
        test('ranks samples by euclidean distance to [1, 0]', () => {
            const results = rankBySimilarity([1, 0], samples, { method: 'euclidean' });
            expect(results.length).toBe(samples.length);
            expect(results[0].label).toBe('A');
            expect(results[0].distance).toBeCloseTo(0);
            expect(results[1].label).toBe('C');
            expect(results[1].distance).toBeCloseTo(1);
            expect(results[2].label).toBe('B');
            expect(results[2].distance).toBeCloseTo(Math.sqrt(2));
        });
        test('ranks samples by euclidean distance to [0, 1]', () => {
            const results = rankBySimilarity([0, 1], samples, { method: 'euclidean' });
            expect(results[0].label).toBe('B');
            expect(results[0].distance).toBeCloseTo(0);
            expect(results[1].label).toBe('C');
            expect(results[1].distance).toBeCloseTo(1);
            expect(results[2].label).toBe('A');
            expect(results[2].distance).toBeCloseTo(Math.sqrt(2));
        });
        test('handles zero vector query', () => {
            const results = rankBySimilarity([0, 0], samples, { method: 'euclidean' });
            expect(results[0].distance).toBeCloseTo(1);
            expect(results[2].distance).toBeCloseTo(Math.sqrt(2));
        });
    });

    describe('manhattan distance', () => {
        test('ranks samples by manhattan distance to [1, 0]', () => {
            const results = rankBySimilarity([1, 0], samples, { method: 'manhattan' });
            expect(results.length).toBe(samples.length);
            expect(results[0].label).toBe('A');
            expect(results[0].distance).toBe(0);
            expect(results[1].label).toBe('C');
            expect(results[1].distance).toBe(1);
            expect(results[2].label).toBe('B');
            expect(results[2].distance).toBe(2);
        });
        test('ranks samples by manhattan distance to [0, 1]', () => {
            const results = rankBySimilarity([0, 1], samples, { method: 'manhattan' });
            expect(results[0].label).toBe('B');
            expect(results[0].distance).toBe(0);
            expect(results[1].label).toBe('C');
            expect(results[1].distance).toBe(1);
            expect(results[2].label).toBe('A');
            expect(results[2].distance).toBe(2);
        });
        test('handles zero vector query', () => {
            const results = rankBySimilarity([0, 0], samples, { method: 'manhattan' });
            expect(results[0].distance).toBe(1);
            expect(results[1].distance).toBe(1);
            expect(results[2].distance).toBe(2);
        });
    });

    describe('edge cases', () => {
        test('returns empty array if samples is empty', () => {
            const results = rankBySimilarity([1, 0], []);
            expect(results).toEqual([]);
        });
        test('returns empty array if samples is empty (euclidean)', () => {
            const results = rankBySimilarity([1, 0], [], { method: 'euclidean' });
            expect(results).toEqual([]);
        });
        test('returns empty array if samples is empty (manhattan)', () => {
            const results = rankBySimilarity([1, 0], [], { method: 'manhattan' });
            expect(results).toEqual([]);
        });
    });
});