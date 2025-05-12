<template>
  <a-card ly-h-full>
    <div ly-flex ly-flex-col ly-items-center>
      <span class="ly-text-size-[23px] ly-font-bold" ly-m="[20px_0px_30px]">长按指令 🍇🍇🍇🍓🍓🍓</span>
      <a-button v-longpress="longpress" type="primary"> 长按2秒触发事件 </a-button>
    </div>
  </a-card>
</template>

<script setup lang="ts" name="longpressDirect">
import { message } from "ant-design-vue";
const longpress = () => {
  message.success("长按事件触发成功 🎉🎉🎉");
};
</script>

<style scoped lang="less">
</style>
