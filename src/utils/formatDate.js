// 检查是不是两位数字，不足补全
const check = (str) => {
  str = str.toString()
  if (str.length < 2) {
    str = '0' + str
  }
  return str
}

const formatDate = (date, str) => {
  var mat = {}
  mat.M = date.getMonth() + 1// 月份记得加1
  mat.H = date.getHours()
  mat.s = date.getSeconds()
  mat.m = date.getMinutes()
  mat.Y = date.getFullYear()
  mat.D = date.getDate()
  mat.d = date.getDay()// 星期几
  mat.d = check(mat.d)
  mat.H = check(mat.H)
  mat.M = check(mat.M)
  mat.D = check(mat.D)
  mat.s = check(mat.s)
  mat.m = check(mat.m)
  console.log(typeof mat.D)
  if (str.indexOf(':') > -1) {
    mat.Y = mat.Y.toString().substr(2, 2)
    return mat.Y + '/' + mat.M + '/' + mat.D + ' ' + mat.H + ':' + mat.m
  }
  if (str.indexOf('/') > -1) {
    return mat.Y + '/' + mat.M + '/' + mat.D + ' ' + mat.H + '/' + mat.m + '/' + mat.s
  }
  if (str.indexOf('-') > -1) {
    return mat.Y + '-' + mat.M + '-' + mat.D + ' ' + mat.H + '-' + mat.m + '-' + mat.s
  }
}
export {
  check,
  formatDate
}
