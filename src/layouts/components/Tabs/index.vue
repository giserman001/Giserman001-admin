<script setup lang="ts">
import { LeftOutlined, MoreOutlined, RightOutlined } from '@ant-design/icons-vue'
import { HOME_URL } from '@/config'

const emits = defineEmits<{ (e: 'refresh', val: boolean): void }>()

const route = useRoute()
const router = useRouter()
const tabStore = useTabsStore()
const authStore = useAuthStore()
const globalStore = useGlobalStore()
const keepAliveStore = useKeepAliveStore()

const tabsMenuValue = ref(route.fullPath)
const tabsMenuList = computed(() => tabStore.state.tabsMenuList)
const tabsIcon = computed(() => globalStore.state.tabsIcon)

// 监听路由的变化（防止浏览器后退/前进不变化 tabsMenuValue）
watch(
  () => route.fullPath,
  () => {
    if (route.meta.isFull)
      return
    tabsMenuValue.value = route.fullPath
    const tabsParams = {
      icon: route.meta.icon as string,
      title: route.meta.title as string,
      path: route.fullPath,
      name: route.name as string,
      close: !route.meta.isAffix,
      isKeepAlive: route.meta.isKeepAlive as boolean,
    }
    tabStore.addTabs(tabsParams)
  },
  { immediate: true },
)

// 初始化需要固定的 tabs
function initTabs() {
  authStore.flatMenuListGet.forEach((item) => {
    if (item.meta.isAffix && !item.meta.isHide && !item.meta.isFull) {
      const tabsParams = {
        icon: item.meta.icon,
        title: item.meta.title,
        path: item.path,
        name: item.name,
        close: !item.meta.isAffix,
        isKeepAlive: item.meta.isKeepAlive,
      }
      tabStore.addTabs(tabsParams)
    }
  })
}

// Tab Click
function tabClick(path: string) {
  router.push(path)
}

// Remove Tab
function tabRemove(fullPath: string) {
  tabStore.removeTabs(fullPath as string, fullPath === route.fullPath)
}

function onEdit(targetKey: string | MouseEvent, action: string) {
  if (action !== 'add') {
    tabRemove(targetKey as string)
  }
}

function prev() {
  nextTick(() => {
    const dom: HTMLElement = document.querySelector('.ly-tabs .ant-tabs-nav-list')
    dom.style.transform = 'translate(0px, 0px)'
  })
}
function next() {
  nextTick(() => {
    const dom: HTMLElement = document.querySelector('.ly-tabs .ant-tabs-nav-list')
    const domWrap: HTMLElement = document.querySelector('.ly-tabs .ant-tabs-nav-wrap')
    dom.style.transform = `translate(-${dom.offsetWidth - domWrap.offsetWidth}px, 0px)`
  })
}

function onRefresh() {
  setTimeout(() => {
    route.meta.isKeepAlive && keepAliveStore.removeKeepAliveName(route.fullPath as string)
    emits('refresh', false)
    nextTick(() => {
      route.meta.isKeepAlive && keepAliveStore.addKeepAliveName(route.fullPath as string)
      emits('refresh', true)
    })
  }, 0)
}

function closeAllTab() {
  tabStore.closeMultipleTab()
  router.push(HOME_URL)
}

function clickItem({ key }) {
  if (key === 'refresh') {
    onRefresh()
  }
  else {
    closeAllTab()
  }
}

onMounted(() => {
  // tabsDrop();
  initTabs()
})
</script>

<template>
  <div class="ly-tabs">
    <a-tabs
      v-model:active-key="tabsMenuValue" hide-add type="editable-card"
      :tab-bar-style="{ margin: '4px 0 12px', padding: '0 10px', gap: '6px' }" class="ly-bg-[#fff]" @tab-click="tabClick" @edit="onEdit"
    >
      <template #leftExtra>
        <LeftOutlined ly-cursor-pointer @click="prev" />
      </template>
      <a-tab-pane v-for="item in tabsMenuList" :key="item.path" :closable="item.close">
        <template #tab>
          <span ly-flex ly-items-center ly-gap="4px">
            <SvgIcon v-if="item.icon && tabsIcon" :name="item.icon" width="16px" height="16px" ly-mr="0!" />
            {{ item.title }}
          </span>
        </template>
      </a-tab-pane>
      <template #rightExtra>
        <div ly-flex ly-items-center ly-gap="10px">
          <RightOutlined ly-cursor-pointer @click="next" />
          <a-dropdown>
            <MoreOutlined ly-cursor-pointer />
            <template #overlay>
              <a-menu @click="clickItem">
                <a-menu-item key="refresh">
                  刷新当前页
                </a-menu-item>
                <a-menu-item key="close">
                  关闭所有
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </template>
    </a-tabs>
  </div>
</template>

<style lang="less" scoped>
.ly-tabs {
  ::v-deep(.ant-tabs > .ant-tabs-nav .ant-tabs-nav-list) {
    transition: all 0.3s !important;
  }
  ::v-deep(.ant-tabs-card.ant-tabs-top > .ant-tabs-nav .ant-tabs-tab) {
    border-radius: 8px 8px 0 0 !important;
  }
}
</style>
