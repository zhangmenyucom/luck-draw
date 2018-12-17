import ServiceBase from './serviceBase'
import request from './request'
// import { getUserInfo } from '@/utils'
class Footprints extends ServiceBase {
  add (appid, title) {
    let data = {}
    data.target = {
      type: 'VINCI_CC_FOOTPRINT',
      id: appid,
      name: title
    }
    data.type = 'VIEW_AD'
    return request.post(`${this.url}`, data)
  }
}

export default new Footprints('/cc/v1/me/footprints')
