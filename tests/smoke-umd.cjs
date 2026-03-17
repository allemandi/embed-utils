const fs = require('fs');
const path = require('path');
const assert = require('assert');

// Test the UMD bundle in a clean, minimal environment.
// No __dirname or process should be available to the bundle.

const filepath = path.join(__dirname, '../dist/index.umd.js');
const code = fs.readFileSync(filepath, 'utf8');

const mockModule = { exports: {} };

try {
    // We use a Function constructor to create a scope where __dirname and process are NOT defined.
    // The UMD bundle itself should not use these if it's truly universal.
    const wrapper = new Function('module', 'exports', 'process', '__dirname', code);
    wrapper(mockModule, mockModule.exports, undefined, undefined);
} catch (e) {
    console.error('UMD Evaluation Error:', e.message);
    process.exit(1);
}

assert.strictEqual(typeof mockModule.exports.computeCosineSimilarity, 'function', 'UMD: computeCosineSimilarity not found on exports');
console.log('UMD smoke test passed');
