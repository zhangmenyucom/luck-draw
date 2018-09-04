import ServiceBase from './serviceBase'
import request from './request'
// import MeScoresService from './meScoresService.js'

class PictureService extends ServiceBase {
  getPicture (data) {
    return request.post(`${this.url}`, data)
  }
}
export default new PictureService('/bc/v1/tools/picture')
