import ServiceBase from './serviceBase'
import request from './request'
class UserService extends ServiceBase {
  put (data) {
    return request.put(this.url, data)
  }
}
export default new UserService('/uc/v1/me/users')
