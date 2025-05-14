import type { RouteRecordRaw } from 'vue-router'
import { HOME_URL, LOGIN_URL } from '@/config'

/**
 * staticRouter (静态路由)
 */
export const staticRouter: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: HOME_URL,
  },
  {
    path: LOGIN_URL,
    name: 'login',
    component: () => import('@/views/user/Login.vue'),
    meta: {
      title: '登录',
    },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/user/Register.vue'),
    meta: {
      title: '注册',
    },
  },
  {
    path: '/recover',
    name: 'recover',
    component: undefined,
  },
  {
    path: '/layout',
    name: 'layout',
    component: () => import('@/layouts/index.vue'),
    // component: () => import("@/layouts/indexAsync.vue"),
    redirect: HOME_URL,
    children: [],
  },
]

/**
 * errorRouter (错误页面路由)
 */
export const errorRouter: RouteRecordRaw[] = [
  {
    path: '/exception/403',
    name: '403',
    component: () => import('@/views/exception/403.vue'),
    meta: {
      title: '403页面',
    },
  },
  {
    path: '/exception/404',
    name: '404',
    component: () => import('@/views/exception/404.vue'),
    meta: {
      title: '404页面',
    },
  },
  {
    path: '/exception/500',
    name: '500',
    component: () => import('@/views/exception/500.vue'),
    meta: {
      title: '500页面',
    },
  },
  // Resolve refresh page, route warnings
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/exception/404.vue'),
  },
]
