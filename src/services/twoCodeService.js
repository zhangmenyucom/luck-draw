import ServiceBase from './serviceBase'
import request from './request'
import config from 'config'

class TwoCodeService extends ServiceBase {
  get (id) {
    return request.post(`${this.url}/${config.appId}/qr-codes/limit`, {
      path: 'pages/activitiesDetails/index?id=' + id + '&method=share'
    })
  }
}
export default new TwoCodeService('/xc/v1/miniapps')
