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

function capitalizeFirstLetter(str) {
  if (typeof str !== 'string' || str.length === 0) {
    return
  }
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function RenderFormItemVNode() {
  let renderVNode: VNode

  if (column.search?.render) {
    renderVNode = column.search.render({ column, searchParam })
  }
  else {
    const slotsObj: { [key: string]: () => (VNode | string) } = {}
    const eventsObj: { [key: string]: (params: any) => void } = {}
    if (column.search?.slots) {
      Object.entries(column.search?.slots).forEach(([key, value]) => {
        slotsObj[key] = (...reset) => {
          return (typeof value === 'function' ? value({ column, searchParam, scopedSlots: { ...reset } }) : value)
        }
      })
    }
    if (column.search?.events) {
      Object.entries(column.search?.events).forEach(([key, value]) => {
        eventsObj[`on${capitalizeFirstLetter(key)}`] = value
      })
    }
    if (column.search?.el === 'input') {
      renderVNode = <a-input v-model:value={searchParam[column.dataIndex as string]} {...column.search.props} {...eventsObj} />
    }
    else if (column.search?.el === 'select') {
      renderVNode = <a-select v-model:value={searchParam[column.dataIndex as string]} {...column.search.props} {...eventsObj} options={typeof column.search.options !== 'function' ? column.search.options : options.value} />
    }
    else if (column.search?.el === 'input-number') {
      renderVNode = (
        <a-input-number v-model:value={searchParam[column.dataIndex as string]} {...column.search.props} {...eventsObj}>
          { slotsObj }
        </a-input-number>
      )
    }
    else if (column.search?.el === 'date-picker') {
      renderVNode = (
        <a-date-picker v-model:value={searchParam[column.dataIndex as string]} {...column.search.props} {...eventsObj}>
          { slotsObj }
        </a-date-picker>
      )
    }
    else if (column.search?.el === 'range-picker') {
      renderVNode = (
        <a-range-picker v-model:value={searchParam[column.dataIndex as string]} {...column.search.props} {...eventsObj}>
          { slotsObj }
        </a-range-picker>
      )
    }
  }
  return <renderVNode />
}
</script>

<template>
  <RenderFormItemVNode />
</template>
