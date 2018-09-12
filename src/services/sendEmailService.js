import ServiceBase from './serviceBase'
import request from './request'

class SendEmail extends ServiceBase {
  sendEmail (data) {
    return request.post(`${this.url}`, data)
  }
}

export default new SendEmail('/bc/v1/normal-email')
