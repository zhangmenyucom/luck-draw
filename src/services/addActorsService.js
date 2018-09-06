import ServiceBase from './serviceBase'
import request from './request'

class AddActors extends ServiceBase {
  addActor (data) {
    return request.post(`${this.url}/${data.activityId}/actors`, data.userInfo)
  }
}

export default new AddActors('/mc/v1/activities')
