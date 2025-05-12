<template>
  <div ly-h-full ly-border="1px solid #f0f0f0" ly-rounded="[2px]" ly-bg="[#fff]">
    <div ly-flex ly-flex-col ly-items-center ly-relative ly-h-full>
      <span class="ly-text-size-[23px] ly-font-bold" ly-m="[20px_0px_30px]">拖拽指令 🍇🍇🍇🍓🍓🍓</span>
      <div v-draggable
        class="ly-absolute ly-top-[110px] ly-flex ly-justify-center ly-items-center ly-w-[300px] ly-h-[300px] ly-text-size-[23px] ly-font-bold ly-rounded-[50%] ly-bg-[#e7fefc] ly-text-[#56f5e7]">
        我可以拖拽哦~</div>
    </div>
  </div>
</template>

<script setup lang="ts" name="dragDirect"></script>

<style scoped lang="less"></style>
