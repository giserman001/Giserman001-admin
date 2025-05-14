import type { ResPage, User } from '@/api/interface/index'
import http from '@/api'

/**
 * @name 用户管理模块
 */
// 获取用户列表
export function getUserList(params: User.ReqUserParams) {
  return http.post<ResPage<User.ResUserList>>(`/user/list`, params)
}

// 获取树形用户列表
export function getUserTreeList(params: User.ReqUserParams) {
  return http.post<ResPage<User.ResUserList>>(`/user/tree/list`, params)
}

// 新增用户
export function addUser(params: { id: string }) {
  return http.post(`/user/add`, params)
}

// 批量添加用户
export function BatchAddUser(params: FormData) {
  return http.post(`/user/import`, params)
}

// 编辑用户
export function editUser(params: { id: string }) {
  return http.post(`/user/edit`, params)
}

// 删除用户
export function deleteUser(params: { id: string[] }) {
  return http.post(`/user/delete`, params)
}

// 切换用户状态
export function changeUserStatus(params: { id: string, status: number }) {
  return http.post(`/user/change`, params)
}

// 重置用户密码
export function resetUserPassWord(params: { id: string }) {
  return http.post(`/user/rest_password`, params)
}

// 导出用户数据
export function exportUserInfo(params: User.ReqUserParams) {
  return http.download(`/user/export`, params)
}

// 获取用户状态字典
export function getUserStatus() {
  return http.get<User.ResStatus[]>(`/user/status`)
}

// 获取用户性别字典
export function getUserGender() {
  return http.get<User.ResGender[]>(`/user/gender`)
}

// 获取用户部门列表
export function getUserDepartment() {
  return http.get<User.ResDepartment[]>(`/user/department`, {}, { cancel: false })
}

// 获取用户角色字典
export function getUserRole() {
  return http.get<User.ResRole[]>(`/user/role`)
}
