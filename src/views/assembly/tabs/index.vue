<template>
  <a-card ly-h-full>
    <div ly-flex ly-flex-col ly-items-center>
      <span class="ly-text-size-[23px] ly-font-bold" ly-m="[20px_0px_30px]">标签页操作 🍇🍇🍇🍓🍓🍓</span>
      <a-space>
        <a-button type="primary" @click="handleToParamsDetail('1')"> 打开params详情页1 </a-button>
        <a-button type="primary" @click="handleToQueryDetail('5')"> 打开query详情页5 </a-button>
      </a-space>
    </div>
  </a-card>
</template>

<script setup lang="ts" name="tabs">
import { useRouter } from "vue-router"
const router = useRouter();

// 打开详情页
const handleToParamsDetail = (id: string) => {
  router.push(`/assembly/tabs/detail/${id}`);
};

// 打开详情页
const handleToQueryDetail = (id: string) => {
  router.push({path: `/assembly/tabs/detail1`, query: { id }});
};
</script>
