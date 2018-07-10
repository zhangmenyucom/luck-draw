
import {isWx} from '../decorator'
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
  static install (Vue, options) {
    Vue.prototype.$getStorageSync = this.getStorageSync.bind(this)
    Vue.prototype.$setStorageSync = this.setStorageSync.bind(this)
    Vue.prototype.$stopPullDownRefresh = this.stopPullDownRefresh.bind(this)
  }
}
