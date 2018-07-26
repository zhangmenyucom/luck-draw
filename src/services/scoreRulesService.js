import ServiceBase from './serviceBase'
import request from './request'
class ScoreRulesService extends ServiceBase {
  get () {
    return request.get(this.url)
  }
}
export default new ScoreRulesService('/mc/v1/score-rules')
