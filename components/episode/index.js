// components/epsoid/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: {
      type: Number,
      observer: function(newVal, oldVal, changePath) {
        if(newVal < 10) {
          this.setData({
            _index: '0' + newVal
          });
        }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    year: Number,
    month: String,
    _index: String,
    months: [
      '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月',
      '十二月'
    ],
  },

  lifetimes: {
    attached() {
      // 在组件实例进入页面节点树时执行
      const date = new Date();
      const month = date.getMonth();
      const year = date.getFullYear();
      this.setData({
        month: this.data.months[month],
        year: year
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
