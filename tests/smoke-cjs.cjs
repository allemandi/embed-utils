const { computeCosineSimilarity } = require('../dist/index.cjs');
const assert = require('assert');

assert.strictEqual(typeof computeCosineSimilarity, 'function');
console.log('CJS smoke test passed');
