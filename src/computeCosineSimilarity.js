/**
 * Cosine Similarity:
 * This measures how similar two vectors are.
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

module.exports = computeCosineSimilarity;