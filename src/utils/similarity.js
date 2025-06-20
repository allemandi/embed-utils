/**
 * Calculates cosine similarity between two vectors.
 * Measures how similar their directions are, ignoring magnitude.
 * Use for comparing semantic or normalized vectors (e.g., text embeddings).
 * 
 * @public
 * @param {number[]} vecA - First vector.
 * @param {number[]} vecB - Second vector.
 * @returns {number} - Cosine similarity score between `vecA` and `vecB`.
 * @example
 * computeCosineSimilarity([1, 2, 3], [1, 2, 3]);
 * // => 1 (identical vectors)
 * computeCosineSimilarity([1, 0], [0, 1]);
 * // => 0 (orthogonal vectors)
 * computeCosineSimilarity([1, 2], [2, 3]);
 * // => 0.992...
 * computeCosineSimilarity([1, 0], [-1, 0]);
 * // => -1 (vectors diametrically opposed)
 * computeCosineSimilarity([0, 0], [1, 2]);
 * // => 0 (one vector has zero magnitude)
 */
function computeCosineSimilarity(vecA, vecB) {
    let dot = 0;
    let magA = 0;
    let magB = 0;
    for (let i = 0; i < vecA.length; i++) {
        const a = vecA[i];
        const b = vecB[i];
        dot += a * b;
        magA += a * a;
        magB += b * b;
    }
    const denom = Math.sqrt(magA) * Math.sqrt(magB);
    return denom === 0 ? 0 : dot / denom;
}

/**
 * Calculates Euclidean distance between two vectors.
 * Measures straight-line distance considering both magnitude and direction.
 * Use for raw numeric data or spatial coordinates.
 * 
 * @public
 * @param {number[]} vecA - First vector.
 * @param {number[]} vecB - Second vector.
 * @returns {number} - Euclidean distance between `vecA` and `vecB`.
 * @example
 * computeEuclideanDistance([1, 2], [4, 6]);
 * // => 5 (distance between (1,2) and (4,6))
 * computeEuclideanDistance([0, 0], [0, 0]);
 * // => 0 (identical vectors)
 * computeEuclideanDistance([1, 0], [0, 1]);
 * // => 1.414...
 * computeEuclideanDistance([1, 2, 3], [4, 5, 6]);
 * // => 5.196...
 */
function computeEuclideanDistance(vecA, vecB) {
    let sum = 0;
    for (let i = 0; i < vecA.length; i++) {
        const diff = vecA[i] - vecB[i];
        sum += diff * diff;
    }
    return Math.sqrt(sum);
}

/**
 * Calculates Manhattan distance between two vectors.
 * Measures sum of absolute differences.
 * Use for grid-like data or when less sensitive to large differences.
 * 
 * @public
 * @param {number[]} vecA - First vector.
 * @param {number[]} vecB - Second vector.
 * @returns {number} - Manhattan distance between `vecA` and `vecB`.
 * @example
 * computeManhattanDistance([1, 2, 3], [4, 5, 6]);
 * // => 9
 * computeManhattanDistance([1, 0], [0, 1]);
 * // => 2
 * computeManhattanDistance([1, 2], [1, 2]);
 * // => 0 (identical vectors)
 * computeManhattanDistance([1, -1], [-1, 1]);
 * // => 4
 */
function computeManhattanDistance(vecA, vecB) {
    let sum = 0;
    for (let i = 0; i < vecA.length; i++) {
        sum += Math.abs(vecA[i] - vecB[i]);
    }
    return sum;
}

/**
 * Normalizes a vector to unit length. If the vector has zero magnitude, returns the original vector.
 * @public
 * @param {number[]} vec - Input vector.
 * @returns {number[]} - A new vector scaled to unit length.
 * @example
 * normalizeVector([3, 4]);
 * // => [0.6, 0.8] (vector normalized to length 1)
 * normalizeVector([0, 0]);
 * // => [0, 0] (zero vector remains unchanged)
 * normalizeVector([1, 1, 1]);
 * // => [0.5773502691896258, 0.5773502691896258, 0.5773502691896258]
 */
function normalizeVector(vec) {
    let sumSquares = 0;
    for (let i = 0; i < vec.length; i++) {
        sumSquares += vec[i] * vec[i];
    }
    const magnitude = Math.sqrt(sumSquares);
    if (magnitude === 0) return vec.slice();
    const result = new Array(vec.length);
    for (let i = 0; i < vec.length; i++) {
        result[i] = vec[i] / magnitude;
    }
    return result;
}

/**
 * Efficiently checks if a vector is L2-normalized (unit length).
 * @public
 * @param {number[]} vec - Input vector.
 * @param {number} [epsilon=1e-6] - Tolerance for floating-point comparison.
 * @returns {boolean} - True if the L2 norm is within epsilon of 1.
 * @example
 * isNormalized([1, 0]);
 * // => true (vector length is exactly 1)
 * isNormalized([0.6, 0.8]);
 * // => true (approximately unit length)
 * isNormalized([3, 4]);
 * // => false (length is 5)
 * isNormalized([0, 0]);
 * // => false (length is 0)
 */
function isNormalized(vec, epsilon = 1e-6) {
    let sum = 0;
    for (let i = 0; i < vec.length; i++) {
        const x = vec[i];
        sum += x * x;
    }
    return Math.abs(sum - 1) <= epsilon;
}

/**
 * Computes the mean (centroid) vector from an array of vectors.
 * Assumes all vectors are of equal length.
 * @public
 * @param {number[][]} vectors - Array of input vectors.
 * @returns {number[]} - The mean vector.
 * @example
 * meanVector([[1, 2], [3, 4], [5, 6]]);
 * // => [3, 4]
 * meanVector([]);
 * // => []
 */
function meanVector(vectors) {
    const numVectors = vectors.length;
    if (numVectors === 0) return [];
    const dim = vectors[0].length;
    const mean = new Array(dim).fill(0);
    for (let i = 0; i < numVectors; i++) {
        const vec = vectors[i];
        for (let j = 0; j < dim; j++) {
            mean[j] += vec[j];
        }
    }
    for (let j = 0; j < dim; j++) {
        mean[j] /= numVectors;
    }
    return mean;
}


export {
    computeCosineSimilarity,
    computeEuclideanDistance,
    computeManhattanDistance,
    normalizeVector,
    isNormalized,
    meanVector,
};