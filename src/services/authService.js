import request from './request'
import ServiceBase from './serviceBase'
import ext from '../ext/ext'
import config from 'config'
import {
  wxLogin
} from '../utils'

class AuthService extends ServiceBase {
  async wxLogin () { // 通过微信小程序登录
    const userInfo = await wxLogin
    return request.post(`${this.url}login/wx-miniapp`, {
      jsCode: userInfo.code,
      appId: config.appId
    }).then((res) => {
      if (res.code === 0) {
        ext.setStorageSync('token', `${res.data.tokenType} ${res.data.accessToken}`)
        ext.setStorageSync('refreshToken', res.data.refreshToken)
      }
      return res
    })
  }
  refreshToken () { // 刷新认证令牌
    const refreshToken = ext.getStorageSync('refreshToken')
    return request.post(`${this.url}refresh-token`, {
      refreshToken
    }).then((res) => {
      if (res.code === 0) {
        ext.setStorageSync('token', `${res.data.tokenType} ${res.data.accessToken}`)
        ext.setStorageSync('refreshToken', res.data.refreshToken)
      }
      return res
    })
  }
}
export default new AuthService('/uc/v1/auth/')
