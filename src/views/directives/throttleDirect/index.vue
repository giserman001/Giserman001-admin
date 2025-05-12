<template>
  <a-card ly-h-full>
    <div ly-flex ly-flex-col ly-items-center>
      <span class="ly-text-size-[23px] ly-font-bold" ly-m="[20px_0px_30px]">节流指令 🍇🍇🍇🍓🍓🍓</span>
      <a-button v-throttle="throttleClick" type="primary"> 节流按钮 (每隔1S秒后执行) </a-button>
    </div>
  </a-card>
</template>

<script setup lang="ts" name="throttleDirect">
import { message } from "ant-design-vue";
const throttleClick = () => {
  message.success("我是节流按钮触发的事件 🍍🍓🍌");
};
</script>

<style scoped lang="less">
</style>
