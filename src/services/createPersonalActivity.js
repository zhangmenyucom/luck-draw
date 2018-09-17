import ServiceBase from './serviceBase'
import request from './request'

class CreatePersonalActivity extends ServiceBase {
  createActivity (data) {
    return request.post(`${this.url}`, data)
  }
  getAcitivity (data) {
    return request.get(`${this.url}?type=${data}`)
  }
  putActivity (data) {
    return request.put(`/mc/v1/activities/${data.id}`, data.request)
  }
}
export default new CreatePersonalActivity('/mc/v1/me/activities')
