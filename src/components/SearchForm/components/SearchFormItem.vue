<script setup lang="ts" name="SearchFormItem">
import type { ColumnProps } from '@/components/ProTable/type'

interface SearchFormItem {
  column?: ColumnProps
  searchParam?: { [key: string]: any }
}
const { column = {}, searchParam = {} } = defineProps<SearchFormItem>()
</script>

<template>
  <div>测试</div>
</template>
