<template>
  <div class="ly-h-full" @click="toggleFullScreen">
    <FullscreenExitOutlined v-if="isFullscreen"  class="ly-text-size-[18px] ly-cursor-pointer" />
    <FullscreenOutlined v-else class="ly-text-size-[18px] ly-cursor-pointer" />
  </div>
</template>

<script setup lang="ts">
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons-vue';
const { isFullscreen, toggle: toggleFullScreen } = useFullscreen()
</script>

<style lang="less" scoped></style>