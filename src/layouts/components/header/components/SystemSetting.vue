<script setup lang="ts">
import { SkinOutlined } from '@ant-design/icons-vue'
import { emitter } from '@/layouts/components/ThemeDrawer/index'

function openDrawer() {
  emitter.emit('openThemeDrawer')
}
</script>

<template>
  <div class="ly-h-full">
    <SkinOutlined class="ly-cursor-pointer ly-text-size-[18px]" @click="openDrawer" />
  </div>
</template>

<style lang="less" scoped></style>
