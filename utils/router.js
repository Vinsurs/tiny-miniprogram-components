/** 路由相关方法 */
module.exports = {
    navigation,
    makePagePath,
    querySerialize,
    queryParse
  }
  /** 路由跳转(基于插件内页面跳转,调用时仅需传入要跳转的页面路径,不需要传插件跳转协议前缀)
   * @description 路由跳转建议使用该方法进行跳转以保持跳转统一，方便后续有必要加入跳转拦截等逻辑操作
   * @param {string} path 跳转路径,需要以斜杠开头
   * @param {{[key:string]: any}} [query] 路径携带参数
   * @param {"navigateTo" | "reLaunch" | "switchTab" | "redirectTo"} [openType="navigateTo"] 路由跳转方式
   */
  function navigation(
    path,
    query,
    openType = "navigateTo"
  ) {
    const url = makePagePath(path, query)
    console.info("跳转url", url)
    wx[openType]({
      url
    })
  }
  /** 整合页面跳转路径
   * @param {string} [pathPrefix] 页面路径前缀, 一般在跳转插件页面时会用到
   */
  function makePagePath (path, query, pathPrefix = "") {
    let search = ""
    if (query) {
      search = querySerialize(query, true)
    }
    return [pathPrefix, "/", path, search].join("")
  }
  /**
     * 序列化query对象转为query string查询参数
     * @param query query 对象
     * @param withPrefix 是否添加“？”
     * ```ts
     * const qs = querySerialize({a: 1, b: 2})
     * expect(qs).toBe("a=1&b=2")
     * ```
     */
    function querySerialize(query, withPrefix = false) {
      if (!query) return ""
      const keys = Object.keys(query)
      if (keys.length === 0) return ""
      const prefix = withPrefix ? "?" : ""
      return keys.reduce((prev, next) => {
        return `${prev}${next}=${query[next]}&`
      }, prefix)
    }
    /**
     * 反序列化query string查询参数转为query对象
     * @param querystring querystring查询参数
     * ```ts
     * const qs = queryParse("a=1&b=2")
     * expect(qs).toBe({a: 1, b: 2})
     * ```
     */
    function queryParse(querystring) {
      if (!querystring) return {}
      querystring = querystring.replace(/^\?/, "")
      const recorder = {}
      querystring.split("&").forEach(entry => {
        const [key, val] = entry.split("=")
        if (!recorder[key]) {
          recorder[key] = []
        }
        recorder[key].push(val)
      })
      const result = {}
      Object.keys(recorder).forEach(key => {
        if (recorder[key].length > 1) {
          result[key] = recorder[key]
        } else {
          result[key] = recorder[key][0]
        }
      })
      return result
    }