# embed-utils

Lightweight utilities for text classification using cosine similarity on embeddings.

## Installation

```bash
yarn install @allemandi/embed-utils
```

## Usage
```
const { findClosest, cosineSimilarity } = require('embed-utils');

const samples = [
  { embedding: [0.1, 0.2, 0.3], label: 'sports' },
  { embedding: [0.9, 0.8, 0.7], label: 'finance' },
  { embedding: [0.05, 0.1, 0.15], label: 'sports' },
];

const input = [0.09, 0.18, 0.27];

const results = findClosest(input, samples, { topK: 2, threshold: 0.5 });

console.log(results);
```