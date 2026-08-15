# 📖 @allemandi/embed-utils

[![NPM Version](https://img.shields.io/npm/v/@allemandi/embed-utils)](https://www.npmjs.com/package/@allemandi/embed-utils)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/allemandi/embed-utils/blob/main/LICENSE)

> **Fast, type-safe utilities for vector embedding comparison and search.**
>
> Works in Node.js, browsers – supports ESM, CommonJS, and UMD
 
<!-- omit from toc -->
## 🔖 Table of Contents
- [✨ Features](#-features)
- [🛠️ Installation](#️-installation)
- [🚀 Quick Usage Examples](#-quick-usage-examples)
- [📚 API Reference](#-api-reference)
  - [computeCosineSimilarity](#computecosinesimilarity)
  - [computeEuclideanDistance](#computeeuclideandistance)
  - [computeManhattanDistance](#computemanhattandistance)
  - [normalizeVector](#normalizevector)
  - [isNormalized](#isnormalized)
  - [meanVector](#meanvector)
  - [findNearestNeighbors](#findnearestneighbors)
  - [rankBySimilarity](#rankbysimilarity)
- [🧪 Tests](#-tests)
- [🔗 Related Projects](#-related-projects)
- [🤝 Contributing](#-contributing)


## ✨ Features

- 🔍 Find nearest neighbors by cosine similarity, or Euclidean/Manhattan distance
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

**ESM**
```js
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
// (default method: cosine similarity)
const resultsCosine = findNearestNeighbors(query, samples, { topK: 2, threshold: 0.5 });

console.log(resultsCosine);
//  [ { embedding: [0.1, 0.2, 0.3], label: "sports", similarityScore: 1 },
//    { embedding: [0.05, 0.1, 0.15], label: "sports", similarityScore: 1 } ] 

// Find top 3 neighbors with Euclidean distance ≤ 1.1
const resultsEuclidean = findNearestNeighbors(query, samples, {
  topK: 3,
  threshold: 1.1,
  method: 'euclidean',
});

console.log(resultsEuclidean.length);
// 2
// only 2 results that pass threshold conditions

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

## 📚 API Reference

### computeCosineSimilarity

Calculates cosine similarity between two vectors.
Measures how similar their directions are, ignoring magnitude.
Use for comparing semantic or normalized vectors (e.g., text embeddings).

**Parameters:**
* `vecA` (`number[]`): First vector.
* `vecB` (`number[]`): Second vector.

**Returns:** `number` — Cosine similarity score between `vecA` and `vecB`.

**Examples:**
```js
computeCosineSimilarity([1, 2, 3], [1, 2, 3]);
// => 1 (identical vectors)
computeCosineSimilarity([1, 0], [0, 1]);
// => 0 (orthogonal vectors)
computeCosineSimilarity([1, 2], [2, 3]);
// => 0.992...
computeCosineSimilarity([1, 0], [-1, 0]);
// => -1 (vectors diametrically opposed)
computeCosineSimilarity([0, 0], [1, 2]);
// => 0 (one vector has zero magnitude)
```

---

### computeEuclideanDistance

Calculates Euclidean distance between two vectors.
Measures straight-line distance considering both magnitude and direction.
Use for raw numeric data or spatial coordinates.

**Parameters:**
* `vecA` (`number[]`): First vector.
* `vecB` (`number[]`): Second vector.

**Returns:** `number` — Euclidean distance between `vecA` and `vecB`.

**Examples:**
```js
computeEuclideanDistance([1, 2], [4, 6]);
// => 5 (distance between (1,2) and (4,6))
computeEuclideanDistance([0, 0], [0, 0]);
// => 0 (identical vectors)
computeEuclideanDistance([1, 0], [0, 1]);
// => 1.414...
computeEuclideanDistance([1, 2, 3], [4, 5, 6]);
// => 5.196...
```

---

### computeManhattanDistance

Calculates Manhattan distance between two vectors.
Measures sum of absolute differences.
Use for grid-like data or when less sensitive to large differences.

**Parameters:**
* `vecA` (`number[]`): First vector.
* `vecB` (`number[]`): Second vector.

**Returns:** `number` — Manhattan distance between `vecA` and `vecB`.

**Examples:**
```js
computeManhattanDistance([1, 2, 3], [4, 5, 6]);
// => 9
computeManhattanDistance([1, 0], [0, 1]);
// => 2
computeManhattanDistance([1, 2], [1, 2]);
// => 0 (identical vectors)
computeManhattanDistance([1, -1], [-1, 1]);
// => 4
```

---

### normalizeVector

Normalizes a vector to unit length. If the vector has zero magnitude, returns the original vector.

**Parameters:**
* `vec` (`number[]`): Input vector.

**Returns:** `number[]` — A new vector scaled to unit length.

**Examples:**
```js
normalizeVector([3, 4]);
// => [0.6, 0.8] (vector normalized to length 1)
normalizeVector([0, 0]);
// => [0, 0] (zero vector remains unchanged)
normalizeVector([1, 1, 1]);
// => [0.5773502691896258, 0.5773502691896258, 0.5773502691896258]
```

---

### isNormalized

Efficiently checks if a vector is L2-normalized (unit length).

**Parameters:**
* `vec` (`number[]`): Input vector.
* `epsilon` (`number`, optional, default: `1e-6`): Tolerance for floating-point comparison.

**Returns:** `boolean` — True if the L2 norm is within epsilon of 1.

**Examples:**
```js
isNormalized([1, 0]);
// => true (vector length is exactly 1)
isNormalized([0.6, 0.8]);
// => true (approximately unit length)
isNormalized([3, 4]);
// => false (length is 5)
isNormalized([0, 0]);
// => false (length is 0)
```

---

### meanVector

Computes the mean (centroid) vector from an array of vectors.
Assumes all vectors are of equal length.

**Parameters:**
* `vectors` (`number[][]`): An array of vectors.

**Returns:** `number[]` — The mean vector.

**Examples:**
```js
meanVector([[1, 2], [3, 4], [5, 6]]);
// => [3, 4]
meanVector([]);
// => []
```

---

### findNearestNeighbors

Finds the nearest neighbors to a given query embedding from a list of samples based on the specified distance/similarity method.

* `'cosine'`: Cosine similarity (higher = more similar, range: [-1, 1]).
* `'euclidean'`: Euclidean distance (lower = closer, ≥ 0).
* `'manhattan'`: Manhattan distance (lower = closer, ≥ 0).

**Parameters:**
* `queryEmbedding` (`number[]`): The embedding vector to compare against.
* `samples` (`Array<{ embedding: number[], label: string }>`): An array of samples, each with an `embedding` and a `label`.
* `options` (`object`, optional, default: `{}`):
  * `options.topK` (`number`, optional, default: `1`): Number of top results to return.
  * `options.threshold` (`number`, optional): Minimum similarity score threshold for results (cosine) or maximum distance threshold (euclidean/manhattan).
  * `options.method` (`'cosine' | 'euclidean' | 'manhattan'`, optional, default: `'cosine'`): The metric to compute.

**Examples:**
```js
const samples = [
  { embedding: [1, 0], label: 'A' },
  { embedding: [0, 1], label: 'B' },
  { embedding: [1, 1], label: 'C' },
];

// Default cosine similarity
findNearestNeighbors([1, 0], samples);
// => [{ embedding: [1, 0], label: 'A', similarityScore: 1 }]

// Euclidean distance
findNearestNeighbors([1, 0], samples, { method: 'euclidean', topK: 2 });
// => [
//   { embedding: [1, 0], label: 'A', distance: 0 },
//   { embedding: [1, 1], label: 'C', distance: 1 }
// ]

// Manhattan distance with threshold
findNearestNeighbors([1, 0], samples, { method: 'manhattan', threshold: 1.5 });
// => [{ embedding: [1, 0], label: 'A', distance: 0 }, { embedding: [1, 1], label: 'C', distance: 1 }]

// Cosine with threshold
findNearestNeighbors([1, 0], samples, { threshold: 0.9 });
// => [{ embedding: [1, 0], label: 'A', similarityScore: 1 }]
```

---

### rankBySimilarity

Ranks all samples by similarity/distance to the query embedding.
Does NOT apply threshold or topK filtering.

**Parameters:**
* `queryEmbedding` (`number[]`): The embedding vector to compare against.
* `samples` (`Array<{ embedding: number[], label: string }>`): Samples with embeddings and labels.
* `options` (`object`, optional, default: `{}`):
  * `options.method` (`'cosine' | 'euclidean' | 'manhattan'`, optional, default: `'cosine'`): Distance/similarity method to use.

**Examples:**
```js
const samples = [
  { embedding: [1, 0], label: 'A' },
  { embedding: [0, 1], label: 'B' },
  { embedding: [1, 1], label: 'C' },
];

// Default cosine similarity
rankBySimilarity([1, 0], samples);
// => [
//   { embedding: [1, 0], label: 'A', similarityScore: 1 },
//   { embedding: [1, 1], label: 'C', similarityScore: 0.707... },
//   { embedding: [0, 1], label: 'B', similarityScore: 0 }
// ]

// Euclidean distance
rankBySimilarity([1, 0], samples, { method: 'euclidean' });
// => [
//   { embedding: [1, 0], label: 'A', distance: 0 },
//   { embedding: [1, 1], label: 'C', distance: 1 },
//   { embedding: [0, 1], label: 'B', distance: 1.414... }
// ]

// Manhattan distance
rankBySimilarity([0, 1], samples, { method: 'manhattan' });
// => [
//   { embedding: [0, 1], label: 'B', distance: 0 },
//   { embedding: [1, 1], label: 'C', distance: 1 },
//   { embedding: [1, 0], label: 'A', distance: 2 }
// ]
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
