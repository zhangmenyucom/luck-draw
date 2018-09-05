import ServiceBase from './serviceBase'
import request from './request'

class CreatePersonalActivity extends ServiceBase {
  createActivity (data) {
    return request.post(`${this.url}`, data)
  }
  getAcitivity (data) {
    return request.get(`${this.url}`, data)
  }
}

export default new CreatePersonalActivity('/mc/v1/me/activities')
