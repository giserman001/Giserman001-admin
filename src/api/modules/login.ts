import type { Login } from '@/api/interface/index'
import http from '@/api'

/**
 * @name 登录模块
 */
// 用户登录
export function loginApi(params: Login.ReqLoginForm) {
  return http.post<any>(`/login`, params, { loading: false }) // 正常 post json 请求  ==>  application/json
  // return http.post<Login.ResLogin>(`/login`, params, { loading: false }); // 控制当前请求不显示 loading
  // return http.post<Login.ResLogin>(`/login`, {}, { params }); // post 请求携带 query 参数  ==>  ?username=admin&password=123456
  // return http.post<Login.ResLogin>(`/login`, qs.stringify(params)); // post 请求携带表单参数  ==>  application/x-www-form-urlencoded
  // return http.get<Login.ResLogin>(`/login?${qs.stringify(params, { arrayFormat: "repeat" })}`); // get 请求可以携带数组等复杂参数
}
export function loginApi1(params: Login.ReqLoginForm) {
  return http.post<Login.ResLogin>(`/login`, params, { loading: false }) // 正常 post json 请求  ==>  application/json
  // return http.post<Login.ResLogin>(`/login`, params, { loading: false }); // 控制当前请求不显示 loading
  // return http.post<Login.ResLogin>(`/login`, {}, { params }); // post 请求携带 query 参数  ==>  ?username=admin&password=123456
  // return http.post<Login.ResLogin>(`/login`, qs.stringify(params)); // post 请求携带表单参数  ==>  application/x-www-form-urlencoded
  // return http.get<Login.ResLogin>(`/login?${qs.stringify(params, { arrayFormat: "repeat" })}`); // get 请求可以携带数组等复杂参数
}

// 获取菜单列表
export function getAuthMenuListApi() {
  return http.get<Menu.MenuOptions[]>(`/menu/list`, {}, { loading: false })
  // 如果想让菜单变为本地数据，注释上一行代码，并引入本地 authMenuList.json 数据
  // return authMenuList;
}

// 获取按钮权限
export function getAuthButtonListApi() {
  return http.get<Login.ResAuthButtons>(`/auth/buttons`, {}, { loading: false })
  // 如果想让按钮权限变为本地数据，注释上一行代码，并引入本地 authButtonList.json 数据
  // return authButtonList;
}

// 用户退出登录
export function logoutApi() {
  return http.post(`/logout`)
}
