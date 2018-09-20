import ServiceBase from './serviceBase'
import request from './request'

class UpdatePersonalActivity extends ServiceBase {
  putActivity (data) {
    return request.put(`/mc/v1/activities/${data.id}`, data.request)
  }
  deleteItems (data) {
    return request.delete(`/mc/v1/activities/${data}/items?trace=true`)
  }
  postItems (data) {
    return request.post(`/mc/v1/activities/${data.id}/items?batch=true`, data.itemsData)
  }
  postMetadata (data) {
    return request.post(`/mc/v1/activities/${data.id}/metadata`, data.metadataData)
  }
  deleteMetadata (data) {
    return request.delete(`/mc/v1/activities/${data.id}/metadata/${data.key}`)
  }
}

export default new UpdatePersonalActivity('/mc/v1/activities')
