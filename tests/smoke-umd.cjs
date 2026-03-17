const fs = require('fs');
const path = require('path');
const assert = require('assert');

// Test the UMD bundle in a minimal environment.
const filepath = path.join(__dirname, '../dist/index.umd.js');
const code = fs.readFileSync(filepath, 'utf8');

const myModule = { exports: {} };
(function(module, exports) {
    eval(code);
})(myModule, myModule.exports);

assert.strictEqual(typeof myModule.exports.computeCosineSimilarity, 'function');
console.log('UMD smoke test passed');
