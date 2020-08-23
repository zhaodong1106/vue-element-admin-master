import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/zhiban/getList',
    method: 'post',
    data
  })
}

export function editDataApi(data) {
  return request({
    url: '/zhiban/editData',
    method: 'post',
    data
  })
}

export function addRole(data) {
  return request({
    url: '/vue-element-admin/role',
    method: 'post',
    data
  })
}

export function updateRole(id, data) {
  return request({
    url: `/vue-element-admin/role/${id}`,
    method: 'put',
    data
  })
}

export function deleteRole(id) {
  return request({
    url: `/vue-element-admin/role/${id}`,
    method: 'delete'
  })
}
