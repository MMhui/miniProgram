import $http from '../utils/http.js';

export function getComments(params) {
  return $http({
    url: 'book/' + params.bookId + '/short_comment'
  });
};

export function postComment(params) {
  return $http({
    url: 'book/add/short_comment',
    data: params,
    method: 'post'
  });
};