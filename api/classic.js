import $http from '../utils/http.js';

export function getLatest(params) {
  return $http({
    url: 'classic/latest',
    data: params
  }).then(res => {
    wx.setStorageSync('classic-list-' + res.index, res);
    return Promise.resolve(res);
  }).catch(error => {
    return Promise.reject(error);
  });
};

export function updateClassic(params, nextOrPrevious) {
  const prefix = 'classic-list-';
  const key = nextOrPrevious === 'next' ? prefix + (params.index + 1) : prefix + (params.index - 1) ;
  const classic = wx.getStorageSync(key);

  if (classic) {
    return Promise.resolve(classic);
  } else {
    return $http({
      url: `classic/${params.index}/${nextOrPrevious}`,
      data: params.data
    }).then(res => {
      wx.setStorageSync(key, res);
      res.noCache = true;
      return Promise.resolve(res);
    }).catch(error => {
      return Promise.reject(error);
    });
  }
};

export function getMyFavor() {
  return $http({
    url: 'classic/favor'
  });
};

export function getClassicById(params){
  return $http({
    url: `classic/${params.type}/${params.cid}`
  });
}