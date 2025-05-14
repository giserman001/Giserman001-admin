<script setup lang="ts" name="LayoutVertical">
import type { MenuMode, MenuTheme } from 'ant-design-vue'
import type { CSSProperties } from 'vue'
import Footer from '@/layouts/components/Footer/index.vue'
import ToolBarLeft from '@/layouts/components/header/ToolBarLeft.vue'
import ToolBarRight from '@/layouts/components/header/ToolBarRight.vue'
import Main from '@/layouts/components/Main/index.vue'
import Menu from '@/layouts/components/Menu/index.vue'
import Tabs from '@/layouts/components/Tabs/index.vue'

const title = import.meta.env.VITE_GLOB_APP_TITLE

const mainRef = useTemplateRef<InstanceType<typeof Main>>('MainRef')

const globalStore = useGlobalStore()

const authStore = useAuthStore()

const collapsed = computed(() => globalStore.state.isCollapse)

const asideInverted = computed(() => globalStore.state.asideInverted)

const menuList = computed(() => authStore.showMenuListGet)

const slideTheme = computed<MenuTheme>(() => !asideInverted.value ? 'light' : 'dark')

const mode = computed<MenuMode>(() => 'inline')

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
</script>

<template>
  <a-layout ly-h-full>
    <div
      ly-flex="~ col" :style="{ width: collapsed ? '80px' : '256px' }" ly-overflow-hidden
      ly-transition="[width] duration-[0.3s] ease"
    >
      <div
        ly-w-full ly-px="[15px]" ly-flex ly-items-center ly-border-r="1px solid #e4e7ed" ly-h="[64px]"
        ly-bg="[#fff]"
      >
        <a href="/" ly-flex ly-items-center>
          <img src="~@/assets/icons/logo.svg" class="ly-h-[44px]" alt="logo">
          <span v-if="!collapsed" ly-text="size-[20px] [rgba(0,0,0,0.85)]" ly-font-600>{{ title }}</span>
        </a>
      </div>
      <a-layout-sider v-model:collapsed="collapsed" width="256px" :style="siderStyle" :theme="slideTheme" class="ly-flex-1!">
        <Menu :collapsed="collapsed" :menu="menuList" :theme="slideTheme" :mode="mode" />
      </a-layout-sider>
    </div>
    <a-layout>
      <a-layout-header :style="headerStyle" ly-h="[64px]!" ly-bg="#fff!">
        <div ly-h-full ly-flex ly-justify-between ly-px="[10px]">
          <ToolBarLeft />
          <ToolBarRight @refresh="onRefresh" />
        </div>
      </a-layout-header>
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
</template>

<style lang="less" scoped></style>
