const test = require('ava')
const log = require('util').debuglog('sequenced-array')
const SequencedArray = require('../src')

const runOne = (array, item, expected, desc, compare) => {
  const message = `${item} -> ${JSON.stringify(array)}, desc: ${
    desc
  } => ${
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

const createCases = (array, sign) => [
  [- 1, {
    index: sign === 1
      ? 0
      : array.length,
    inserted: true
  }],
  ...array.map(i => [i, {
    index: sign === 1
      ? i
      : array.length - i - 1,
    inserted: false
  }]),
  ...array.map(i => [i + 0.5 * sign, {
    index: sign === 1
      ? i + sign
      : array.length - i,
    inserted: true
  }])
]

const runCases = (array, cases, desc) => cases.forEach(([
  item,
  expected
]) => {
  runOne(array, item, expected, desc)
})

const createArray = (length, sign = 1) => {
  const array = []
  let i = sign === 1
    ? 0
    : length - 1
  while (i < length && i > - 1) {
    array.push(i)
    i += sign
  }

  return array
}

const run = (sign, desc = false) => length => {
  const array = createArray(length, sign)
  runCases(array, createCases(array, sign), desc)
}

createArray(10).forEach(run(1))
createArray(10).forEach(run(- 1, true))
