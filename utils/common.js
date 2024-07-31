/**
 * 公共方法集
 */
module.exports = {
    /**
     * 函数防抖
     * @param {function} fn 需要防抖的函数
     * @param {number} delay 防抖延时
     */
    debounce(fn, delay = 300) {
      let timer
      return function () {
        if (timer) {
          clearTimeout(timer)
        }
        const ctx = this
        const args = Array.prototype.slice.call(arguments)
        timer = setTimeout(() => {
          fn.apply(ctx, args)
        }, delay)
      }
    },
    /**
     * 函数节流
     * @param {function} fn 需要节流的函数
     * @param {number} delay 节流频率
     */
    throttle(fn, delay = 300) {
      let timer
      let valid = true
      return function () {
        if (!valid) {
          return
        }
        const ctx = this
        const args = Array.prototype.slice.call(arguments)
        valid = false
        timer = setTimeout(() => {
          fn.apply(ctx, args)
          valid = true
          clearTimeout(timer)
        }, delay)
      }
    }, 
    /**
     * 对象深度拷贝
     * @param {Record<string, any>} obj 需要拷贝的对象
     * @returns {Record<string, any>}
     */
    cloneDeep(obj) {
      return JSON.parse(JSON.stringify(obj))
    }
  }