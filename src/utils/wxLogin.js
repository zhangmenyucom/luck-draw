export default () => new Promise((resolve, reject) => {
  wx.login({
    success (res) {
      console.log('res', res)
      resolve(res)
    },
    fail (err) {
      console.log('err', err)
    }
  })
})
