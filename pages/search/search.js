// pages/search/search.js
import { getHistoryKeyword, setHistoryKeyword, getHotKeyword, searchBooks } from '../../api/search.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    noHistoryKeyword: false,
    historyKeywords: Array,
    noHotKeyword: false,
    hotKeywords: Array,
    searchParams: {
      start: 0,
      count: 20,
      summary: 1,
      q: ''
    },
    books: [],
    loadSearchOptions: true,
    loading: false,
    hasMore: true,
    showLoading: false,
    noResult: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    Promise.all([getHistoryKeyword(), getHotKeyword()]).then(res =>{
      wx.hideLoading();
      this._getHistoryAndHotKeyword(res);
    }).catch(error => {
      this.setData({
        noHistoryKeyword: true,
        noHotKeyword: true
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

  handleInput(event) {
    if(event.detail.value === '') {
      this.handleClearInput();
    } else {
      this.setData({
        searchParams: {
          q: event.detail.value,
          ending: false
        },
      });
    }
  },
  handleSearch(event) {
    if(event.detail.value !== '') {
      this._load();
    } else {
      return false;
    }
  },
  handleClearInput() {
    this.setData({
      'searchParams.q': '',
      books: [],
      loadSearchOptions: true,
      ending: false
    });
  },
  handleCancel() {
    wx.navigateBack();
  },
  handleTagTap(event) {
    this.setData({
      'searchParams.q': event.detail.text
    });
    this._load();
  },
  _getHistoryAndHotKeyword(params) {
    const historyKeywords = params[0];
    const hotKeywords = params[1].hot;
    this.setData({
      historyKeywords: historyKeywords,
      noHistoryKeyword: historyKeywords.length === 0,
      hotKeywords: hotKeywords,
      noHotKeyword: hotKeywords.length === 0
    });
  },
  handleHistoryKeywordsUpdate() {
    this.setData({
      historyKeywords: getHistoryKeyword(),
      noHistoryKeyword: getHistoryKeyword().length === 0
    });
  },
  _load() {
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    // 初始化数据
    this.setData({
      'searchParams.start': 0,
      hasMore: true,
      loading: true,
      noResult: false
    });
    searchBooks(this.data.searchParams).then(res => {
      wx.hideLoading();
      this.setData({
        loading: false,
        books: res.books,
        loadSearchOptions: false,
        hasMore: res.books.length < res.total,
        noResult: res.total === 0
      });
      setHistoryKeyword(this.data.searchParams.q);
      this.handleHistoryKeywordsUpdate();
    }).catch(error => {
      this.setData({
        loading: false,
        loadSearchOptions: true
      });
    });
  },
  handleLoadMore(e) {
    // loading锁
    if(this.data.loading || !this.data.searchParams.q) {
      return false;
    } else {
      // 判断是否还有更多的数据
      if(this.data.hasMore) {
        const length = this.data.books.length;
        this.setData({
          loading: true,
          showLoading: true,
          'searchParams.start': length
        });
        searchBooks(this.data.searchParams).then(res => {
          const books = this.data.books.concat(res.books);
          this.setData({
            books,
            loading: false,
            showLoading: false,
            hasMore: books.length < res.total
          });
        }).catch(error => {
          this.setData({
            loading: false
          });
        });
      }
    }
  }
})