/**
 * 本地存储基本方法
 * @description 本地存储建议使用该提供方式进行设置，保持代码获取本地存储代码统一性，也方便后续维护
 */
module.exports = {
    set(key, val, async = false) {
      const data = JSON.stringify(val)
      try {
        if (!async) {
          wx.setStorageSync(key, data)
        } else {
          wx.setStorage({
            key,
            data
          })
        }
      } catch (error) {
        console.log(`[ls.set] Error: key: ${key}, val: ${data}`)
      }
    },
    get(key, defVal) {
      try {
        const val = wx.getStorageSync(key)
        if (val) {
          return JSON.parse(val)
        }
      } catch (error) {
        console.log(`[ls.get] Error: key: ${key}`)
      }
      return defVal
    },
    del(key) {
      try {
        return wx.removeStorageSync(key)
      } catch (error) {
        console.log(`[ls.del] Error: key: ${key}`)
      }
    },
    clear() {
      wx.clearStorageSync()
    }
  }
  