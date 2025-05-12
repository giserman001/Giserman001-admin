<template>
  <a-card ly-h-full>
    <div ly-flex ly-flex-col ly-items-center>
      <span class="ly-text-size-[23px] ly-font-bold" ly-m="[20px_0px_30px]">防抖指令 🍇🍇🍇🍓🍓🍓</span>
      <a-button v-debounce="debounceClick" type="primary"> 防抖按钮 (0.5秒后执行) </a-button>
    </div>
  </a-card>
</template>

<script setup lang="ts" name="debounceDirect">
import { message } from "ant-design-vue";
const debounceClick = () => {
  message.success("我是防抖按钮触发的事件 🍍🍓🍌");
};
</script>

<style scoped lang="less">
</style>
