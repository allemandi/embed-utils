/**
 * Calculates the cosine similarity between two vectors.
 * Cosine similarity measures how similar two vectors are, ranging from -1 (opposite) to 1 (identical).
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
 * // => 0.9922778767136677
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

export {
    computeCosineSimilarity
};