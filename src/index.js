const DEFAULT_COMPARE = (a, b) => a - b

const isSingleItemArray = array => Array.isArray(array) && array.length === 1

const createArgs = init => Array.isArray(init)
  ? init.length === 1
    ? []
    : init
  : [init]

module.exports = class SequencedArray extends Array {
  constructor (init, {
    desc,
    compare = DEFAULT_COMPARE
  } = {}) {
    super(...createArgs(init))

    // new Array(1, 2)     -> [1, 2]
    // new Array(1)        -> [<1 empty item>] -> WTF!
    if (isSingleItemArray(init)) {
      this.push(init[0])
    }

    // Default to low -> high
    this._sign = desc
      ? - 1
      : 1

    // Supports to compare things that are not numbers
    this._compare = compare
  }

  // < 0 : not satisfy
  // = 0 : equal
  // > 0 : satisfy
  match (score, index) {
    if (this.length === 0) {
      return - 1
    }

    if (index in this) {
      const item = this[index]
      return score === item
        ? 0
        : this._compare(score, item) * this._sign
    }

    // return undefined
  }

  _find (score, min, max) {
    const r_min = this.match(score, min)

    // Match
    if (r_min === 0) {
      return [min, min]
    }

    if (r_min < 0) {
      return [min - 1, min]
    }

    if (min === max) {
      return [min, min + 1]
    }

    // r_min > 0 || r_min === undefined

    const r_max = this.match(score, max)
    if (r_max === 0) {
      return [max, max]
    }

    if (r_max > 0) {
      return [max, max + 1]
    }

    // r_max < 0 || r_max === undefined

    // There is no items between min and max
    if (min + 1 === max) {
      return [min, max]
    }

    if (r_min === undefined || r_max === undefined) {
      return this._find(score, min + 1, max - 1)
    }

    const mid = Math.floor((min + max) / 2)
    const r_mid = this.match(score, mid)
    if (r_mid === 0) {
      return [mid, mid]
    }

    if (r_mid > 0) {
      return mid + 1 === max
        ? [mid, max]
        : this._find(score, mid + 1, max - 1)
    }

    if (r_mid < 0) {
      return mid - 1 === min
        ? [min, mid]
        : this._find(score, min + 1, mid - 1)
    }

    return this._find(score, min + 1, max - 1)
  }

  find (score) {
    return this._find(score, 0, this.length - 1)
  }

  // Returns `number` the inserted index of the array
  insert (score) {
    const [min, max] = this.find(score)
    if (min === max) {
      return {
        index: max,
        inserted: false
      }
    }

    this.splice(max, 0, score)
    return {
      index: max,
      inserted: true
    }
  }
}
