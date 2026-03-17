import { computeCosineSimilarity } from '../dist/index.js';
import assert from 'assert';

assert.strictEqual(typeof computeCosineSimilarity, 'function');
console.log('ESM smoke test passed');
