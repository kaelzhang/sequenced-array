const test = require('ava')
const SequencedArray = require('../src')

const runOne = (array, item, expected, desc, compare) => {
  const message = `${item} -> ${JSON.stringify(array)}, desc: ${
    desc
  } => ${
    JSON.stringify(expected)}`
  test(message, t => {
    const sa = array instanceof SequencedArray
      ? array
      : new SequencedArray(array, {desc, compare})

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

const orderBook = [
  {price: 1, amount: 2},
  {price: 2, amount: 10},
  {price: 3, amount: 12}
]

runOne(orderBook, {
  price: 2.5, amount: 5
}, {
  index: 2,
  inserted: true
}, false, (a, b) => a.price - b.price)

runOne((() => {
  const arr = new SequencedArray(4)
  arr[2] = 2
  return arr
})(), 3, {
  index: 3,
  inserted: true
})

runOne((() => {
  const arr = new SequencedArray(5)
  arr[0] = 0
  arr[4] = 4
  return arr
})(), 3, {
  index: 3,
  inserted: true
})

runOne(new SequencedArray(4), 3, {
  index: 2,
  inserted: true
})

test('no args', t => {
  t.is(new SequencedArray().length, 0)
})
