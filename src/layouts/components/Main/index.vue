<script setup lang="ts">
import { h, onBeforeUnmount, ref, watch } from 'vue'

const globalStore = useGlobalStore()
const keepAliveStore = useKeepAliveStore()

const isCollapse = computed(() => globalStore.state.isCollapse)
const layout = computed(() => globalStore.state.layout)
// const tabs = computed(() => globalStore.state.tabs)
const keepAliveName = computed(() => keepAliveStore.state.keepAliveName)

// 注入刷新页面方法
const isRouterShow = ref(true)

const refreshCurrentPage = (val: boolean) => (isRouterShow.value = val)

// 解决详情页 keep-alive 问题
const wrapperMap = new Map()
function createComponentWrapper(component, route) {
  if (!component)
    return
  const wrapperName = route.fullPath
  let wrapper = wrapperMap.get(wrapperName)
  if (!wrapper) {
    wrapper = { name: wrapperName, render: () => h(component) }
    wrapperMap.set(wrapperName, wrapper)
  }
  return h(wrapper)
}

// 监听布局变化，在 body 上添加相对应的 layout class
watch(
  () => layout.value,
  () => {
    const body = document.body as HTMLElement
    body.setAttribute('class', layout.value)
  },
  { immediate: true },
)

// 监听窗口大小变化，折叠侧边栏
const screenWidth = ref(0)

const listeningWindow = useDebounceFn(() => {
  screenWidth.value = document.body.clientWidth
  if (!isCollapse.value && screenWidth.value < 1200)
    globalStore.setGlobalState('isCollapse', true)
  if (isCollapse.value && screenWidth.value > 1200)
    globalStore.setGlobalState('isCollapse', false)
}, 100)

window.addEventListener('resize', listeningWindow, false)

onBeforeUnmount(() => {
  window.removeEventListener('resize', listeningWindow)
})

defineExpose({
  refreshCurrentPage,
})
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <transition appear name="fade-transform" mode="out-in">
      <keep-alive :include="keepAliveName">
        <component :is="createComponentWrapper(Component, route)" v-if="isRouterShow" :key="route.fullPath" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<style scoped lang="less"></style>
