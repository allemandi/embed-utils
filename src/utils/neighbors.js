import { computeCosineSimilarity, computeEuclideanDistance, computeManhattanDistance } from './similarity.js';

/**
 * Finds the nearest neighbors to a given query embedding from a list of samples
 * based on the specified distance/similarity method.
 *  
 * `'cosine'`: Cosine similarity (higher = more similar, range: [-1, 1]).
 * 
 * `'euclidean'`: Euclidean distance (lower = closer, ≥ 0).
 * 
 * `'manhattan'`: Manhattan distance (lower = closer, ≥ 0).
 * 
 * @public
 * @param {number[]} queryEmbedding - The embedding vector to compare against.
 * @param {{ embedding: number[], label: string }[]} samples - An array of samples, each with an `embedding` and a `label`.
 * @param {object} [options={}] - Optional settings.
 * @param {number} [options.topK=1] - Number of top results to return. Default is 1.
 * @param {number} [options.threshold] - Minimum similarity score threshold for results (cosine) or maximum distance threshold (euclidean/manhattan).
 * @param {'cosine' | 'euclidean' | 'manhattan'} [options.method='cosine'] - The metric to compute:

 * @returns {{ embedding: number[], label: string, similarityScore?: number, distance?: number }[]} - An array of nearest neighbors with scores/distances.
 * @example
 * const samples = [
 *   { embedding: [1, 0], label: 'A' },
 *   { embedding: [0, 1], label: 'B' },
 *   { embedding: [1, 1], label: 'C' },
 * ];
 *
 * // Default cosine similarity
 * findNearestNeighbors([1, 0], samples);
 * // => [{ embedding: [1, 0], label: 'A', similarityScore: 1 }]
 *
 * // Euclidean distance
 * findNearestNeighbors([1, 0], samples, { method: 'euclidean', topK: 2 });
 * // => [
 * //   { embedding: [1, 0], label: 'A', distance: 0 },
 * //   { embedding: [1, 1], label: 'C', distance: 1 }
 * // ]
 *
 * // Manhattan distance with threshold
 * findNearestNeighbors([1, 0], samples, { method: 'manhattan', threshold: 1.5 });
 * // => [{ embedding: [1, 0], label: 'A', distance: 0 }, { embedding: [1, 1], label: 'C', distance: 1 }]
 *
 * // Cosine with threshold
 * findNearestNeighbors([1, 0], samples, { threshold: 0.9 });
 * // => [{ embedding: [1, 0], label: 'A', similarityScore: 1 }]
 */
function findNearestNeighbors(queryEmbedding, samples, options = {}) {
    const { topK, threshold, method = 'cosine' } = options;

    // If threshold is provided but topK is not, return all matches within threshold
    // If topK is provided but threshold is not, return top K matches
    // If both are provided, return top K matches within threshold
    // If neither is provided, return top 1 match
    const effectiveTopK = topK !== undefined ? topK : (threshold !== undefined ? samples.length : 1);

    /** @type {(typeof samples[number] & { similarityScore?: number, distance?: number })[]} */
    const scoredSamples = [];

    let computeFn, isDistance
    /** @type {'similarityScore' | 'distance'} */
    let scoreKey;
    switch (method) {
        case 'euclidean':
            computeFn = computeEuclideanDistance;
            isDistance = true;
            scoreKey = 'distance';
            break;
        case 'manhattan':
            computeFn = computeManhattanDistance;
            isDistance = true;
            scoreKey = 'distance';
            break;
        case 'cosine':
        default:
            computeFn = computeCosineSimilarity;
            isDistance = false;
            scoreKey = 'similarityScore';
            break;
    }
    for (const sample of samples) {
        const score = computeFn(queryEmbedding, sample.embedding);

        if (threshold !== undefined) {
            const passesThreshold = isDistance ? score <= threshold : score >= threshold;
            if (passesThreshold) {
                scoredSamples.push({
                    ...sample,
                    [scoreKey]: score,
                });
            }
        } else {
            scoredSamples.push({
                ...sample,
                [scoreKey]: score,
            });
        }
    }

    // Sort by score/distance (descending for similarity, ascending for distance)
    scoredSamples.sort((a, b) => {
        if (scoreKey === 'similarityScore' || scoreKey === 'distance') {
            const aScore = a[scoreKey] ?? 0;
            const bScore = b[scoreKey] ?? 0;
            return isDistance ? aScore - bScore : bScore - aScore;
        }
        return 0;
    });
    return scoredSamples.slice(0, effectiveTopK);
}

/**
 * Ranks all samples by similarity/distance to the query embedding.
 * Does NOT apply threshold or topK filtering.
 * @public
 * @param {number[]} queryEmbedding - The embedding vector to compare against.
 * @param {{ embedding: number[], label: string }[]} samples - Samples with embeddings and labels.
 * @param {object} [options={}] - Optional settings.
 * @param  {'cosine' | 'euclidean' | 'manhattan'} [options.method='cosine'] - Distance/similarity method to use. Default is 'cosine'.
 * @returns {{ embedding: number[], label: string, similarityScore?: number, distance?: number }[]} Sorted by best match first.
 * @example
 * const samples = [
 *   { embedding: [1, 0], label: 'A' },
 *   { embedding: [0, 1], label: 'B' },
 *   { embedding: [1, 1], label: 'C' },
 * ];
 * 
 * // Default cosine similarity
 * rankBySimilarity([1, 0], samples);
 * // => [
 * //   { embedding: [1, 0], label: 'A', similarityScore: 1 },
 * //   { embedding: [1, 1], label: 'C', similarityScore: 0.707... },
 * //   { embedding: [0, 1], label: 'B', similarityScore: 0 }
 * // ]
 *
 * // Euclidean distance
 * rankBySimilarity([1, 0], samples, { method: 'euclidean' });
 * // => [
 * //   { embedding: [1, 0], label: 'A', distance: 0 },
 * //   { embedding: [1, 1], label: 'C', distance: 1 },
 * //   { embedding: [0, 1], label: 'B', distance: 1.414... }
 * // ]
 *
 * // Manhattan distance
 * rankBySimilarity([0, 1], samples, { method: 'manhattan' });
 * // => [
 * //   { embedding: [0, 1], label: 'B', distance: 0 },
 * //   { embedding: [1, 1], label: 'C', distance: 1 },
 * //   { embedding: [1, 0], label: 'A', distance: 2 }
 * // ]
 */
function rankBySimilarity(queryEmbedding, samples, options = {}) {
    const { method = 'cosine' } = options;
    let computeFn, isDistance, scoreKey;
    switch (method) {
        case 'euclidean':
            computeFn = computeEuclideanDistance;
            isDistance = true;
            scoreKey = 'distance';
            break;
        case 'manhattan':
            computeFn = computeManhattanDistance;
            isDistance = true;
            scoreKey = 'distance';
            break;
        case 'cosine':
        default:
            computeFn = computeCosineSimilarity;
            isDistance = false;
            scoreKey = 'similarityScore';
            break;
    }

    const results = new Array(samples.length);
    for (let i = 0; i < samples.length; i++) {
        results[i] = {
            ...samples[i],
            [scoreKey]: computeFn(queryEmbedding, samples[i].embedding),
        };
    }

    // Sort by score/distance (descending for similarity, ascending for distance)
    results.sort((a, b) =>
        isDistance ? a[scoreKey] - b[scoreKey] : b[scoreKey] - a[scoreKey]
    );

    return results;
}

export {
    findNearestNeighbors,
    rankBySimilarity,
};