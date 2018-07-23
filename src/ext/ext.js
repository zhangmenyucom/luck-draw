import {
  isWx
} from '../decorator'
@isWx // eslint-disable-line
export default class ext {
  static getStorageSync (key) {
    if (this.isWx) {
      return wx.getStorageSync(key)
    }
  }
  static setStorageSync (key, value) {
    if (this.isWx) {
      return wx.setStorageSync(key, value)
    }
  }
  static stopPullDownRefresh () {
    if (this.isWx) {
      wx.stopPullDownRefresh()
    }
  }
  static chooseAddress () {
    if (this.isWx) {
      return new Promise((resolve, reject) => {
        wx.chooseAddress({
          success (res) {
            resolve(res)
          },
          fail (err) {
            reject(err)
          }
        })
      })
    }
  }
  static showToast (title) {
    if (this.isWx) {
      wx.showToast({
        title,
        duration: 2000
      })
    }
  }
  static install (Vue, options) {
    Vue.prototype.$getStorageSync = this.getStorageSync.bind(this)
    Vue.prototype.$setStorageSync = this.setStorageSync.bind(this)
    Vue.prototype.$stopPullDownRefresh = this.stopPullDownRefresh.bind(this)
    Vue.prototype.$chooseAddress = this.chooseAddress.bind(this)
    Vue.prototype.$showToast = this.showToast.bind(this)
  }
}
