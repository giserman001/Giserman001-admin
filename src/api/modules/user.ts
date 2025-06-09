import type { Dept, ResPage, Role, User } from '@/api/interface/index'
import http from '@/api'

// 获取用户列表

export function getUserList(params: User.ReqUserParams) {
  return http.post<ResPage<User.ResUserList>>(`/user/list`, params)
}

// 获取用户角色列表
export function getUserRoleList(params: Role.ReqRoleParams) {
  return http.post<User.ResUserList[]>(`/role/list`, params)
}

// 获取部门列表
export function getDeptList() {
  return http.post<Dept.ResDeptList[]>(`/dept/list`)
}
