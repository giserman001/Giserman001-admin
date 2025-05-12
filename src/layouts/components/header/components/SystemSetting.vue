<template>
  <div class="ly-h-full">
    <SkinOutlined class="ly-text-size-[18px] ly-cursor-pointer" @click="openDrawer" />
  </div>
</template>

<script setup lang="ts">
import { SkinOutlined } from '@ant-design/icons-vue';
import { emitter } from "@/layouts/components/ThemeDrawer/index";

const openDrawer = () => {
  emitter.emit("openThemeDrawer");
};
</script>

<style lang="less" scoped></style>