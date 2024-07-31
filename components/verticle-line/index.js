/** 竖线组件 */
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    width: {
      type: Number,
      value: 2
    },
    height: {
      type: Number,
    },
    color: {
      type: String,
      value: "#B8B8BF"
    }
  },
  externalClasses: ["line-class"]
})