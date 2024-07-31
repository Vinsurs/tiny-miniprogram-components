const { useLayout, NAVIGATION_LAYOUT } = require("../../utils/layout.js")
/**
 * @description 自定义导航栏
 * @component Navbar
 */
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    iconName: {
      type: String,
      value: "icon-dingbu-fanhui"
    },
    iconColor: {
      type: String,
      value: "#333333"
    },
    iconSize: {
      type: Number,
      value: 40
    },
    navBarOffset: {
      type: Number,
      value: 0
    },
    navigationBarBackgroundColor: {
      type: String,
      value: "#fff"
    },
    navigationBarTextStyle: {
      type: String,
      value: "#333333"
    },
    navigationBarTitleText: {
      type: String,
      value: ""
    },
    backgroundColorTop: {
      type: String,
      value: "#fafafd"
    },
    navigationBarPlaceholder: {
      type: Boolean,
      value: true
    },
    fixed: {
      type: Boolean,
      value: true
    },
    disableBack: {
      type: Boolean,
      value: false
    },
    zIndex: {
      type: Number,
      value: 99999999
    }
  },

  /** 
   * 外部样式类
   */
  externalClasses: [
    "navbar-class",
    "placeholder-class"
  ],

  /**
   * 组件的初始数据
   */
  data: {
    layout: NAVIGATION_LAYOUT,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleArrowLeftClick() {
      this.triggerEvent("beforeback")
      if (this.properties.disableBack) return;
      wx.navigateBack()
    }
  },

  lifetimes: {
    attached() {
      this.setData({
        layout: useLayout(this.properties.navBarOffset),
      })
      this.triggerEvent("layout", {
        statusBarHeight: this.data.layout.statusBarHeight,
        navigationHeight: this.data.layout.navigationHeight
      })
    },
  }
})