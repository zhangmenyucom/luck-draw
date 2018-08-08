import ServiceBase from './serviceBase'
import request from './request'
class AccountService extends ServiceBase {
  captcha (data) {
    return request.post(`${this.url}/captcha`, data)
  }
  changePhone (data) {
    return request.put(`${this.url}/account/change-contact-number`, data)
  }
}
export default new AccountService('/uc/v1')
