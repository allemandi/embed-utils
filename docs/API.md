<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

*   [computeCosineSimilarity][1]
    *   [Parameters][2]
    *   [Examples][3]
*   [normalizeVector][4]
    *   [Parameters][5]
    *   [Examples][6]
*   [isNormalized][7]
    *   [Parameters][8]
    *   [Examples][9]
*   [meanVector][10]
    *   [Parameters][11]
    *   [Examples][12]
*   [findNearestNeighbors][13]
    *   [Parameters][14]
    *   [Examples][15]
*   [rankBySimilarity][16]
    *   [Parameters][17]
    *   [Examples][18]

## computeCosineSimilarity

Calculates the cosine similarity between two vectors.
Cosine similarity measures how similar two vectors are, ranging from -1 (opposite) to 1 (identical).

### Parameters

*   `vecA` **[Array][19]<[number][20]>** First vector.
*   `vecB` **[Array][19]<[number][20]>** Second vector.

### Examples

```javascript
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

Returns **[number][20]** Cosine similarity score between `vecA` and `vecB`.

## normalizeVector

Normalizes a vector to unit length. If the vector has zero magnitude, returns the original vector.

### Parameters

*   `vec` **[Array][19]<[number][20]>** Input vector.

### Examples

```javascript
normalizeVector([3, 4]);
// => [0.6, 0.8] (vector normalized to length 1)
normalizeVector([0, 0]);
// => [0, 0] (zero vector remains unchanged)
normalizeVector([1, 1, 1]);
// => [0.5773502691896258, 0.5773502691896258, 0.5773502691896258]
```

Returns **[Array][19]<[number][20]>** A new vector scaled to unit length.

## isNormalized

Efficiently checks if a vector is L2-normalized (unit length).

### Parameters

*   `vec` **[Array][19]<[number][20]>** Input vector.
*   `epsilon` **[number][20]** Tolerance for floating-point comparison. (optional, default `1e-6`)

### Examples

```javascript
isNormalized([1, 0]);
// => true (vector length is exactly 1)
isNormalized([0.6, 0.8]);
// => true (approximately unit length)
isNormalized([3, 4]);
// => false (length is 5)
isNormalized([0, 0]);
// => false (length is 0)
```

Returns **[boolean][21]** True if the L2 norm is within epsilon of 1.

## meanVector

Computes the mean (centroid) vector from an array of vectors.
Assumes all vectors are of equal length.

### Parameters

*   `vectors` &#x20;

### Examples

```javascript
meanVector([[1, 2], [3, 4], [5, 6]]);
// => [3, 4]
meanVector([]);
// => []
```

Returns **[Array][19]<[number][20]>** The mean vector.

## findNearestNeighbors

Finds the nearest neighbors to a given query embedding from a list of samples
based on cosine similarity.

### Parameters

*   `queryEmbedding` **[Array][19]<[number][20]>** The embedding vector to compare against.
*   `samples` **[Array][19]<{embedding: [Array][19]<[number][20]>, label: [string][22]}>** An array of samples, each with an `embedding` and a `label`.
*   `options` **[object][23]** Optional settings. (optional, default `{}`)

    *   `options.topK` **[number][20]** Number of top results to return. Default is 1. (optional, default `1`)
    *   `options.threshold` **[number][20]** Minimum similarity score threshold for results. (optional, default `0`)

### Examples

```javascript
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

Returns **[Array][19]<{embedding: [Array][19]<[number][20]>, label: [string][22], similarityScore: [number][20]}>** An array of nearest neighbors with similarity scores.

## rankBySimilarity

Ranks all samples by cosine similarity to the query embedding.
Does NOT apply threshold or topK filtering.

### Parameters

*   `queryEmbedding` **[Array][19]<[number][20]>** The embedding vector to compare against.
*   `samples` **[Array][19]<{embedding: [Array][19]<[number][20]>, label: [string][22]}>** Samples with embeddings and labels.

### Examples

```javascript
const samples = [
  { embedding: [1, 0], label: 'A' },
  { embedding: [0, 1], label: 'B' },
  { embedding: [1, 1], label: 'C' },
];
rankBySimilarity([1, 0], samples);
// => [
//   { embedding: [1, 0], label: 'A', similarityScore: 1 },
//   { embedding: [1, 1], label: 'C', similarityScore: 0.707... },
//   { embedding: [0, 1], label: 'B', similarityScore: 0 }
// ]

rankBySimilarity([0, 1], samples);
// => [
//   { embedding: [0, 1], label: 'B', similarityScore: 1 },
//   { embedding: [1, 1], label: 'C', similarityScore: 0.707... },
//   { embedding: [1, 0], label: 'A', similarityScore: 0 }
// ]
```

Returns **[Array][19]<{embedding: [Array][19]<[number][20]>, label: [string][22], similarityScore: [number][20]}>** Sorted by descending similarity.

[1]: #computecosinesimilarity

[2]: #parameters

[3]: #examples

[4]: #normalizevector

[5]: #parameters-1

[6]: #examples-1

[7]: #isnormalized

[8]: #parameters-2

[9]: #examples-2

[10]: #meanvector

[11]: #parameters-3

[12]: #examples-3

[13]: #findnearestneighbors

[14]: #parameters-4

[15]: #examples-4

[16]: #rankbysimilarity

[17]: #parameters-5

[18]: #examples-5

[19]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array

[20]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number

[21]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean

[22]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[23]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object
