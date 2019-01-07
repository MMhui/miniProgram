// pages/book-detail/book-detail.js
import { getDetail, getLikeStatus, addBookComment } from '../../api/book.js';
import { getComments, postComment } from '../../api/comment.js';
import { like, cancelLike } from '../../api/like.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    book: Object,
    comments: Array,
    likeStatus: Boolean,
    likeCount: Number,
    loadNoComment: false,
    posting: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const bookId = options.bookId;
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    Promise.all([
      getDetail({bookId}),
      getComments({bookId}),
      getLikeStatus({bookId})
    ]).then(values => {
      wx.hideLoading();
      this.setData({
        book: values[0],
        comments: values[1].comments,
        loadNoComment: values[1].comments.length === 0,
        likeStatus: values[2].like_status === 1,
        likeCount: values[2].fav_nums
      });
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  onLike(event) {
    const like_or_cancel = event.detail.behavior;
    this._likeOrCancelLike(like_or_cancel, {
      art_id: this.data.book.id,
      type: 400
    });
  },

  handleShowPosting() {
    this.setData({
      posting: true
    });
  },

  handleHidePosting() {
    this.setData({
      posting: false
    });
  },

  handleSendComment(event) {
    if (event.detail.value == '') {
      return false;
    }
    this._sendComment({
      book_id: this.data.book.id,
      content: event.detail.value
    });
  },

  handleTagTap(event) {
    this._sendComment({
      book_id: this.data.book.id,
      content: event.detail.text
    });
  },

  _likeOrCancelLike(likeOrUnlike, params) {
    if (likeOrUnlike) {
      like(params).then(res => {}).catch(error => {
        this.setData({
          count: this.data.likeCount,
          like: this.data.likeStatus
        });
      })
    } else {
      cancelLike(params).then(res => { }).catch(error => {
        this.setData({
          count: this.data.likeCount,
          like: this.data.likeStatus
        });
      })
    }
  },

  _sendComment(params) {
    addBookComment(params).then(res => {
      wx.showToast({
        title: '添加评论成功',
      });
      this._getComments();
      this.setData({
        posting: false
      });
    }).catch(error => {
      this.setData({
        posting: false
      });
    });
  },

  _getComments() {
    getComments({
      bookId: this.data.book.id
    }).then(res => {
      this.setData({
        comments: res.comments,
        loadNoComment: res.comments.length === 0
      });
    }).catch(error => {
      this.setData({
        comments: [],
        loadNoComment: true
      });
    });
  }
})