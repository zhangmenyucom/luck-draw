import ServiceBase from './serviceBase'
import request from './request'

class ParticipantsService extends ServiceBase {
  addMetadata (data) {
    return request.post(`${this.url}/${data.id}/metadata`, data)
  }
}

export default new ParticipantsService('/mc/v1/participants')
