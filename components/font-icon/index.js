// plugin/components/font-icon/index.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    name: {
      type: String,
    },
    color: {
      type: String
    },
    size: {
      type: Number
    }
  },

  externalClasses: ["icon-class"],
  data: {
    style: ''
  },
  observers: {
    'color, size': function(color, size) {
      this.setData({
        style: (color ? `color: ${color};` : '') + (size ? `font-size: ${size}rpx;` : '')
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    handleTap() {
      this.triggerEvent("tapicon")
    }
  }
})