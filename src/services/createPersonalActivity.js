import ServiceBase from './serviceBase'
import request from './request'

class CreatePersonalActivity extends ServiceBase {
  createActivity (data) {
    return request.post(`${this.url}`, data)
  }
  getAcitivity (data) {
    return request.get(`${this.url}?type=${data}`)
  }
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
}

export default new CreatePersonalActivity('/mc/v1/me/activities')
