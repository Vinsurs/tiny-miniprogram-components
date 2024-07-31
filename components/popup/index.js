// plugin/components/popup/index.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    open: {
      type: Boolean,
      value: false
    },
    mask: {
      type: Boolean,
      value: true
    },
    maskClickable: {
      type: Boolean,
      value: true
    },
    zIndex: {
      type:   Number,
      value: 1000
    },
    /** 是否禁用动画 */
    disableAnimation: {
      type: Boolean,
      value: false
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    mounted: false
  },
  lifetimes: {
    ready() {
      this.setData({
        mounted: true
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    handleTapMask() {
      if (this.properties.maskClickable) {
        this.triggerEvent("tapmask")
      }
    },
    switchAppear() {
      const duration = this.properties.disableAnimation ? 0 : 300
      if (this.properties.open) {
        this.animate(".popup", [
          { translateY: "100%" },
          { translateY: 0, ease: "ease-in", offset: 0.6 },
        ], duration)
      } else {
        this.animate(".popup", [
          { translateY: 0 },
          { translateY: "100%", ease: "ease-in", offset: 0.6 },
        ], duration)
      }
    }
  },
  observers: {
    open(open) {
      if (this.data.mounted || !open) {
        // 初次渲染本就不可见，不需要执行动画
        if (!this.data.mounted) {
          return;
        }
        this.switchAppear()
      } else {
        // 确保组件动画元素已挂载后才执行动画, 否则初始open将不会执行动画打开弹出层
        wx.nextTick(() => {
          this.switchAppear()
        })
      }
    }
  }
})