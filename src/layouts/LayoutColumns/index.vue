<template>
  <a-layout ly-h-full>
    <a-layout-sider width="70px" :style="siderStyle" :theme="slideTheme">
      <div ly-flex ly-flex-col ly-h-full>
        <div ly-h="[64px]" ly-flex ly-items-center ly-justify-center>
          <a href="/">
            <img src="~@/assets/icons/logo.svg" class="ly-h-[44px]" alt="logo" />
          </a>
        </div>
        <div ly-flex-1 ly-overflow-y-auto>
          <div v-for="item in menuList" :key="item.path"
            :class="{ 'split-active': splitActive === item.path || `/${splitActive.split('/')[1]}` === item.path }"
            @click="changeSubMenu(item)" ly-flex ly-flex-col ly-items-center ly-justify-center ly-text="size-[12px]"
            ly-h="[70px]" ly-gap="6px" ly-cursor-pointer>
            <SvgIcon :name="item.meta.icon" />
            <span>{{ item.meta.title }}</span>
          </div>
        </div>
      </div>
    </a-layout-sider>
    <a-layout ly-h-full>
      <a-layout-sider v-show="subMenuList.length" :width="'210px'" :style="siderStyle" v-model:collapsed="collapsed"
        :theme="slideTheme">
        <div ly-flex ly-flex-col ly-h-full>
          <div ly-h="[64px]" ly-flex ly-items-center ly-justify-center>
            <span v-show="subMenuList.length" ly-text="size-[20px] [rgba(0,0,0,0.85)]" ly-font-600>{{ collapsed ? "G" : title }}</span>
          </div>
          <div ly-flex-1>
            <Menu :collapsed="collapsed" :menu="subMenuList" :theme="slideTheme" :inlineIndent="22" :mode="mode"></Menu>
          </div>
        </div>
      </a-layout-sider>
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
  </a-layout>
</template>

<script setup lang="ts" name="LayoutColumns">
import ToolBarLeft from '@/layouts/components/header/ToolBarLeft.vue'
import ToolBarRight from '@/layouts/components/header/ToolBarRight.vue'
import Footer from '@/layouts/components/Footer/index.vue'
import Menu from '@/layouts/components/Menu/index.vue'
import Main from '@/layouts/components/Main/index.vue'
import Tabs from '@/layouts/components/Tabs/index.vue'
import type { MenuTheme, MenuMode } from 'ant-design-vue'
import type { CSSProperties } from 'vue'

const title = import.meta.env.VITE_GLOB_APP_TITLE;

const route = useRoute();

const router = useRouter();

const subMenuList = ref<Menu.MenuOptions[]>([]);

const splitActive = ref("");


const mainRef = useTemplateRef<InstanceType<typeof Main>>('MainRef')

const globalStore = useGlobalStore()

const authStore = useAuthStore();

const collapsed = computed(() => globalStore.state.isCollapse)

const asideInverted = computed(() => globalStore.state.asideInverted)

const menuList = computed(() => authStore.showMenuListGet);

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
  padding: '15px',
  color: '#000',
  'overflow-x': 'hidden',
  'overflow-y': 'auto'
}

const siderStyle: CSSProperties = {
  borderRight: '1px solid #e4e7ed',
  overflow: 'auto',
}

const footerStyle: CSSProperties = {
  backgroundColor: 'transparent',
  padding: 0
}

watch(
  () => [menuList, route],
  () => {
    // 当前菜单没有数据直接 return
    if (!menuList.value.length) return;
    splitActive.value = route.path;
    const menuItem = menuList.value.filter((item: Menu.MenuOptions) => {
      return route.path === item.path || `/${route.path.split("/")[1]}` === item.path;
    });
    if (menuItem[0].children?.length) return (subMenuList.value = menuItem[0].children);
    subMenuList.value = [];
  },
  {
    deep: true,
    immediate: true
  }
);

// change SubMenu
const changeSubMenu = (item: Menu.MenuOptions) => {
  splitActive.value = item.path;
  if (item.children?.length) return (subMenuList.value = item.children);
  subMenuList.value = [];
  router.push(item.path);
};
</script>

<style lang="less" scoped>
.split-active {
  background-color: @colorPrimary !important;
  color: #ffffff !important;
}
</style>