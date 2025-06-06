import { computeCosineSimilarity } from './similarity.js';

/**
 * Finds the nearest neighbors to a given query embedding from a list of samples
 * based on cosine similarity.
 * @public
 * @param {number[]} queryEmbedding - The embedding vector to compare against.
 * @param {{ embedding: number[], label: string }[]} samples - An array of samples, each with an `embedding` and a `label`.
 * @param {object} [options={}] - Optional settings.
 * @param {number} [options.topK=1] - Number of top results to return. Default is 1.
 * @param {number} [options.threshold=0] - Minimum similarity score threshold for results.
 * @returns {{ embedding: number[], label: string, similarityScore: number }[]} - An array of nearest neighbors with similarity scores.
 * @example
 * const samples = [
 *   { embedding: [1, 0], label: 'A' },
 *   { embedding: [0, 1], label: 'B' },
 *   { embedding: [1, 1], label: 'C' },
 * ];
 *
 * findNearestNeighbors([1, 0], samples);
 * // => [{ embedding: [1, 0], label: 'A', similarityScore: 1 }]
 *
 * findNearestNeighbors([1, 1], samples, { topK: 2 });
 * // => [
 * //   { embedding: [1, 1], label: 'C', similarityScore: 0.999... },
 * //   { embedding: [1, 0], label: 'A', similarityScore: 0.707... }
 * // ]
 *
 * findNearestNeighbors([1, 0], samples, { threshold: 0.9 });
 * // => [{ embedding: [1, 0], label: 'A', similarityScore: 1 }]
 *
 * findNearestNeighbors([-1, 0], samples, { threshold: 1 });
 * // => []
 */
function findNearestNeighbors(queryEmbedding, samples, options = {}) {
    const { topK = 1, threshold = 0 } = options;
    const scoredSamples = [];
    for (const sample of samples) {
        const similarityScore = computeCosineSimilarity(queryEmbedding, sample.embedding);

        if (similarityScore >= threshold) {
            scoredSamples.push({
                ...sample,
                similarityScore,
            });
        }
    }
    scoredSamples.sort((a, b) => b.similarityScore - a.similarityScore);
    return scoredSamples.slice(0, topK);
}

/**
 * Ranks all samples by cosine similarity to the query embedding.
 * Does NOT apply threshold or topK filtering.
 * @public
 * @param {number[]} queryEmbedding - The embedding vector to compare against.
 * @param {{ embedding: number[], label: string }[]} samples - Samples with embeddings and labels.
 * @returns {{ embedding: number[], label: string, similarityScore: number }[]} Sorted by descending similarity.
 * @example
 * const samples = [
 *   { embedding: [1, 0], label: 'A' },
 *   { embedding: [0, 1], label: 'B' },
 *   { embedding: [1, 1], label: 'C' },
 * ];
 * rankBySimilarity([1, 0], samples);
 * // => [
 * //   { embedding: [1, 0], label: 'A', similarityScore: 1 },
 * //   { embedding: [1, 1], label: 'C', similarityScore: 0.707... },
 * //   { embedding: [0, 1], label: 'B', similarityScore: 0 }
 * // ]
 *
 * rankBySimilarity([0, 1], samples);
 * // => [
 * //   { embedding: [0, 1], label: 'B', similarityScore: 1 },
 * //   { embedding: [1, 1], label: 'C', similarityScore: 0.707... },
 * //   { embedding: [1, 0], label: 'A', similarityScore: 0 }
 * // ]
 */
function rankBySimilarity(queryEmbedding, samples) {
    const results = new Array(samples.length);
    for (let i = 0; i < samples.length; i++) {
        results[i] = {
            ...samples[i],
            similarityScore: computeCosineSimilarity(queryEmbedding, samples[i].embedding),
        };
    }
    results.sort((a, b) => b.similarityScore - a.similarityScore);
    return results;
}

export {
    findNearestNeighbors,
    rankBySimilarity,
};