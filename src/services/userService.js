import ServiceBase from './serviceBase'
import request from './request'
// import MeScoresService from './meScoresService.js'

class UserService extends ServiceBase {
  put (data) {
    // return request.put(this.url, data).then(res => {
    //   if (res.code === 0) {
    //     return MeScoresService.getList()
    //   } else {
    //     return res
    //   }
    // })
    return request.put(this.url, data)
  }
}
export default new UserService('/uc/v1/account')
