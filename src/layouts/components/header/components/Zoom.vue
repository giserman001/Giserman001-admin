<script setup lang="ts">
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons-vue'

const { isFullscreen, toggle: toggleFullScreen } = useFullscreen()
</script>

<template>
  <div class="ly-h-full" @click="toggleFullScreen">
    <FullscreenExitOutlined v-if="isFullscreen" class="ly-cursor-pointer ly-text-size-[18px]" />
    <FullscreenOutlined v-else class="ly-cursor-pointer ly-text-size-[18px]" />
  </div>
</template>

<style lang="less" scoped></style>
