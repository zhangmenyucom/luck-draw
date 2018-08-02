import ServiceBase from './serviceBase'
import request from './request'
var qs = require('qs')

class MeScoresService extends ServiceBase {
  getList (data) { // 获取我的积分 开始 页面大量 用getList 后因后端修改 需要重写 不规范 后续要改
    return request.get(`${this.url}/scores?${qs.stringify(data, true)}`)
  }
  getScoreChanges (data) {
    return request.get(`${this.url}/score-changes?${qs.stringify(data, true)}`)
  }
}

export default new MeScoresService('/mc/v1/me')
