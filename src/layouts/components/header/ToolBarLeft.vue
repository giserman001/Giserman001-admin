<script setup lang="ts">
import { useGlobalStore } from '@/store/modules/global'
import Breadcrumb from './components/Breadcrumb.vue'

import MenuFold from './components/MenuFold.vue'

const globalStore = useGlobalStore()
</script>

<template>
  <div ly-flex ly-items-center ly-gap="20px">
    <MenuFold />
    <Breadcrumb v-show="globalStore.state.breadcrumb" id="breadcrumb" />
  </div>
</template>

<style scoped></style>
