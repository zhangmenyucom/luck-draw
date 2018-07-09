export default new Promise((resolve, reject) => {
  wx.login({
    success (res) {
      resolve(res)
    },
    fail (err) {
      console.log('err', err)
    }
  })
})
