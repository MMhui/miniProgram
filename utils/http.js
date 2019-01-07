import { config } from '../config.js';

const tips = {
  1: '抱歉，发生了一个错误',
  1000: '输入参数错误',
  1001: '输入的json格式不正确',
  1002: '找不到资源',
  1003: '未知错误',
  1004: '禁止访问',
  1005: '不正确的开发者key',
  1006: '服务器内部错误',
  2000: '你已经点过赞了',
  2001: '你还没点过赞',
  3000: '该期内容不存在',
  301: '永久重定向',
  400: '请求包含不支持的参数',
  401: '未授权',
  403: '被禁止访问',
  404: '请求的资源不存在',
  413: '上传的File体积太大',
  500: '内部错误'
};

export default function $http(params) {
    if(!params.url) {
      console.error('缺少url')
      return false;
    }
    params.url = config.baseUrl + params.url;

    const defaultParams = {
      url: config.baseUrl,
      data: {},
      header: {
        'content-type': 'application/json',
        'appkey': config.appkey
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text'
    };

    const requestParams = Object.assign({}, defaultParams, params);

    return new Promise((resolve, reject) => {
      wx.request({
        ...requestParams,
        success: function (res) {
          if (res.statusCode >= 200 && res.statusCode < 300 || res.statusCode === 304) {
            resolve(res.data);
          } else {
            if (tips[res.statusCode]) {
              wx.showToast({
                title: tips[res.statusCode],
                icon: 'none'
              });
            } else {
              if (tips[res.data.error_code]) {
                wx.showToast({
                  title: tips[res.data.error_code],
                  icon: 'none'
                });
              } else {
                wx.showToast({
                  title: tips[1],
                  icon: 'none'
                });
              }
            }
            reject(res);
          }
        },
        fail: function (res) {
          wx.showToast({
            title: tips[1],
            icon: 'none'
          });
          reject(res);
        }
      })
    })
}