const test = require('ava')
const log = require('util').debuglog('sequenced-array')
const SequencedArray = require('../src')

const runOne = (array, item, expected, desc, compare) => {
  const message = `${item} -> ${JSON.stringify(array)}: ${
    JSON.stringify(expected)}`
  test(message, t => {
    const sa = new SequencedArray(array, {desc, compare})
    if (array.length === 1 && array[0] === 0) {
      sa.push(0)
    }

    const result = sa.insert(item)
    t.deepEqual(result, expected, message)
  })
}

const createCases = (array, sign = 1) => [
  [- 1, {index: 0, inserted: true}],
  ...array.map(i => [i, {index: i, inserted: false}]),
  ...array.map(i => [i + 0.5 * sign, {index: i + sign, inserted: true}])
]

const runCases = (array, cases) => cases.forEach(([
  item,
  expected
]) => {
  runOne(array, item, expected)
})

const createArray = length => {
  const array = []
  let i = - 1
  while (++ i < length) {
    array.push(i)
  }

  return array
}

const run = length => {
  const array = createArray(length)
  runCases(array, createCases(array))
}

createArray(10).forEach(run)
