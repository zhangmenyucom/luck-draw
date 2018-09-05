import ServiceBase from './serviceBase'
import request from './request'

class CreatePersonalActivity extends ServiceBase {
  createActivity (data) {
    return request.get(`${this.url}/${data.id}`, data)
  }
}

export default new CreatePersonalActivity('/mc/v1/me/activities')
