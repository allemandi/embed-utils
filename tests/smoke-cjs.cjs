const { computeCosineSimilarity } = require('../dist/index.cjs');
const assert = require('assert');

const a = [1, 2, 3];
const b = [1, 2, 3];
const result = computeCosineSimilarity(a, b);
assert.ok(Math.abs(result - 1) < 1e-6, 'CJS: computeCosineSimilarity failed');
console.log('CJS smoke test passed');
