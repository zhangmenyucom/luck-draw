import request from './request'
var qs = require('qs')

export default class ServiceBase {
  constructor (url) {
    this.url = url
  }
  getList (data) {
    return request.get(`${this.url}?${qs.stringify(data, true)}`)
  }
  get (data) {
    return request.get(`${this.url}/${data.id}?${qs.stringify(data, true)}`)
  }
  add (data) {
    return request.post(`${this.url}`, data)
  }
  up (data) {
    return request.put(`${this.url}/${data.id}`, data)
  }
  delete (data) {
    return request.delete(`${this.url}/${data.id}`, data)
  }
}
