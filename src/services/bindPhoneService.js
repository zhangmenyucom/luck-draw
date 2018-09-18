import ServiceBase from './serviceBase'
import request from './request'

class BindPhoneService extends ServiceBase {
  post (data) {
    return request.post(this.url, data)
  }
}
export default new BindPhoneService('/uc/v1/account/wx/miniapp/bind-phone')
