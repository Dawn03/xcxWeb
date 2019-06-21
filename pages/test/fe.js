
Component({
  /**
   * 组件的属性列表
   */
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    paramA: Number,
    paramB: String,
  },

  /**
   * 组件的初始数据
   */
  data: {
    name: ' xiaoxiao'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad: function () {
      console.log( this.data.paramA)
      console.log( this.data.paramB)
      this.data.paramA // 页面参数 paramA 的值
      this.data.paramB // 页面参数 paramB 的值
    }
  }
})
