// pages/my/my.js
import { getMyFavor } from '../../api/classic.js';
import { getMyBookCount } from '../../api/book.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUserInfo: false,
    myBooksCount: 0,
    classics: [],
    userInfo: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    Promise.all([getMyFavor(), getMyBookCount()]).then(res => {
      wx.hideLoading();
      this.setData({
        classics: res[0],
        myBooksCount: res[1].count
      });
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
    this.hasGottenUserInfo();
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

  hasGottenUserInfo() {
    wx.getSetting({
      success: (data) => {
        if (data.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: (data) => {
              this.setData({
                hasUserInfo: true,
                userInfo: data.userInfo
              })
            }
          })
        } else {
          this.setData({
            hasUserInfo: false
          })
        }
      }
    })
  },

  handleGetUserInfo(event) {
    let userInfo = event.detail.rawData;
    if (userInfo) {
      this.setData({
        hasUserInfo: true,
        userInfo: userInfo
      })
    }
  },

  onJumpToAbout() {
    wx.navigateTo({
      url: '/pages/about/about',
    });
  },

  onPreviewTap(event) {
    wx.navigateTo({
      url: '/pages/classic-detail/classic-detail?cid=' + event.detail.cid + '&type=' + event.detail.type
    })
  },

  _getMyFavor() {
    getMyFavor().then(res => {
      this.setData({
        classics: res
      });
    });
  },
  _getMyBookCount(){
    getMyBookCount().then(res => {
      this.setData({
        myBooksCount: res.count
      });
    });
  },

  onStudy(event) {
    wx.navigateTo({
      url: '/pages/course/course',
    })
  }
})