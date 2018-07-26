import ServiceBase from './serviceBase'
import request from './request'
class AccountService extends ServiceBase {
  captcha (data) {
    return request.post(`${this.url}/captcha`, data)
  }
}
export default new AccountService('/uc/v1')
