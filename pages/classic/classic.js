// pages/classic/classic.js
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
    classic: null,
    latest: true,
    first: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getClassic.getLatest().then(res => {
      classicUtils.setStorageSync('latest-classic-index', res.index);
      this.setData({
        classic: res,
        count: res.fav_nums,
        like: res.like_status === 1
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

  handleLikeTap(event) {
    const like_or_cancel = event.detail.behavior;
    this._likeOrCancelLike(like_or_cancel, {
      art_id: this.data.classic.id,
      type: this.data.classic.type
    })
  },

  handleLeftTap() {
    this._getNext();
  },

  handleRightTap() {
    this._getPrevious();
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
      like(params).then(res => {}).catch(error => {
        this.setData({
          count: this.data.count,
          like: this.data.like
        });
      })
    } else {
      cancelLike(params).then(res => {}).catch(error => {
        this.setData({
          count: this.data.count,
          like: this.data.like
        });
      })
    }
  },

  _getNext() {
    this._updateClassic('next');
  },

  _getPrevious() {
    this._updateClassic('previous');
  },

  _updateClassic(nextOrPrevious) {
    getClassic.updateClassic({
      index: this.data.classic.index
    }, nextOrPrevious).then(res => {
      if (res.noCache) {
        this.setData({
          count: res.fav_nums,
          like: res.like_status === 1,
          classic: res,
          latest: classicUtils.isLatest('latest-classic-index', res.index),
          first: classicUtils.isFirst(res.index)
        });
      } else {
        this._getLikeInfo({
          type: res.type,
          id: res.id
        });
        this.setData({
          classic: res,
          latest: classicUtils.isLatest('latest-classic-index', res.index),
          first: classicUtils.isFirst(res.index)
        });
      }
    });
  }
})