[![Build Status](https://travis-ci.org/kaelzhang/sequenced-array.svg?branch=master)](https://travis-ci.org/kaelzhang/sequenced-array)
[![Coverage](https://codecov.io/gh/kaelzhang/sequenced-array/branch/master/graph/badge.svg)](https://codecov.io/gh/kaelzhang/sequenced-array)
<!-- optional appveyor tst
[![Windows Build Status](https://ci.appveyor.com/api/projects/status/github/kaelzhang/sequenced-array?branch=master&svg=true)](https://ci.appveyor.com/project/kaelzhang/sequenced-array)
-->
<!-- optional npm version
[![NPM version](https://badge.fury.io/js/sequenced-array.svg)](http://badge.fury.io/js/sequenced-array)
-->
<!-- optional npm downloads
[![npm module downloads per month](http://img.shields.io/npm/dm/sequenced-array.svg)](https://www.npmjs.org/package/sequenced-array)
-->
<!-- optional dependency status
[![Dependency Status](https://david-dm.org/kaelzhang/sequenced-array.svg)](https://david-dm.org/kaelzhang/sequenced-array)
-->

# sequenced-array

<!-- description -->

## Install

```sh
$ npm i sequenced-array
```

## Usage

```js
import SequencedArray from 'sequenced-array'

const array = new SequencedArray()
```

## new SequencedArray({desc, compare})

- **desc** `?boolean=false` Whether the array should be sorted in decending order. By default `SequencedArray`s are in ascending order.
- **compare** `?Function=(a, b) => a - b`

### .insert(item)

### .find(item)

### .match(item, index)

## License

MIT
