/** @component backdrop */
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    open: {
      type: Boolean,
      value: false
    },
    maskClickable: {
      type: Boolean,
      value: true
    },
    zIndex: {
      type:   Number,
      value: 999
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
    handleTapMask(ev) {
      if (this.properties.maskClickable) {
        this.triggerEvent("tapmask")
      }
    },
    handleSlotTap() {},
    switchPageLock() {
      if (typeof wx.setPageStyle === "function") {
        if (this.properties.open) {
          wx.setPageStyle({
            style: {
              overflow: 'hidden'
            }
         })
        } else {
          wx.setPageStyle({
            style: {
              overflow: 'auto'
            }
         })
        }
      }
    }
  },
  observers: {
    open(open) {
      if (!open && !this.data.mounted) {
        return;
      }
      this.switchPageLock()
    }
  }
})