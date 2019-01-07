import $http from '../utils/http.js';

export function getHistoryKeyword() {
  return wx.getStorageSync('searchHistory') || [];
};

export function setHistoryKeyword(value) {
  let historyKeywords = getHistoryKeyword();
  historyKeywords.unshift(value);
  historyKeywords = [...new Set(historyKeywords)];
  if (historyKeywords.length > 30) { historyKeywords.pop(); }
  return wx.setStorageSync('searchHistory', historyKeywords);
};

export function getHotKeyword() {
  return $http({
    url: '/book/hot_keyword'
  });
};

export function searchBooks(params) {
  return $http({
    url: '/book/search',
    data: params
  });
};