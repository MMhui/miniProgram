import $http from '../utils/http.js';

export function getHotList(params) {
  return $http({
    url: 'book/hot_list',
    data: params
  });
};

export function getDetail(params) {
  return $http({
    url: 'book/' + params.bookId + '/detail'
  });
};

export function getLikeStatus(params) {
  return $http({
    url: 'book/' + params.bookId + '/favor'
  });
};

export function getMyBookCount(params) {
  return $http({
    url: 'book/favor/count'
  });
};

export function addBookComment(params) {
  return $http({
    url: 'book/add/short_comment',
    method: 'post',
    data: params
  });
};

