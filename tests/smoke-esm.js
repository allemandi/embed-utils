import { computeCosineSimilarity } from '../dist/index.js';
import assert from 'assert';

const a = [1, 2, 3];
const b = [1, 2, 3];
const result = computeCosineSimilarity(a, b);
assert.ok(Math.abs(result - 1) < 1e-6, 'ESM: computeCosineSimilarity failed');
console.log('ESM smoke test passed');
