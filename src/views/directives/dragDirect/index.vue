<script setup lang="ts" name="dragDirect"></script>

<template>
  <div ly-h-full ly-border="1px solid #f0f0f0" ly-rounded="[2px]" ly-bg="[#fff]">
    <div ly-relative ly-h-full ly-flex ly-flex-col ly-items-center>
      <span class="ly-text-size-[23px] ly-font-bold" ly-m="[20px_0px_30px]">拖拽指令 🍇🍇🍇🍓🍓🍓</span>
      <div
        v-draggable
        class="ly-absolute ly-top-[110px] ly-h-[300px] ly-w-[300px] ly-flex ly-items-center ly-justify-center ly-rounded-[50%] ly-bg-[#e7fefc] ly-text-size-[23px] ly-text-[#56f5e7] ly-font-bold"
      >
        我可以拖拽哦~
      </div>
    </div>
  </div>
</template>

<style scoped lang="less"></style>
