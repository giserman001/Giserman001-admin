<script setup lang="ts" name="ProTable">
import type { TableColumnsType } from 'ant-design-vue'
// import { ProTableProps } from './type/index'

interface ProTableProps {
  dataSource?: any[]
  columns: TableColumnsType
  rowKey?: string
  toolButton?: ('refresh' | 'setting' | 'search')[] | boolean // 是否显示表格功能按钮 ==> 非必传（默认为true）
}

const { dataSource = [], columns, rowKey } = defineProps<ProTableProps>()

const slots = useSlots()

// 所有插槽
const renderSlots = Object.keys(slots)

// 头部插槽
const headSlots = renderSlots.filter((item: string) => item.includes('-header'))

// 单元格插槽
const bodySlots = renderSlots.filter((item: string) => item.includes('-body'))

function getSlotName(slot: string) {
  return slot.split('-')[0]
}

console.log(slots, 'slots', renderSlots, 'renderSlots')
</script>

<template>
  <a-table :data-source="dataSource" :columns="columns" :row-key="rowKey" bordered v-bind="$attrs">
    <!-- 头部插槽 -->
    <template v-if="headSlots?.length" #headerCell="{ column }">
      <template v-for="slot in headSlots">
        <template v-if="getSlotName(slot) === column.dataIndex">
          <slot :name="slot" v-bind="column" />
        </template>
      </template>
    </template>
    <!-- 单元格插槽 -->
    <template v-if="bodySlots?.length" #bodyCell="{ column, text, record }">
      <template v-for="slot in bodySlots">
        <template v-if="getSlotName(slot) === column.dataIndex">
          <slot :name="slot" v-bind="{ column, text, record }" />
        </template>
      </template>
    </template>
    <!-- 页头和页脚 -->
    <template v-if="$slots['table-title']" #title>
      <slot name="table-title" />
    </template>
    <template v-if="$slots['table-footer']" #footer>
      <slot name="table-footer" />
    </template>
  </a-table>
</template>

<style lang="less" scoped></style>
