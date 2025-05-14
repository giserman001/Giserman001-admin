<script setup lang="ts">
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'
import { useGlobalStore } from '@/store/modules/global'

import Breadcrumb from './components/Breadcrumb.vue'

const { isHideCollapse = false } = defineProps<{ isHideCollapse?: boolean }>()

const globalStore = useGlobalStore()

function changeCollapse() {
  globalStore.setGlobalState('isCollapse', !globalStore.state.isCollapse)
}
</script>

<template>
  <div v-if="!isHideCollapse" ly-flex ly-items-center ly-gap="20px">
    <div id="collapseIcon" ly-flex ly-items-center ly-justify-center @click="changeCollapse">
      <MenuFoldOutlined v-if="globalStore.state.isCollapse" class="ly-cursor-pointer ly-text-size-[20px]" />
      <MenuUnfoldOutlined v-else class="ly-cursor-pointer ly-text-size-[20px]" />
    </div>
    <Breadcrumb v-show="globalStore.state.breadcrumb" id="breadcrumb" />
  </div>
</template>

<style scoped></style>
