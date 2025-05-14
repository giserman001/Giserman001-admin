import type { RouteRecordRaw } from 'vue-router'
import { notification } from 'ant-design-vue'
import { LOGIN_URL } from '@/config'
import router from '@/router/index'
import { useAuthStore } from '@/store/modules/auth'
import { useUserStore } from '@/store/modules/user'

// 引入 views 文件夹下所有 vue 文件
const modules = import.meta.glob('@/views/**/*.vue')

/**
 * @description 初始化动态路由
 */
export async function initDynamicRouter() {
  const userStore = useUserStore()
  const authStore = useAuthStore()

  try {
    // 1.获取菜单列表 && 按钮权限列表
    await authStore.getAuthMenuList()
    await authStore.getAuthButtonList()

    // 2.判断当前用户有没有菜单权限
    if (!authStore.authMenuListGet.length) {
      notification.open({
        message: '无权限访问',
        description: '当前账号无任何菜单权限，请联系系统管理员！',
      })
      userStore.setToken('')
      router.replace(LOGIN_URL)
      return Promise.reject(new Error('No permission'))
    }

    // 3.添加动态路由
    authStore.flatMenuListGet.forEach((item) => {
      item.children && delete item.children
      if (item.component && typeof item.component == 'string') {
        item.component = modules[`/src/views${item.component}.vue`]
      }
      if (item.meta.isFull) {
        router.addRoute(item as unknown as RouteRecordRaw)
      }
      else {
        router.addRoute('layout', item as unknown as RouteRecordRaw)
      }
    })
  }
  catch (error) {
    // 当按钮 || 菜单请求出错时，重定向到登陆页
    userStore.setToken('')
    router.replace(LOGIN_URL)
    return Promise.reject(error)
  }
}
