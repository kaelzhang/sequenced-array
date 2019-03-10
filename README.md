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

The sequenced array class which maintains sorted order with time complexity `O(logN)` by using binary search algorithm.

In most situations, the worst-case performance is `O(longN)` except for the cases that there are `<empty item>`s in the array.

If each item of the array is an empty item which is the worst case, the time complexity is `O(N)`, because we need to compare all items of the array to determine an insert point.

## Install

```sh
$ npm i sequenced-array
```

## Usage

```js
import SequencedArray from 'sequenced-array'
```

## new SequencedArray(arrayLength, {desc, compare})
## new SequencedArray(array, {desc, compare})

```js
class SequencedArray extends Array {}
```

`SequencedArray` is a subclass of `Array`, so that its instances inherit all methods, getters and setters of normal arrays.

- **desc** `?boolean=false` Whether the array should be sorted in decending order. By default `SequencedArray`s are in ascending order.
- **compare** `?Function=(a, b) => a - b` The compare function as the same as the `compareFunction` of `Array.prototype.filter(compareFunction)`. So that we can compare array items which are not numbers.

Creates a `SequencedArray`

```js
// creates an empty array
new SequencedArray([])

// creates an array of length 10 with 10 empty items.
new SequencedArray(10)

// creates an array of [1, 2, 3]
new SequencedArray([1, 2, 3])

// creates an order book which puts the highest bid at the top
const orderBook = new SequencedArray([], {
  desc: true,
  compare: (a, b) => a.price - b.price
})
orderBook.insert({price: 2, amount: 1})
orderBook.insert({price: 3, amount: 2})
orderBook.insert({price: 1, amount: 1})

console.log(orderBook[0])   // {price: 3, amount: 2}
console.log(orderBook[1])   // {price: 2, amount: 1}
console.log(orderBook[2])   // {price: 1, amount: 2}
```

### array.match(item, index): number | undefined

- **item** `any`
- **index** `number`

Matches the `item` with `array[index]`

Returns
- `< 0` indicates that `item` should be before the index `index`
- `= 0` indicates that `item` equals the item at index `index`
- `> 0` indicates that `item` should be after the index `index`
- `undefined` indicates that `array[index]` is an empty item, so it is not matchable.

```js
const arr = new SequencedArray(4)
arr[2] = 2
arr.match(5, 0)     // undefined
arr.match(1, 2)     // -1
arr.match(3, 2)     // 1
arr.match(2, 2)     // 0
```

### array.find(item): [number, number]

Finds which location should `item` be located at.

Returns `[min, max]`
- If `min` equals to `max`, it indicates that `item` is equals to `array[min]`
- Otherwise, it indicates that `item` could be inserted between index `min` and index `max`

```js
new SequencedArray([1, 2, 3, 4]).find(2.5)  // [1, 2]
new SequencedArray([1, 2, 3, 4]).find(2)    // [1, 1]

new SequencedArray([1, 2, 3, 4]).find(0)
// [-1, 0]
// `0` should be placed before `1`(array[0])
```

### array.insert(item): {index: number, inserted: boolean}

Insert `item` into the array and maintains the sorting order.

Returns `Object`
- **index** `number` The `item` has been located at index `index`
- **inserted** `boolean`
  - `true` the new item has been inserted into the array
  - `false` the `item` equals to `array[index]` and it is unnecessary to insert the item as a new one.

```js
const a = new SequencedArray([1, 2, 3, 4])
a.insert(2.5)
// {
//   index: 2,
//   inserted: true
// }

// Then, the array is:
// [1, 2, 2.5, 3, 4]
```

```js
const b = new SequencedArray([1, 2, 3, 4])
b.insert(2)
// {
//   index: 1,
//   inserted: false
// }

// `2` is already located at index 1
```

```js
const c = new SequencedArray([])
c.insert(3)
c.insert(1)
c.insert(2)
// Then the array is: [1, 2, 3]

const d = new SequencedArray([], {desc: true})
c.insert(3)
c.insert(1)
c.insert(2)
// Then the array is: [3, 2, 1]
```

## License

MIT
