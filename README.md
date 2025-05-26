# 📖 @allemandi/embed-utils

[![NPM Version](https://img.shields.io/npm/v/@allemandi/embed-utils)](https://www.npmjs.com/package/@allemandi/embed-utils)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/allemandi/embed-utils/blob/main/LICENSE)

> Utilities for text classification using cosine similarity embeddings.
>
> Supports ESM, CommonJS, and UMD – works in modern builds, Node.js, and browsers.
 
<!-- omit from toc -->
## 🔖 Table of Contents
- [✨ Features](#-features)
- [🛠️ Installation](#️-installation)
- [🚀 Quick Usage Examples](#-quick-usage-examples)
- [📦 API](#-api)
- [🧪 Tests](#-tests)
- [🔗 Related Projects](#-related-projects)
- [🤝 Contributing](#-contributing)


## ✨ Features

- 🔍 Find the closest matches between vector embeddings
- 📐 Compute cosine similarity
- ⚡ Lightweight and fast vector operations
- 🧪 Supports both ES Modules (ESM) and CommonJS (CJS)

## 🛠️ Installation
```bash
# Yarn
yarn add @allemandi/embed-utils

# NPM
npm install @allemandi/embed-utils
```

## 🚀 Quick Usage Examples
ESM
```bash
import { computeCosineSimilarity } from '@allemandi/embed-utils';
```
CommonJS

```bash
const { findNearestNeighbors } = require('@allemandi/embed-utils');

const samples = [
  { embedding: [0.1, 0.2, 0.3], label: 'sports' },
  { embedding: [0.9, 0.8, 0.7], label: 'finance' },
  { embedding: [0.05, 0.1, 0.15], label: 'sports' },
];

const query = [0.09, 0.18, 0.27];

# Find top 2 neighbors with similarity ≥ 0.5
const results = findNearestNeighbors(query, samples, { topK: 2, threshold: 0.5 });

console.log(results);
# [ { embedding: [0.1, 0.2, 0.3], label: "sports", similarityScore: 1 },
#   { embedding: [0.05, 0.1, 0.15], label: "sports", similarityScore: 1 } ] 
```
UMD (Browser)
```bash
<script src="https://unpkg.com/@allemandi/embed-utils"></script>
<script>
    const a = [1, 2, 3];
    const b = [1, 2, 3];
  const result = window.allemandi.embedUtils.computeCosineSimilarity(a, b);
  console.log(result);
</script>
```


## 📦 API

### `computeCosineSimilarity(vecA, vecB)`
- Calculates the cosine similarity between two vectors.
  - Cosine similarity measures how similar two vectors are, ranging from `-1` (opposite) to `1` (identical).

#### Parameters

- `vecA` (`number[]`): First vector.
- `vecB` (`number[]`): Second vector.

#### Returns

- `number`: Cosine similarity score between `vecA` and `vecB`.

#### Examples

```js
computeCosineSimilarity([1, 2, 3], [1, 2, 3]);
// => 1 (identical vectors)

computeCosineSimilarity([1, 0], [0, 1]);
// => 0 (orthogonal vectors)

computeCosineSimilarity([1, 2], [2, 3]);
// => 0.9922778767136677

computeCosineSimilarity([1, 0], [-1, 0]);
// => -1 (vectors diametrically opposed)

computeCosineSimilarity([0, 0], [1, 2]);
// => 0 (one vector has zero magnitude)
```

### `findNearestNeighbors(queryEmbedding, samples, options)`
- Finds the top K nearest neighbor samples to a query embedding using cosine similarity.

#### Parameters
- `queryEmbedding` (`number[]`): The embedding vector representing the query item.
- `samples` (`Array<{ embedding: number[], [key: string]: any }>`): An array of dataset samples, each containing at least an embedding vector and optionally additional metadata.
- `options` (`object`, optional): Optional parameters:
  - `topK` (`number`, default `1`): Maximum number of top matches to return.
  - `threshold` (`number`, default `0`): Minimum similarity score between `0` and `1` required for a sample to be considered a match.

#### Returns
- `Array<{ embedding: number[], similarityScore: number, [key: string]: any }>`: Array of top matching samples, each including a `similarityScore` property, sorted by descending similarity.

#### Examples
```js
const samples = [
  { embedding: [1, 0], label: 'A' },
  { embedding: [0, 1], label: 'B' },
  { embedding: [1, 1], label: 'C' },
];

findNearestNeighbors([1, 0], samples);
// => [{ embedding: [1, 0], label: 'A', similarityScore: 1 }]

findNearestNeighbors([1, 1], samples, { topK: 2 });
// => [
//   { embedding: [1, 1], label: 'C', similarityScore: 0.999... },
//   { embedding: [1, 0], label: 'A', similarityScore: 0.707... }
// ]

findNearestNeighbors([1, 0], samples, { threshold: 0.9 });
// => [{ embedding: [1, 0], label: 'A', similarityScore: 1 }]

findNearestNeighbors([-1, 0], samples, { threshold: 1 });
// => []
```

## 🧪 Tests
```bash
# Run the test suite with Jest
yarn test
# or
npm test
```

## 🔗 Related Projects
Check out these related projects that might interest you:
- **[Embed Classify CLI](https://github.com/allemandi/embed-classify-cli)**
  Node.js CLI tool for local text classification using word embeddings.

- **[Vector Knowledge Base](https://github.com/allemandi/vector-knowledge-base)**  
  A minimalist command-line knowledge system with semantic memory capabilities using vector embeddings for information retrieval.


## 🤝 Contributing
If you have ideas, improvements, or new features:

1. Fork the project
2. Create your feature branch (git checkout -b feature/amazing-feature)
3. Commit your changes (git commit -m 'Add some amazing feature')
4. Push to the branch (git push origin feature/amazing-feature)
5. Open a Pull Request