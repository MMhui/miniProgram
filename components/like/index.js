// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like: Boolean,
    count: Number,
    readOnly: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    likeImgUrl: 'images/like.png',
    unlikeImgUrl: 'images/like@dis.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike: function (event) {
      if (this.properties.readOnly) { return false; }
      let count = this.properties.count;
      count = this.properties.like ? count - 1 : count + 1;
      this.setData({
        count: count,
        like: !this.properties.like
      });
      this.triggerEvent('like', {
        behavior: this.properties.like
      }, {});
    }
  }
})
