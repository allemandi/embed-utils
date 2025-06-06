# 📖 @allemandi/embed-utils

[![NPM Version](https://img.shields.io/npm/v/@allemandi/embed-utils)](https://www.npmjs.com/package/@allemandi/embed-utils)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/allemandi/embed-utils/blob/main/LICENSE)

> **Fast, type-safe utilities for comparing and searching vector embeddings.**
>
> Works in Node.js, browsers – supports ESM, CommonJS, and UMD
 
<!-- omit from toc -->
## 🔖 Table of Contents
- [✨ Features](#-features)
- [🛠️ Installation](#️-installation)
- [🚀 Quick Usage Examples](#-quick-usage-examples)
- [🧪 Tests](#-tests)
- [🔗 Related Projects](#-related-projects)
- [🤝 Contributing](#-contributing)


## ✨ Features

- 🔍 Find nearest neighbors by cosine similarity
- 📐 Compute, normalize, and verify vector similarity
- ⚡ Lightweight and fast vector operations

## 🛠️ Installation
```bash
# Yarn
yarn add @allemandi/embed-utils

# NPM
npm install @allemandi/embed-utils
```

## 🚀 Quick Usage Examples

> 📘 For a complete list of methods and options, see [the API docs](https://github.com/allemandi/embed-utils/blob/main/docs/API.md).

**ESM**
```bash
import { computeCosineSimilarity } from '@allemandi/embed-utils';
```
**CommonJS**

```js
const { findNearestNeighbors } = require('@allemandi/embed-utils');

const samples = [
  { embedding: [0.1, 0.2, 0.3], label: 'sports' },
  { embedding: [0.9, 0.8, 0.7], label: 'finance' },
  { embedding: [0.05, 0.1, 0.15], label: 'sports' },
];

const query = [0.09, 0.18, 0.27];

//  Find top 2 neighbors with similarity ≥ 0.5
const results = findNearestNeighbors(query, samples, { topK: 2, threshold: 0.5 });

console.log(results);
//  [ { embedding: [0.1, 0.2, 0.3], label: "sports", similarityScore: 1 },
//    { embedding: [0.05, 0.1, 0.15], label: "sports", similarityScore: 1 } ] 
```
**UMD (Browser)**
```js
<script src="https://unpkg.com/@allemandi/embed-utils"></script>
<script>
    const vectorsToNormalize = [3, 4];
  const result = window.allemandi.embedUtils.normalizeVector(vectorsToNormalize);
  console.log(result);
</script>
```

## 🧪 Tests

> Available in the GitHub repo only.

```bash
# Run the test suite with Jest
yarn test
# or
npm test
```

## 🔗 Related Projects
Check out these related projects that might interest you:

**[Embed Classify CLI](https://github.com/allemandi/embed-classify-cli)**
- Node.js CLI tool for local text classification using word embeddings.

**[Vector Knowledge Base](https://github.com/allemandi/vector-knowledge-base)**  
- A minimalist command-line knowledge system with semantic memory capabilities using vector embeddings for information retrieval.


## 🤝 Contributing
If you have ideas, improvements, or new features:

1. Fork the project
2. Create your feature branch (git checkout -b feature/amazing-feature)
3. Commit your changes (git commit -m 'Add some amazing feature')
4. Push to the branch (git push origin feature/amazing-feature)
5. Open a Pull Request