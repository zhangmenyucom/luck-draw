// const consfig = requestConfig
import config from 'config'
import ext from '../ext/ext'
// import enumeMap from '@/common/js/enumeMap'

// import authService from './authService'
var Fly = require(`flyio/dist/npm/wx`)
var fly = new Fly()
// 配置请求基地址
fly.config.baseURL = config.baseURL
// 添加拦截器
fly.interceptors.request.use((request) => {
  // if (!config.noLoading.has(request.url)) ext.showLoading()
  // 给所有请求添加自定义header
  request.headers = {
    accept: `application/json,text/plain,text/html`,
    authorization: ext.getStorageSync(`token`)
  }
  if (config.noVerification.has(request.url)) {
    delete request.headers.authorization
  }
  return request
})

fly.interceptors.response.use(
  (response) => {
    // ext.hideLoading()
    // 只将请求结果的data字段返回
    if (response.data.code === 0) {
      return response.data
    } else {
      ext.showToast(response.data.message)
      return response.data
    }
  },
  (err) => {
    // ext.hideLoading()
    // 发生网络错误后会走到这里
    if (err.status === 401) {
      if (err.request.url !== `/uc/v1/auth/refresh-token`) {
        return refreshToken().then((res) => {
          if (res.code === 0) {
            console.log('res', res)
            return fly.request(err.request.url, err.request.body, err.request)
          }
        })
      } else {
        ext.clearStorageSync()
        ext.switchTab('/pages/index/index')
      }
    } else {
      ext.showToast('当前服务不可用，请稍后再试！')
    }
  }
)

function refreshToken () {
  const refreshToken = ext.getStorageSync('refreshToken')
  return fly.post(`/uc/v1/auth/refresh-token`, {
    refreshToken
  }).then((res) => {
    if (res.code === 0) {
      ext.setStorageSync('token', `${res.data.tokenType} ${res.data.accessToken}`)
      ext.setStorageSync('refreshToken', res.data.refreshToken)
    }
    return res
  })
}
export default fly
