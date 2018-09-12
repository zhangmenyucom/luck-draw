import ServiceBase from './serviceBase'
import request from './request'
var qs = require('qs')

class ParticipantsService extends ServiceBase {
  get (data) {
    return request.get(`${this.url}?${qs.stringify(data, true)}`)
  }
  addMetadata (data) {
    return request.post(`${this.url}/${data.id}/metadata`, data)
  }
}

export default new ParticipantsService('/mc/v1/participants')
