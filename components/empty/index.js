/** 空状态组件 */
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    description: {
      type: String,
      value: "暂无数据，正努力完善中.."
    },
    actionButton: {
      type: Boolean,
      value: false
    },
    actionButtonText: {
      type: String
    }
  },

  externalClasses: ["empty-class", "action-button-class"],

  /**
   * 组件的方法列表
   */
  methods: {
    handleActionButtonTap() {
      this.triggerEvent("tapactionbutton")
    }
  }
})