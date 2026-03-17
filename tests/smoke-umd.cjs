const fs = require('fs');
const path = require('path');
const assert = require('assert');

const code = fs.readFileSync(path.join(__dirname, '../dist/index.umd.js'), 'utf8');
const myModule = { exports: {} };

(function(module, exports) {
    eval(code);
})(myModule, myModule.exports);

assert.strictEqual(typeof myModule.exports.computeCosineSimilarity, 'function');
console.log('UMD smoke test passed');
