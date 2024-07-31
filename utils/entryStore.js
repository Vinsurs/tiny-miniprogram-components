const ls = require("./ls.js")

/**
 * 实体数组本地存储
 * @class EntryStore
 */
module.exports = class EntryStore {
  constructor(key, maxCount = Infinity) {
    this.key = key
    this.maxCount = maxCount
  }
  get() {
    return ls.get(this.key, [])
  }

  set(entries) {
    const newEntries = Array.from(new Set(entries)).slice(0, this.maxCount)
    ls.set(this.key, newEntries)
    return newEntries
  }

  clear() {
    ls.del(this.key)
  }

  push(entry) {
    const entries = this.get()
    const index = entries.findIndex(l => l === entry)
    if (~index) {
      entries.splice(index, 1)
    }
    entries.unshift(entry)
    const newEntries = entries.slice(0, this.maxCount)
    this.set(newEntries)
    return newEntries
  }
}
