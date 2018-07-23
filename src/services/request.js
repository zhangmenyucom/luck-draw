// const consfig = requestConfig
import config from 'config'
import ext from '../ext/ext'

// import authService from './authService'
var Fly = require(`flyio/dist/npm/wx`)
var fly = new Fly()
// 配置请求基地址
fly.config.baseURL = config.baseURL
// 添加拦截器
fly.interceptors.request.use((request) => {
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
    // 只将请求结果的data字段返回
    if (response.data.code === 0) {
      return response.data
    } else {
      ext.showToast('当前服务不可用，请稍后在试！')
    }
  },
  (err) => {
    // 发生网络错误后会走到这里
    console.log('err', err)
    if (err.status === 401) {
      return refreshToken().then((res) => {
        if (res.code === 0) {
          console.log('res', res)
          return fly.request(err.request.url, err.request.body, err.request)
        }
      })
    } else {
      ext.showToast('当前服务不可用，请稍后在试！')
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
