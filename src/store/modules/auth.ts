import type { AuthState } from '@/store/interface'
import { defineStore } from 'pinia'
import { getAuthButtonListApi, getAuthMenuListApi } from '@/api/modules/login'
import { getAllBreadcrumbList, getFlatMenuList, getShowMenuList } from '@/utils'

const storeId = 'auth'

export const useAuthStore = defineStore(storeId, () => {
  const state = reactive<AuthState>({
    // 按钮权限列表
    authButtonList: {},
    // 菜单权限列表
    authMenuList: [],
    // 当前页面的 router name，用来做按钮权限筛选
    routeName: '',
  })

  // 按钮权限列表
  const authButtonListGet = computed(() => state.authButtonList)

  // 菜单权限列表 ==> 这里的菜单没有经过任何处理
  const authMenuListGet = computed(() => state.authMenuList)

  // 菜单权限列表 ==> 左侧菜单栏渲染，需要剔除 isHide == true
  const showMenuListGet = computed(() => getShowMenuList(state.authMenuList))

  // 菜单权限列表 ==> 扁平化之后的一维数组菜单，主要用来添加动态路由
  const flatMenuListGet = computed(() => getFlatMenuList(state.authMenuList))

  // 递归处理后的所有面包屑导航列表
  const breadcrumbListGet = computed(() => getAllBreadcrumbList(state.authMenuList))

  // Get AuthButtonList
  async function getAuthButtonList() {
    const { data } = await getAuthButtonListApi()
    state.authButtonList = data
  }

  // Get AuthMenuList
  async function getAuthMenuList() {
    const { data } = await getAuthMenuListApi()
    state.authMenuList = data
  }

  // Set RouteName
  async function setRouteName(name: string) {
    state.routeName = name
  }

  return {
    state,
    authButtonListGet,
    authMenuListGet,
    showMenuListGet,
    flatMenuListGet,
    breadcrumbListGet,
    getAuthButtonList,
    getAuthMenuList,
    setRouteName,
  }
})
