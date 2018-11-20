import wxLogin from './wxLogin'
import ext from '../ext/ext'
import { check, formatDate } from './formatDate'

function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

const operatingEnvironment = () => window ? 'window' : 'miniApp'
const getUserInfo = () => ext.getStorageSync('userInfo') || {}

export {
  wxLogin,
  operatingEnvironment,
  formatTime,
  getUserInfo,
  formatDate,
  check
}

export default {
  formatNumber,
  formatTime,
  operatingEnvironment,
  wxLogin,
  getUserInfo,
  formatDate,
  check
}
