<script setup lang="ts" name="tabsDetail">
import { useTabsStore } from '@/store/modules/tabs'

const route = useRoute()
const tabStore = useTabsStore()
tabStore.setTabsTitle(`No.${route.params.id} - ${route.meta.title}`)
</script>

<template>
  <div class="card content-box">
    <span class="text"> 我是 Tab 详情页 🍓🍇🍈🍉</span>
    <span class="text">params:{{ route.params }}</span>
  </div>
</template>
