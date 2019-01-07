// pages/classic-detail/classic-detail.js
import * as getClassic from '../../api/classic.js';
import classicUtils from '../../utils/utils.js';
import { getLikeInfo, like, cancelLike } from '../../api/like.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    count: 0,
    like: false,
    classic: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let cid = options.cid
    let type = options.type
    getClassic.getClassicById(options).then(res => {
      this._getLikeInfo({
        type: res.type,
        id: res.id
      })
      this.setData({
        classic: res
      })
    });
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

  handleLikeTap(event) {
    const like_or_cancel = event.detail.behavior;
    this._likeOrCancelLike(like_or_cancel, {
      art_id: this.data.classic.id,
      type: this.data.classic.type
    })
  },

  _getLikeInfo(params) {
    getLikeInfo(params).then(res => {
      this.setData({
        count: res.fav_nums,
        like: res.like_status === 1
      });
    })
  },

  _likeOrCancelLike(likeOrUnlike, params) {
    if (likeOrUnlike) {
      like(params).then(res => { }).catch(error => {
        this.setData({
          count: this.data.count,
          like: this.data.like
        });
      })
    } else {
      cancelLike(params).then(res => { }).catch(error => {
        this.setData({
          count: this.data.count,
          like: this.data.like
        });
      })
    }
  }
})