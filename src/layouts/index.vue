<!-- 💥 这里是一次性加载 LayoutComponents -->
<script setup lang="ts" name="layout">
import type { LayoutType } from '@/store/interface'
import { useGlobalStore } from '@/store/modules/global'
import ThemeDrawer from './components/ThemeDrawer/index.vue'
// 经典布局
import LayoutClassic from './LayoutClassic/index.vue'
// 分栏布局
import LayoutColumns from './LayoutColumns/index.vue'
// 混合布局
import LayoutMixture from './LayoutMixture/index.vue'
// 横向布局
import LayoutTransverse from './LayoutTransverse/index.vue'
// 纵向布局
import LayoutVertical from './LayoutVertical/index.vue'

const LayoutComponents: Partial<Record<LayoutType, Component>> = {
  vertical: LayoutVertical,
  classic: LayoutClassic,
  transverse: LayoutTransverse,
  columns: LayoutColumns,
  mixture: LayoutMixture,
}

const globalStore = useGlobalStore()

// const isDark = computed(() => globalStore.state.isDark);
const layout = computed(() => globalStore.state.layout)
// const watermark = computed(() => globalStore.state.watermark);
</script>

<template>
  <component :is="LayoutComponents[layout]" />
  <ThemeDrawer />
</template>

<style scoped lang="less">
.layout {
  min-width: 600px;
}
</style>
