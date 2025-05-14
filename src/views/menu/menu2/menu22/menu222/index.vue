<script setup lang="ts" name="menu222">
const value = ref<string>('')
</script>

<template>
  <a-card ly-h-full>
    <div ly-flex ly-flex-col ly-items-center>
      <span class="ly-text-size-[23px] ly-font-bold" ly-m="[20px_0px_30px]">我是menu2-2-2  🍇🍇🍇🍓🍓🍓</span>
      <a-input v-model="value" placeholder="测试缓存" />
    </div>
  </a-card>
</template>

<style scoped lang="less">
</style>
