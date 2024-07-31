const { authLs } = require("./auth.js")
const { navigation } = require("./router.js")

/** @type { "local" | "development" | "production" } */
const env = "local";
const contentTypes = {
  json: "application/json",
  formData: "multipart/form-data",
  urlencoded: "application/x-www-form-urlencoded"
}
/**
 * api 请求相关方法
 */
module.exports = {
  contentTypes,
  getReqConfig,
  requestIsFullfilled,
  httpGet,
  httpPost,
  httpPut,
  httpDelete
}
/** 获取接口请求baseUrl */
function getReqConfig() {
  const reqConfig = {
    baseUrl: ""
  }
  if (env === "local") { // 本地
    reqConfig.baseUrl = "http://local.api.com"   
  } else if (env === "development") { // 测试
    reqConfig.baseUrl = "http://development.api.com"   
  } else if (env === "production") { // 正式
    reqConfig.baseUrl = "http://production.api.com"   
  }
  return reqConfig
}
/** 用于判断接口是否请求成功
 * @param {WechatMiniprogram.RequestSuccessCallbackResult<{ data: any; message: string; code: number; success: boolean; timestamp: string; }>} res
 * @returns {boolean}
 */
function requestIsFullfilled(
  res
) {
  return res.data && res.data.success
}
/**
 * 接口请求基本方法
 * @param { WechatMiniprogram.RequestOption<{ data: any; message: string; code: number; success: boolean; timestamp: string; }> & { showLoading?: boolean; urlCustom?: boolean } } [opts] 接口请求配置
 * @returns { Promise<WechatMiniprogram.RequestSuccessCallbackResult<{ data: any; message: string; code: number; success: boolean; timestamp: string; }>> }
 */
function request(
  opts
) {
  return new Promise((resolve, reject) => {
    const { url, method = "GET", data, showLoading, header = {}, success, fail, complete } = opts
    const token = authLs.getToken()
    const baseHeader = {
      // ajax标识
      "X-Requested-With": "XMLHttpRequest",
      Authorization: token ? "Bearer " + token : ""
    }
    if (method === "POST") {
      baseHeader['content-type'] = contentTypes.json
    }
    if (showLoading) {
      wx.showLoading({
        mask: true,
        title: "加载中"
      })
    }
    return wx.request({
      url: opts.urlCustom === true ? url : getReqConfig().baseUrl + url,
      method,
      data,
      header: {
        ...baseHeader,
        ...header
      },
      success: function (res) {
        console.log("req success", res, opts)
        if (showLoading) {
          wx.hideLoading()
        }
        if (res.statusCode !== 200) {
          if (res.statusCode === 401) {
            wx.showToast({
              title: "请重新登录",
              icon: "none",
              mask: false
            })
            authLs.removeToken()
            // 登录失败 跳转到登录页面
            navigation("pages/login/index")
          } else {
            wx.showToast({
              title: "请求失败，请稍候再试",
              icon: "none",
              mask: false
            })
          }
          return reject(res)
        }
        if (!res.data.success) {
          if (res.data.message) {
            wx.showToast({
              title: res.data.message || "请求失败，请稍候再试",
              icon: "none",
              mask: false
            })
          }
          return reject(res)
        }
        success && success(res)
        resolve(res)
      },
      fail: function (res) {
        console.log("req fail", res, opts)
        if (showLoading) {
          wx.hideLoading()
        }

        wx.showToast({
          title: res.errMsg || "请求失败，请稍候再试",
          icon: "none",
          mask: false
        })

        fail && fail(res)
        reject(res)
      },
      complete: function (res) {
        complete && complete(res)
      }
    })
  })
}

/**
 * send a Get request
 * @param {string} url request url
 * @param {[key: string]: any} [query={}] query params
 * @param {Omit<WechatMiniprogram.RequestOption<{ data: any; message: string; code: number; success: boolean; timestamp: string; }> & { showLoading?: boolean; urlCustom?: boolean }, "url" | "method" | "data">} opts request opts
 * @param urlPrefix request url prefix, default `/api`
 * @returns { Promise<WechatMiniprogram.RequestSuccessCallbackResult<{ data: any; message: string; code: number; success: boolean; timestamp: string; }>> }
 */
function httpGet(
  url,
  query = {},
  opts = {},
  urlPrefix = "/api"
) {
  return request({ url: urlPrefix + url, method: "GET", data: query, ...opts })
}
/**
 * send a POST request
 * @param {string} url request url
 * @param {[key: string]: any} [data={}] post data
 * @param {Omit<WechatMiniprogram.RequestOption<{ data: any; message: string; code: number; success: boolean; timestamp: string; }> & { showLoading?: boolean; urlCustom?: boolean }, "url" | "method" | "data">} opts request opts
 * @param urlPrefix request url prefix, default `/api`
 * @returns { Promise<WechatMiniprogram.RequestSuccessCallbackResult<{ data: any; message: string; code: number; success: boolean; timestamp: string; }>> }
 */
function httpPost(
  url,
  data = {},
  opts = {},
  urlPrefix = "/api"
) {
  return request({ url: urlPrefix + url, method: "POST", data, ...opts })
}
/**
 * send a PUT request
 * @param {string} url request url
 * @param {[key: string]: any} [data={}] Put data
 * @param {Omit<WechatMiniprogram.RequestOption<{ data: any; message: string; code: number; success: boolean; timestamp: string; }> & { showLoading?: boolean; urlCustom?: boolean }, "url" | "method" | "data">} opts request opts
 * @param urlPrefix request url prefix, default `/api`
 * @returns { Promise<WechatMiniprogram.RequestSuccessCallbackResult<{ data: any; message: string; code: number; success: boolean; timestamp: string; }>> }
 */
function httpPut(
  url,
  data = {},
  opts = {},
  urlPrefix = "/api"
) {
  return request({ url: urlPrefix + url, method: "PUT", data, ...opts })
}
/**
 * send a DELETE request
 * @param {string} url request url
 * @param {[key: string]: any} [data={}] Delete data
 * @param {Omit<WechatMiniprogram.RequestOption<{ data: any; message: string; code: number; success: boolean; timestamp: string; }> & { showLoading?: boolean; urlCustom?: boolean }, "url" | "method" | "data">} opts request opts
 * @param urlPrefix request url prefix, default `/api`
 * @returns { Promise<WechatMiniprogram.RequestSuccessCallbackResult<{ data: any; message: string; code: number; success: boolean; timestamp: string; }>> }
 */
function httpDelete(
  url,
  data = {},
  opts = {},
  urlPrefix = "/api"
) {
  return request({ url: urlPrefix + url, method: "DELETE", data, ...opts })
}
