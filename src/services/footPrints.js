import ServiceBase from './serviceBase'
import request from './request'
import { getUserInfo } from '@/utils'
class Footprints extends ServiceBase {
  add (appid) {
    let data = {}
    const userInfo = getUserInfo()
    if (!data.target) {
      data.target = {
        type: 'VINCI_CC_FOOTPRINT',
        id: appid,
        name: userInfo.nickName
      }
      data.type = 'VIEW_AD'
    }
    return request.post(`${this.url}`, data)
  }
}

export default new Footprints('/cc/v1/me/footprints')
