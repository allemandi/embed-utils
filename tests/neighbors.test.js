import { findNearestNeighbors } from '../src/utils/neighbors';

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