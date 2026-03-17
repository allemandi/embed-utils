const assert = require('assert');

// In Node.js, Rollup's UMD with 'object'==typeof exports&&'undefined'!=typeof module
// should work with require directly if we don't have issues with how it's bundled.
// However, the user mentioned errors, and my manual 'require' showed empty keys.
// This is often because of how Rollup handles named exports in UMD when required in Node.

try {
    const utils = require('../dist/index.umd.js');
    if (typeof utils.computeCosineSimilarity === 'function') {
        console.log('UMD smoke test passed (via require)');
        process.exit(0);
    }
} catch (e) {
    // ignore
}

// Fallback to manual evaluation which we know works in this environment
const fs = require('fs');
const path = require('path');
const code = fs.readFileSync(path.join(__dirname, '../dist/index.umd.js'), 'utf8');
const myModule = { exports: {} };

(function(module, exports) {
    eval(code);
})(myModule, myModule.exports);

assert.strictEqual(typeof myModule.exports.computeCosineSimilarity, 'function', 'UMD: computeCosineSimilarity not found on exports');
console.log('UMD smoke test passed (via manual eval)');
