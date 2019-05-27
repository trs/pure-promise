# pure-promise

> Collection of functional utilities for working with native promises

[![npm](https://img.shields.io/npm/v/pure-promise.svg)](https://www.npmjs.com/package/pure-promise)

## Install

```sh
$ npm install pure-promise
# or
$ yarn add pure-promise
```

## Usage

### `reduce`

> Serially reduce an array, or promise for an array

```js
import {reduce} from 'pure-promise';

const sum = await reduce([
  Promise.resolve(1),
  2,
  3
], (prev, next) => prev + next);

console.log(sum); // 6 
```

### `map`

> Concurrently map through an array, or promise for an array

```js
import {map} from 'pure-promise';

const plusOne = await map([
  1,
  2,
  Promise.resolve(3)
], (value) => value + 1);

console.log(plusOne); // [2, 3, 4]
```

### `mapSeries`

> Serially map through an array, or promise for an array

```js
import {mapSeries} from 'pure-promise';

const plusOne = await mapSeries([
  Promise.resolve(1),
  2,
  3
], (value) => value + 1);

console.log(plusOne); // [2, 3, 4]
```

### `filter`

> Concurrently filter values from an array, or promise for an array

```js
import {filter} from 'pure-promise';

const plusOne = await filter([
  1,
  Promise.resolve(2),
  3
], (value) => value % 2 === 0);

console.log(plusOne); // [2]
```

### `props`

> Concurrently resolves an object or arrays values into their key/value pairs

```js
import {props} from 'pure-promise';

const plusOne = await props({
  key1: Promise.resolve(1),
  key2: 2
});

console.log(plusOne); // { key1: 1, key2: 2 }
```

### `pipe`

> Concurrently pipes the results of the previous function into the next

```js
import {pipe} from 'pure-promise';

const pipeline = pipe(
  (a) => a + 1, // a = 1
  (b) => Promise.resolve(b * 2) // b = 2
);

const result = await pipeline(1);

console.log(result); // 4
```
