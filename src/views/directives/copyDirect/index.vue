<template>
  <a-card ly-h-full>
    <div ly-flex ly-flex-col ly-items-center>
      <span class="ly-text-size-[23px] ly-font-bold" ly-m="[20px_0px_30px]">复制指令 🍇🍇🍇🍓🍓🍓</span>
      <a-input-search v-model="data" placeholder="请输入内容" style="width: 500px">
        <template #enterButton>
          <a-button v-copy="data"> 复制 </a-button>
        </template>
      </a-input-search>
    </div>
  </a-card>
</template>

<script setup lang="ts" name="copyDirect">
const data = ref<string>("我是被复制的内容 🍒 🍉 🍊");
</script>

<style scoped lang="less"></style>
