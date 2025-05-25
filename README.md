# 📖 @allemandi/embed-utils

[![NPM Version](https://img.shields.io/npm/v/@allemandi/embed-utils)](https://www.npmjs.com/package/@allemandi/embed-utils)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/allemandi/embed-utils/blob/main/LICENSE)

> Utilities for text classification using cosine similarity embeddings.
>
> Supports ESM, CommonJS, and UMD – works in modern builds, Node.js, and browsers.

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
`computeCosineSimilarity(vecA: number[], vecB: number[])`

Computes cosine similarity between two numeric vectors of the same size. Returns number (similarity score between -1 and 1)

`findNearestNeighbors(queryEmbedding: number[], samples: Array<{embedding: number[]}>, { topK?: number, threshold?: number })`

Finds top K nearest neighbors from samples by cosine similarity to `queryEmbedding`. Returns array of samples with `similarityScore` sorted descending
- `options` (object): optional
  - `topK` (number, default=1) max results
  - `threshold` (number, default=0) min similarity between 0 and 1.

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