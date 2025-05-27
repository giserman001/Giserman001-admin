<script lang="ts" setup name="LayoutClassic">
import type { MenuMode, MenuTheme } from 'ant-design-vue'
import type { CSSProperties } from 'vue'
import Footer from '@/layouts/components/Footer/index.vue'
import MenuFold from '@/layouts/components/header/components/MenuFold.vue'
import ToolBarRight from '@/layouts/components/header/ToolBarRight.vue'
import Main from '@/layouts/components/Main/index.vue'
import Menu from '@/layouts/components/Menu/index.vue'
import Tabs from '@/layouts/components/Tabs/index.vue'

const title = import.meta.env.VITE_GLOB_APP_TITLE

const mainRef = useTemplateRef<InstanceType<typeof Main>>('MainRef')

const router = useRouter()

const route = useRoute()

const globalStore = useGlobalStore()

const authStore = useAuthStore()

const collapsed = computed(() => globalStore.state.isCollapse)

const menuList = computed(() => authStore.showMenuListGet)

const asideInverted = computed(() => globalStore.state.asideInverted)

const headerInverted = computed(() => globalStore.state.headerInverted)

const slideTheme = computed<MenuTheme>(() => !asideInverted.value ? 'light' : 'dark')

const headTheme = computed<MenuTheme>(() => !headerInverted.value ? 'light' : 'dark')

const mode = computed<MenuMode>(() => 'inline')

const subMenuList = ref<Menu.MenuOptions[]>([])

function onRefresh(val: boolean) {
  mainRef.value?.refreshCurrentPage(val)
}

const headerStyle: CSSProperties = {
  paddingInline: 0,
  borderBottom: '1px solid #e4e7ed',
}

const contentStyle: CSSProperties = {
  'padding': '15px',
  'color': '#000',
  'overflow-x': 'hidden',
  'overflow-y': 'auto',
}

const siderStyle: CSSProperties = {
  borderRight: '1px solid #e4e7ed',
  overflow: 'auto',
}

const footerStyle: CSSProperties = {
  backgroundColor: 'transparent',
  padding: 0,
}
const selectedKeys = ref<string[]>([route.path])
function findTopPathByActivePath(tree: Menu.MenuOptions[], activePath: string) {
  function findNodePath(node: Menu.MenuOptions, pathStack: Menu.MenuOptions[]): Menu.MenuOptions[] | null {
    pathStack.push(node)
    if (node.path === activePath) {
      // 找到最顶层的节点
      return pathStack
    }
    if (node.children) {
      for (const child of node.children) {
        const result = findNodePath(child, pathStack)
        if (result)
          return result
      }
    }
    pathStack.pop() // 如果当前节点没有匹配，移除它
    return null
  }

  for (const root of tree) {
    const pathStack: Menu.MenuOptions[] = []
    const result = findNodePath(root, pathStack)
    if (result)
      return result[0] // 返回最顶层的节点
  }

  return null
}
watch(
  () => [menuList, route],
  () => {
    // 当前菜单没有数据直接 return
    if (!menuList.value?.length)
      return
    const topPathObj = findTopPathByActivePath(menuList.value, route.path)
    selectedKeys.value = [topPathObj?.path]
    const menuItem = menuList.value.filter((item: Menu.MenuOptions) => {
      return route.path === item.path || `/${route.path.split('/')[1]}` === item.path
    })
    if (menuItem[0].children?.length)
      return (subMenuList.value = menuItem[0].children)
    subMenuList.value = []
  },
  {
    deep: true,
    immediate: true,
  },
)

function changeSubMenu(item: Menu.MenuOptions) {
  if (item.children?.length)
    return (subMenuList.value = item.children)
  subMenuList.value = []
  if (item.meta.isLink)
    return window.open(item.meta.isLink, item.meta.blank ? '_blank' : '')
  router.push(item.path)
}

function onSelect({ keyPath }) {
  selectedKeys.value = keyPath
}
</script>

<template>
  <a-layout ly-h-full>
    <a-layout-header :style="headerStyle" :theme="headTheme" ly-h="[64px]!" ly-bg="#fff!">
      <div ly-h-full ly-w-full ly-flex ly-justify-between>
        <div ly-flex ly-flex-1 ly-items-center>
          <div ly-w="[256px]" ly-px="[15px]" ly-flex-shrink-0>
            <a href="/" ly-flex ly-items-center>
              <img src="~@/assets/icons/logo.svg" class="ly-h-[44px]" alt="logo">
              <span ly-text="size-[20px] [rgba(0,0,0,0.85)]" ly-font-600>{{ title }}</span>
            </a>
          </div>
          <MenuFold />
          <a-menu
            mode="horizontal" :theme="slideTheme" :selected-keys="selectedKeys"
            class="custom-menu ly-max-w-[calc(100%-256px-100px)]"
            @click="onSelect"
          >
            <a-menu-item v-for="menu in menuList" :key="`${menu.path}`" @click="changeSubMenu(menu)">
              <template v-if="menu.meta.icon" #icon>
                <SvgIcon :name="menu.meta.icon" />
              </template>
              <span>{{ menu.meta.title }}</span>
            </a-menu-item>
          </a-menu>
        </div>
        <div ly-flex ly-items-center>
          <ToolBarRight ly-flex-shrink-0 @refresh="onRefresh" />
        </div>
      </div>
    </a-layout-header>
    <a-layout>
      <a-layout-sider v-show="subMenuList?.length" v-model:collapsed="collapsed" width="256px" :style="siderStyle" :theme="slideTheme">
        <Menu :collapsed="collapsed" :menu="subMenuList" :theme="slideTheme" :mode="mode" />
      </a-layout-sider>
      <a-layout>
        <a-layout>
          <Tabs v-show="globalStore.state.tabs" @refresh="onRefresh" />
          <a-layout-content :style="contentStyle">
            <Main ref="MainRef" />
          </a-layout-content>
        </a-layout>
        <a-layout-footer v-show="globalStore.state.footer" :style="footerStyle">
          <Footer />
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<style lang="less" scoped>
.custom-menu {
  ::v-deep(.ant-menu-item) {
    display: flex;
    align-items: center;
  }
}
</style>
