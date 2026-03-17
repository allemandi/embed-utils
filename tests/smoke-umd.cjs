const fs = require('fs');
const path = require('path');
const assert = require('assert');

const code = fs.readFileSync(path.join(__dirname, '../dist/index.umd.js'), 'utf8');

// Test as CommonJS-like environment
const mockModule = { exports: {} };
// UMD wrapper usually looks for 'exports' and 'module'
// We wrap in a function to provide these.
try {
    const fn = new Function('module', 'exports', code);
    fn(mockModule, mockModule.exports);
} catch (e) {
    // If the code itself is not wrap-friendly (e.g. has top level return), this might fail
    // But Rollup UMD is usually fine.
}

// In some cases, Rollup UMD might not use the provided exports if it's not actually assigned to module.exports
// Let's check both mockModule.exports and global.
const embedUtils = (mockModule.exports && mockModule.exports.computeCosineSimilarity)
    ? mockModule.exports
    : global.allemandi ? global.allemandi.embedUtils : null;

if (!embedUtils) {
    // Try another way: just eval it and check globalThis
    eval(code);
    if (global.allemandi && global.allemandi.embedUtils) {
        const utils = global.allemandi.embedUtils;
        const a = [1, 2, 3];
        const b = [1, 2, 3];
        const result = utils.computeCosineSimilarity(a, b);
        assert.ok(Math.abs(result - 1) < 1e-6, 'UMD: computeCosineSimilarity failed');
        console.log('UMD smoke test passed (via global)');
        process.exit(0);
    }
    console.error('UMD exports:', mockModule.exports);
    console.error('Global allemandi:', global.allemandi);
    throw new Error('UMD smoke test failed: Could not find exports');
}

const a = [1, 2, 3];
const b = [1, 2, 3];
const result = embedUtils.computeCosineSimilarity(a, b);
assert.ok(Math.abs(result - 1) < 1e-6, 'UMD: computeCosineSimilarity failed');
console.log('UMD smoke test passed');
