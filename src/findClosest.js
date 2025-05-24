const cosineSimilarity = require('./cosineSimilarity');

/**
 * Find the closest vectors to a target vector using cosine similarity.
 * This lets us find "which stored samples are most like the new one?"
 *
 * @param {number[]} inputEmbedding - Your input vector (the thing you're classifying)
 * @param {Array<{embedding: number[], label?: string}>} samples - Known examples with optional labels
 * @param {object} options - Customization settings
 * @param {number} [options.topK=1] - How many top matches to return
 * @param {number} [options.threshold=0] - Only return matches above this similarity
 */

function findClosest(inputEmbedding, samples, options = {}) {
  const { topK = 1, threshold = 0 } = options;

  const scored = [];

  for (const sample of samples) {
    const sim = cosineSimilarity(inputEmbedding, sample.embedding);
    if (sim >= threshold) {
      scored.push({
        ...sample,
        similarity: sim,
      });
    }
  }
  scored.sort((a, b) => b.similarity - a.similarity);
  return scored.slice(0, topK);
}


module.exports = findClosest;