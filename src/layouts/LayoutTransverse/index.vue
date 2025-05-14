<script lang="ts" setup name="LayoutTransverse">
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

const menuList = computed(() => authStore.showMenuListGet)

const theme = computed<MenuTheme>(() => 'light')

const mode = computed<MenuMode>(() => 'horizontal')

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

const footerStyle: CSSProperties = {
  backgroundColor: 'transparent',
  padding: 0,
}
</script>

<template>
  <a-layout ly-h-full>
    <a-layout-header :style="headerStyle" ly-h="[64px]!" ly-bg="#fff!">
      <div ly-h-full ly-w-full ly-flex ly-justify-between>
        <div ly-flex ly-flex-1>
          <div ly-w="[256px]" ly-px="[15px]" ly-flex-shrink-0>
            <a href="/" ly-flex ly-items-center>
              <img src="~@/assets/icons/logo.svg" class="ly-h-[44px]" alt="logo">
              <span ly-text="size-[20px] [rgba(0,0,0,0.85)]" ly-font-600>{{ title }}</span>
            </a>
          </div>
          <Menu
            class="ly-max-w-[calc(100%-256px-100px)]" :collapsed="collapsed" :menu="menuList" :theme="theme"
            :mode="mode"
          />
        </div>
        <div ly-flex ly-items-center>
          <ToolBarLeft is-hide-collapse />
          <ToolBarRight ly-flex-shrink-0 @refresh="onRefresh" />
        </div>
      </div>
    </a-layout-header>
    <a-layout>
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

<style lang="less" scoped></style>
