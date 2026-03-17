const fs = require('fs');
const path = require('path');
const assert = require('assert');

// We evaluate UMD in a controlled environment to verify its exports.
// We explicitly pass undefined for 'process' to ensure it doesn't depend on it.
const filepath = path.join(__dirname, '../dist/index.umd.js');
const code = fs.readFileSync(filepath, 'utf8');

const mockModule = { exports: {} };
try {
    const wrapper = new Function('module', 'exports', 'process', code);
    wrapper(mockModule, mockModule.exports, undefined);
} catch (e) {
    console.error('UMD Evaluation Error:', e.message);
    process.exit(1);
}

assert.strictEqual(typeof mockModule.exports.computeCosineSimilarity, 'function', 'UMD: computeCosineSimilarity not found on exports');
console.log('UMD smoke test passed');
