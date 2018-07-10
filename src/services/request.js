// const consfig = requestConfig
import config from 'config'
import ext from '../ext/ext'
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
    return response.data
  },
  (err) => {
    // 发生网络错误后会走到这里
    console.log(err)
  }
)

export default fly
