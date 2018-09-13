import ServiceBase from './serviceBase'
import request from './request'

class PushImg extends ServiceBase {
  post (data) {
    return request.post(`${this.url}`, data)
  }
}

export default new PushImg('/bc/v1/storage')
