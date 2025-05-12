<template>
  <div class="ly-h-full">
    <ReloadOutlined class="ly-text-size-[18px] ly-cursor-pointer" style="" @click="onRefresh" />
  </div>
</template>

<script setup lang="ts">
import { ReloadOutlined } from '@ant-design/icons-vue'

const emits = defineEmits<{ (e: 'refresh', val: boolean): void }>()

const keepAliveStore = useKeepAliveStore()

const route = useRoute()

const onRefresh = () => {
  setTimeout(() => {
    route.meta.isKeepAlive && keepAliveStore.removeKeepAliveName(route.fullPath as string)
    emits('refresh', false)
    nextTick(() => {
      route.meta.isKeepAlive && keepAliveStore.addKeepAliveName(route.fullPath as string)
      emits('refresh', true)
    })
  }, 0)
}
</script>

<style scoped></style>