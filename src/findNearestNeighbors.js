import { computeCosineSimilarity } from './computeCosineSimilarity';

/**
 * Finds the top K nearest neighbor samples to a query embedding based on cosine similarity.
 *
 * @param {number[]} queryEmbedding - The embedding vector representing the query item.
 * @param {Array<{embedding: number[]}>} samples - Dataset samples containing embedding vectors and optional metadata.
 * @param {object} [options] - Optional parameters.
 * @param {number} [options.topK=1] - The maximum number of top matches to return.
 * @param {number} [options.threshold=0] - Minimum similarity score threshold to consider a sample a match.
 * @returns {Array<{embedding: number[], similarityScore: number}>} An array of top matching samples including similarity scores, sorted by descending similarity.
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

export { findNearestNeighbors };
