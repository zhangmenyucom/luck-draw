import ServiceBase from './serviceBase'
import request from './request'

class UpdatePersonalActivity extends ServiceBase {
  putActivity (data) {
    return request.put(`/mc/v1/activities/${data.id}`, data.request)
  }
  postItems (data) {
    return request.put(`/mc/v1/activities/${data.id}/items/${data.itemId}`, data.itemsData)
  }
  addItems (data) {
    return request.post(`/mc/v1/activities/${data.id}/items`, data.itemsData)
  }
  deleteItems (data) {
    return request.delete(`/mc/v1/activities/${data.id}/items/${data.itemId}`)
  }
  postMetadata (data) {
    return request.post(`/mc/v1/activities/${data.id}/metadata`, data.metadataData)
  }
  deleteMetadata (data) {
    return request.delete(`/mc/v1/activities/${data.id}/metadata/${data.key}`)
  }
}

export default new UpdatePersonalActivity('/mc/v1/activities')
