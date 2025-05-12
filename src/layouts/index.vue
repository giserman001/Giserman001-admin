<!-- 💥 这里是一次性加载 LayoutComponents -->
<template>
  <component :is="LayoutComponents[layout]" />
  <ThemeDrawer />
</template>

<script setup lang="ts" name="layout">
import { LayoutType } from '@/store/interface'
import ThemeDrawer from "./components/ThemeDrawer/index.vue";
import { useGlobalStore } from '@/store/modules/global'
import LayoutVertical from "./LayoutVertical/index.vue";
import LayoutClassic from './LayoutClassic/index.vue'
import LayoutTransverse from "./LayoutTransverse/index.vue";
import LayoutColumns from "./LayoutColumns/index.vue";

const LayoutComponents: Partial<Record<LayoutType, Component>> = {
  vertical: LayoutVertical,
  classic: LayoutClassic,
  transverse: LayoutTransverse,
  columns: LayoutColumns
}

const globalStore = useGlobalStore()

// const isDark = computed(() => globalStore.state.isDark);
const layout = computed(() => globalStore.state.layout)
// const watermark = computed(() => globalStore.state.watermark);

const font = reactive({ color: 'rgba(0, 0, 0, .15)' })
// watch(isDark, () => (font.color = isDark.value ? "rgba(255, 255, 255, .15)" : "rgba(0, 0, 0, .15)"), {
//   immediate: true
// });
</script>

<style scoped lang="less">
.layout {
  min-width: 600px;
}
</style>
