// plugin/components/modal/index.js
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
    title: {
      type: String
    },
    closable: {
      type: Boolean,
      value: true
    }
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
    handleTapClose() {
      this.triggerEvent("tapclose")
    },
    handleTapMask() {
      if (this.properties.maskClickable) {
        this.triggerEvent("tapmask")
      }
    },
    switchAppear() {
      if (this.properties.open) {
        this.animate(".modal", [
          { translate: ["-50%", "-50%"], scale: [0, 0] },
          { translate: ["-50%", "-50%"], scale: [1, 1], ease: "ease-in", offset: 0.6 },
        ], 300)
      } else {
        this.animate(".modal", [
          { translate: ["-50%", "-50%"], scale: [1, 1] },
          { translate: ["-50%", "-50%"], scale: [0, 0], ease: "ease-in", offset: 0.6 },
        ], 300)
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