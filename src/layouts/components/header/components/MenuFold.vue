<script setup lang="ts">
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'

const globalStore = useGlobalStore()

function changeCollapse() {
  globalStore.setGlobalState('isCollapse', !globalStore.state.isCollapse)
}
</script>

<template>
  <div id="collapseIcon" ly-flex ly-items-center ly-justify-center @click="changeCollapse">
    <MenuFoldOutlined v-if="globalStore.state.isCollapse" class="ly-cursor-pointer ly-text-size-[20px]" />
    <MenuUnfoldOutlined v-else class="ly-cursor-pointer ly-text-size-[20px]" />
  </div>
</template>

<style scoped>

</style>
