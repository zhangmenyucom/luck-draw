import ServiceBase from './serviceBase'
import request from './request'
import { getUserInfo } from '@/utils'

class FootprintsActivities extends ServiceBase {
  add (data) {
    const userInfo = getUserInfo()
    if (!data.target) {
      data.target = {
        type: 'VINCI_CC_FOOTPRINT',
        id: userInfo.id,
        name: userInfo.nickName
      }
    }
    return request.post(`${this.url}`, data)
  }
}

export default new FootprintsActivities('/cc/v1/me/footprints')
