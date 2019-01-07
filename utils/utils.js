export default {
  
  setStorageSync(key, val) {
    wx.setStorageSync(key, val);
  },

  getStorageSync(key) {
    return wx.getStorageSync(key);
  },

  isFirst(index) {
    return index === 1;
  },

  isLatest(key, index) {
    return index === this.getStorageSync(key);
  }
};