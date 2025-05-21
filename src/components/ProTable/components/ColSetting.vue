<script setup lang="ts" name="ColSetting">
import type { TableColumnType } from 'ant-design-vue'
import type { ColumnProps } from '../type/index'

const columnsCol = defineModel<ColumnProps[]>('columnsCol', { required: true })

const drawerVisible = ref<boolean>(false)

const currentRecord = ref<ColumnProps>()

const columns: TableColumnType[] = [
  {
    title: '列名',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '显示',
    dataIndex: 'isShow',
    key: 'isShow',
  },
]

function filterColumnsByFields(columns, fields = 'isSetting') {
  return columns.filter((column) => {
    if (column.children) {
      column.children = filterColumnsByFields(column.children)
      return column[fields] && column.children.length > 0
    }
    return column[fields]
  })
}

const filterColumns = ref<ColumnProps[]>([])

watch(() => drawerVisible.value, (val) => {
  if (val) {
    filterColumns.value = filterColumnsByFields(columnsCol.value)
    console.log(filterColumns.value, 'filterColumns.value')
  }
  else {
    filterColumns.value = []
  }
})

function changeChecked(record: ColumnProps) {
  record.isShow = !record.isShow
  currentRecord.value = record
}

function dealColumnsCol(columns: ColumnProps[], record: ColumnProps) {
  columns?.forEach((column) => {
    if (column?.dataIndex === record?.dataIndex) {
      column.isShow = record.isShow
    }
    if (column.children) {
      dealColumnsCol(column.children, record)
    }
  })
}

watch(() => currentRecord.value, (val) => {
  dealColumnsCol(columnsCol.value, val)
})

function openColSetting() {
  drawerVisible.value = true
}

defineExpose({
  openColSetting,
})
</script>

<template>
  <!-- 列设置 -->
  <a-drawer v-model:open="drawerVisible" width="450" placement="right" title="表格设置" closable>
    <a-table :data-source="filterColumns" :columns="columns" bordered size="small" :row-key="(record) => record.dataIndex" :pagination="false">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'isShow'">
          <a-switch :checked="record.isShow" @change="changeChecked(record)" />
        </template>
      </template>
    </a-table>
  </a-drawer>
</template>

<style scoped lang="less">

</style>
