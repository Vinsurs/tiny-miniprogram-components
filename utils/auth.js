/** 该文件主要是授权相关逻辑 */
const ls = require("./ls.js")

/** 授权相关本地存储 */
const authLs = {
  /**
   * 获取token
   * @returns { string | null }
   */
  getToken() {
    return ls.get("token", null)
  },
  /**
   * 获取用户信息
   * @returns { {[key: string]: any} }
   */
  getUserInfo() {
    return ls.get("userInfo", {})
  },
  /**
   * 设置token
   * @param { string | null } token
   */
  setToken(token) {
    ls.set("token", token)
  },
  /**
   * 设置用户信息 
   * @param { {[key: string]: any} } userInfo
   */
  setUserInfo(userInfo) {
    ls.set("userInfo", userInfo)
  },
  /**
   * 移除本地token
   */
  removeToken() {
    ls.del("token")
  },
  /**
   * 移除本地用户信息
   */
  removeUserInfo() {
    ls.del("userInfo")
  },
  /**
   * 移除本地用户授权信息
   */
  removeAuthInfo() {
    authLs.removeToken()
    authLs.removeUserInfo()
  },
  /**
   * 更新用户信息 
   * @param { {[key: string]: any} } userInfo
   */
  patchUserInfo(userInfo) {
    const prev = authLs.getUserInfo()
    if (prev) {
      authLs.setUserInfo({
        ...prev,
        ...userInfo
      })
    } else {
      authLs.setUserInfo(userInfo)
    }
  },
  /**
   * 设置授权信息
   * @param {{token: string; userInfo:any; }} authInfo 
   */
  setAuthInfo(authInfo) {
    authLs.setToken(authInfo.token)
    authLs.setUserInfo(authInfo.userInfo)
  }
}

module.exports = {
  authLs
}
