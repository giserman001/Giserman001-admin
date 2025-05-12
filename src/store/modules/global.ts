import { defineStore } from 'pinia'
import { GlobalState } from '@/store/interface'
import piniaPersistConfig from '@/store/helper/persist'

const storeId = 'global'

export const useGlobalStore = defineStore(storeId, () => {
  // 修改默认值之后，需清除 localStorage 数据
  const state = reactive<GlobalState>({
    // 布局模式 (纵向：vertical | 经典：classic | 横向：transverse | 分栏：columns)
    layout: 'transverse',
    // element 组件大小
    assemblySize: 'default',
    // 当前系统语言
    language: null,
    // 当前页面是否全屏
    maximize: false,
    // 主题颜色
    primary: '#1677ff',
    // 深色模式
    isDark: false,
    // 灰色模式
    isGrey: false,
    // 色弱模式
    isWeak: false,
    // 侧边栏反转
    asideInverted: false,
    // 头部反转
    headerInverted: false,
    // 折叠菜单
    isCollapse: false,
    // 菜单手风琴
    accordion: true,
    // 页面水印
    watermark: false,
    // 面包屑导航
    breadcrumb: true,
    // 面包屑导航图标
    breadcrumbIcon: true,
    // 标签页
    tabs: true,
    // 标签页图标
    tabsIcon: true,
    // 页脚
    footer: true,
    // 是否锁屏
    lockScreen: false
  })

  function setGlobalState(...args: ObjToKeyValArray<GlobalState>) {
    this.$patch((state) => {
      state.state[args[0]] = args[1]
    })
  }

  function lockScreen(flag: boolean) {
    state.lockScreen = flag
    nextTick(() => {
      document.getElementById('app')!.style.overflow = flag ? 'hidden' : 'visible'
    })
  }

  return {
    state,
    setGlobalState,
    lockScreen
  }
}, {
  persist: piniaPersistConfig(storeId)
})
