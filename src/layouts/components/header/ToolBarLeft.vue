<template>
  <div v-if="!isHideCollapse" ly-flex ly-items-center ly-gap="20px">
    <div @click="changeCollapse" ly-flex ly-items-center ly-justify-center id="collapseIcon">
      <MenuFoldOutlined v-if="globalStore.state.isCollapse" class="ly-text-size-[20px] ly-cursor-pointer" />
      <MenuUnfoldOutlined v-else class="ly-text-size-[20px] ly-cursor-pointer" />
    </div>
    <Breadcrumb id="breadcrumb" v-show="globalStore.state.breadcrumb" />
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from './components/Breadcrumb.vue'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'

import { useGlobalStore } from '@/store/modules/global'

const { isHideCollapse = false } = defineProps<{ isHideCollapse?: boolean }>()

const globalStore = useGlobalStore()

function changeCollapse() {
  globalStore.setGlobalState('isCollapse', !globalStore.state.isCollapse)
}
</script>

<style scoped></style>
