const n1Reg = new RegExp("\n", "g");
const anyTagReg = /<[a-zA-Z]+\d?\b/gi;
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    html: {
      type: String,
      value: "",
      observer(newVal) {
        const __html = newVal
        /** 给任意html标签加class类名，类名为本身标签名 */
        .replace(anyTagReg, function (value) {
            const tag = value.slice(1)
            return `${value} class='${tag}'`
        })
        /** 将所有换行符替换为<br />标签 */
        .replace(n1Reg, "<br />");
        this.setData({ __html })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    __html: ""
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})