<script setup lang="tsx" name="SearchFormItem">
// import type { SelectProps } from 'ant-design-vue'
import type { VNode } from 'vue'
import type { ColumnProps } from '@/components/ProTable/type'

interface SearchFormItem {
  column?: ColumnProps
  searchParam?: { [key: string]: any }
}
const { column = {}, searchParam = {} } = defineProps<SearchFormItem>()

// 针对下拉框
const options = ref<any[]>([])

if (column.search?.el === 'select' && typeof column.search.options === 'function') {
  column.search.options().then((res) => {
    options.value = res.data
  })
}

function RenderFormItemVNode() {
  let renderVNode: VNode

  if (column.search?.render) {
    renderVNode = column.search.render({ column, searchParam })
  }
  else {
    if (column.search?.el === 'input') {
      renderVNode = <a-input v-model:value={searchParam[column.dataIndex as string]} {...column.search.props} />
    }
    else if (column.search?.el === 'select') {
      renderVNode = <a-select v-model:value={searchParam[column.dataIndex as string]} {...column.search.props} options={typeof column.search.options !== 'function' ? column.search.options : options.value} />
    }
    else if (column.search?.el === 'input-number') {
      const slotsObj: { [key: string]: () => (VNode | string) } = {}
      if (column.search?.slots) {
        Object.entries(column.search?.slots).forEach(([key, value]) => {
          slotsObj[key] = () => (typeof value === 'function' ? value({ column, searchParam }) : value)
        })
      }
      renderVNode = (
        <a-input-number v-model:value={searchParam[column.dataIndex as string]} {...column.search.props}>
          { slotsObj }
        </a-input-number>
      )
    }
  }
  return <renderVNode />
}
</script>

<template>
  <RenderFormItemVNode />
</template>
