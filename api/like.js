import $http from '../utils/http.js';

export function getLikeInfo(params) {
  return $http({
    url: `classic/${params.type}/${params.id}/favor`
  });
};

export function like(params) {
  return $http({
    url: '/like',
    method: 'post',
    data: params
  });
};

export function cancelLike(params) {
  return $http({
    url: '/like/cancel',
    method: 'post',
    data: params
  });
};
