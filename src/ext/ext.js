 // 尽量只扩展微信相关接口
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
  static clearStorageSync () {
    if (this.isWx) {
      wx.clearStorageSync()
    }
  }

  static showToast (title) {
    if (this.isWx) {
      wx.showToast({
        title,
        icon: 'none',
        duration: 2000
      })
    }
  }

  static switchTab (url) {
    if (this.isWx) {
      wx.switchTab({
        url
      })
    }
  }

  static chooseLocation () {
    if (this.isWx) {
      return new Promise((resolve, reject) => {
        wx.chooseLocation({
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

  static removeStorage (key) {
    if (this.isWx) {
      return wx.removeStorage({key})
    }
  }

  static downloadFile (url) {
    if (this.isWx) {
      return new Promise((resolve, reject) => {
        wx.downloadFile({
          url,
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

  static saveImageToPhotosAlbum (filePath) {
    if (this.isWx) {
      return new Promise((resolve, reject) => {
        wx.saveImageToPhotosAlbum({
          filePath,
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

  static navigateBack (delta = 1) {
    if (this.isWx) {
      wx.navigateBack({delta})
    }
  }

  static navigateTo (url) {
    if (this.isWx) {
      wx.navigateTo({url})
    }
  }

  static showLoading () {
    if (this.isWx) {
      wx.showLoading({
        mask: true
      })
    }
  }

  static hideLoading () {
    if (this.isWx) {
      wx.hideLoading()
    }
  }

  static createWorker (path) {
    if (this.isWx) {
      return wx.createWorker(path)
    }
  }

  static getSystemInfoSync () {
    if (this.isWx) {
      return wx.getSystemInfoSync()
    }
  }

  static setClipboardData (data) {
    if (this.isWx) {
      return wx.setClipboardData(data)
    }
  }
  static chooseImage () {
    if (this.isWx) {
      return new Promise((resolve, reject) => {
        wx.chooseImage({
          count: 1,
          sizeType: ['origin'],
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
  static getImageInfo (src) {
    if (this.isWx) {
      return new Promise((resolve, reject) => {
        wx.getImageInfo({
          src,
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
  static createCanvasContext (id) {
    if (this.isWx) {
      return wx.createCanvasContext(id)
    }
  }
  static canvasToTempFilePath (x, y, width, height, destWidth, destHeight, quality, canvasId) {
    if (this.isWx) {
      return new Promise((resolve, reject) => {
        wx.canvasToTempFilePath({
          x,
          y,
          width,
          height,
          destWidth,
          destHeight,
          quality,
          canvasId,
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
  static createSelectorQuery () {
    if (this.isWx) {
      return wx.createSelectorQuery()
    }
  }
  static showModal () {
    if (this.isWx) {
      return wx.showModal({
        title: '警告',
        content: '时间不能早于当前！请重新选择',
        showCancel: false,
        confirmColor: '#FF3333'
      })
    }
  }
  static getWindowH () {
    if (this.isWx) {
      return wx.getSystemInfoSync().windowHeight
    }
  }

  static install (Vue, options) {
    Vue.prototype.$getStorageSync = this.getStorageSync.bind(this)
    Vue.prototype.$setStorageSync = this.setStorageSync.bind(this)
    Vue.prototype.$stopPullDownRefresh = this.stopPullDownRefresh.bind(this)
    Vue.prototype.$chooseAddress = this.chooseAddress.bind(this)
    Vue.prototype.$showToast = this.showToast.bind(this)
    Vue.prototype.$clearStorageSync = this.clearStorageSync.bind(this)
    Vue.prototype.$switchTab = this.switchTab.bind(this)
    Vue.prototype.$chooseLocation = this.chooseLocation.bind(this)
    Vue.prototype.$navigateBack = this.navigateBack.bind(this)
    Vue.prototype.$navigateTo = this.navigateTo.bind(this)
    Vue.prototype.$showLoading = this.showLoading.bind(this)
    Vue.prototype.$hideLoading = this.hideLoading.bind(this)
    Vue.prototype.$createWorker = this.createWorker.bind(this)
    Vue.prototype.$downloadFile = this.downloadFile.bind(this)
    Vue.prototype.$saveImageToPhotosAlbum = this.saveImageToPhotosAlbum.bind(this)
    Vue.prototype.$removeStorage = this.removeStorage.bind(this)
    Vue.prototype.$getSystemInfoSync = this.getSystemInfoSync.bind(this)
    Vue.prototype.$setClipboardData = this.setClipboardData.bind(this)
    Vue.prototype.$chooseImage = this.chooseImage.bind(this)
    Vue.prototype.$getImageInfo = this.getImageInfo.bind(this)
    Vue.prototype.$createCanvasContext = this.createCanvasContext.bind(this)
    Vue.prototype.$canvasToTempFilePath = this.canvasToTempFilePath.bind(this)
    Vue.prototype.$createSelectorQuery = this.createSelectorQuery.bind(this)
    Vue.prototype.$showModal = this.showModal.bind(this)
    Vue.prototype.$getWindowH = this.getWindowH.bind(this)
  }
}
