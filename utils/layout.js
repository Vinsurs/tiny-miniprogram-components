/** 页面布局相关方法 */
const { throttle } = require("./common.js")

/**
 * 获取小程序布局相关信息
 * @returns {{width: number;height: number;statusBarHeight: number;menuButtonRect: WechatMiniprogram.ClientRect;}}
 */
const getWindowInfo = () => {
  if (getWindowInfo.windowInfo) return getWindowInfo.windowInfo
  try {
    const res = wx.getSystemInfoSync()
    const menuButtonRect = wx.getMenuButtonBoundingClientRect()
    getWindowInfo.windowInfo = {
      width: res.windowWidth,
      height: res.windowHeight,
      statusBarHeight: res.statusBarHeight,
      menuButtonRect
    }
    return getWindowInfo.windowInfo
  } catch (e) {
    console.log("[getSystemInfoSync] error: ", e)
    return getWindowInfo()
  }
}

/** 导航栏布局基本信息
 * @default
 */
const NAVIGATION_BASE_LAYOUT = {
  statusBarHeight: 20,
  navigationHeight: 60
}

/** 自定义导航栏布局信息
 *  @default
 */
const NAVIGATION_LAYOUT = {
  ...NAVIGATION_BASE_LAYOUT,
  menuButtonHeight: 50,
  menuButtonPadding: 5,
  navigationOffset: 0
}

/**
 * 获取设备状态栏和导航栏的布局信息, 用于自定义导航栏
 * @param [navigationOffset=0] 计算导航栏高度的上下偏移量, 取值越大导航栏高度越高，最小值为`-menuButtonPadding`, 默认为0
 */
function useLayout(navigationOffset = 0) {
  const { statusBarHeight, menuButtonRect } = getWindowInfo()
  const menuButtonPadding = menuButtonRect.top - statusBarHeight
  const layout = {
    statusBarHeight,
    menuButtonHeight: menuButtonRect.height,
    menuButtonPadding,
    navigationHeight:
      menuButtonRect.height +
      Math.min(menuButtonPadding, menuButtonPadding + navigationOffset) * 2,
    navigationOffset
  }
  return layout
}

/**
 * 页面自定义导航栏 导航栏背景色透明度
 * @param {(opactiy: number) => any} handler
 * @returns {{updateOpacity: (scrollTop:number) => number}}
 */
function useNavigationOpacity(handler) {
  const updateOpacity = throttle((scrollTop) => {
    const needle = 120
    const _opacity = Math.min(scrollTop, needle) / needle
    handler && handler(_opacity)
    return _opacity
  }, 30)
  return {
    updateOpacity
  }
}
/** 页面布局相关方法 */
module.exports = {
  getWindowInfo,
  NAVIGATION_BASE_LAYOUT,
  NAVIGATION_LAYOUT,
  useLayout,
  useNavigationOpacity
}