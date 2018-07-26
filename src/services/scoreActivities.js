import ServiceBase from './serviceBase'
import MeScoresService from './meScoresService.js'
import request from './request'

class ScoreActivities extends ServiceBase {
  share (data) {
    return request.post(`${this.url}/share`, data).then((res) => {
      return MeScoresService.getList()
    })
  }
  signIn (data) {
    return request.post(`${this.url}/sign-in`, data).then((res) => {
      return MeScoresService.getList()
    })
  }
}
export default new ScoreActivities('/mc/v1/score-activities')
