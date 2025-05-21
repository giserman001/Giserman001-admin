<script setup lang="ts" name="ProTable" generic="T extends Record<string, any>, U extends ColumnProps">
// import type { TableColumnType } from 'ant-design-vue'
// import type { TableRowSelection } from 'ant-design-vue/es/table/interface'
import type { ColumnProps } from './type/index'
import type { BreakPoint } from '@/components/Grid/interface'
import { SearchOutlined, SettingFilled, SyncOutlined } from '@ant-design/icons-vue'
import { cloneDeep } from 'lodash-es'
import { h } from 'vue'
import ColSetting from './components/ColSetting.vue'

interface ProTableProps {
  dataSource?: T[]
  columns: U[]
  rowKey?: ((record: T, index?: number) => any) | string
  toolButton?: ('refresh' | 'setting' | 'search')[] | boolean // 是否显示表格功能按钮 ==> 非必传（默认为true）
  searchCol?: number | Record<BreakPoint, number> // 表格搜索项 每列占比配置 ==> 非必传 { xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }
}

const { dataSource = [], columns, rowKey = 'id', toolButton, searchCol = { xs: 1, sm: 2, md: 2, lg: 3, xl: 4 } } = defineProps<ProTableProps>()

const emit = defineEmits(['refresh', 'search', 'reset'])

// 搜索字段
const searchParam = ref<Record<string, any>>()

// 扁平化 columns 的方法
function flatColumnsFunc(columns: ColumnProps[]) {
  return columns.reduce((acc, item) => {
    acc.push(item)
    if (item.children?.length) {
      acc = acc.concat(flatColumnsFunc(item.children))
    }
    return acc
  }, [])
}

// 添加自定义属性字段
function fullColumnsFunc(columns: ColumnProps[]) {
  return columns.map((col) => {
    col.isShow = col.isShow ?? true
    col.isSetting = col.isSetting ?? true
    if (col.children?.length) {
      fullColumnsFunc(col.children)
    }
    return col
  })
}

const fullColumns = computed(() => fullColumnsFunc(columns))

// 扁平化 columns
const flatColumns = computed(() => flatColumnsFunc(fullColumns.value))

// 搜索 columns
const searchColumns = computed(() => {
  const filterSearchColumns = flatColumns.value?.filter(item => item.search?.el || item.search?.render)
  filterSearchColumns.forEach((col, index) => {
    col.search.order = col.search?.order ?? index + 1
  })
  return filterSearchColumns.sort((a, b) => a.search!.order! - b.search!.order!)
})

watch(searchColumns, (val) => {
  // 设置 搜索表单默认排序 && 搜索表单项的默认值
  val?.forEach((column) => {
    const key = column.search?.key ?? column.dataIndex
    const defaultValue = column.search?.defaultValue
    if (defaultValue !== undefined && defaultValue !== null) {
      searchParam.value[key] = defaultValue
    }
  })
}, { deep: true })

// 渲染的 columns
function filterColumnsByFields(columns, fields = 'isShow') {
  return columns.filter((column) => {
    if (column.children) {
      column.children = filterColumnsByFields(column.children)
      return column[fields] && column.children.length > 0
    }
    return column[fields]
  })
}

const renderColumns = computed(() => {
  const cloneFullColumns = cloneDeep(fullColumns.value)
  return filterColumnsByFields(cloneFullColumns)
})

// 是否显示搜索模块
const isShowSearch = ref(true)

const slots = useSlots()

// 所有插槽
const renderSlots = Object.keys(slots)

// 头部插槽
const headSlots = renderSlots.filter((item: string) => item.includes('-header'))

// 单元格插槽
const bodySlots = renderSlots.filter((item: string) => item.includes('-body'))

// 控制 ToolButton 显示
function showToolButton(key: 'refresh' | 'setting' | 'search') {
  return Array.isArray(toolButton) ? toolButton.includes(key) : toolButton
}

function getSlotName(slot: string) {
  return slot.split('-')[0]
}

// console.log(slots, 'slots', renderSlots, 'renderSlots')

// 列设置 ==> 需要过滤掉不需要设置的列
const colRef = useTemplateRef<InstanceType<typeof ColSetting>>('ColRef')
const openColSetting = () => colRef.value.openColSetting()

function _search() {
  // search()
  emit('search')
}

function _reset() {
  // reset()
  emit('reset')
}
</script>

<template>
  <div ly-flex ly-flex-col ly-gap="15px">
    <div v-show="isShowSearch" ly-bg="#fff" ly-p="20px" ly-rounded="6px" ly-shadow="[0_0_12px_rgba(0,0,0,0.05)]">
      <SearchForm
        :search="_search" :reset="_reset" :columns="searchColumns" :search-param="searchParam"
        :search-col="searchCol"
      />
    </div>
    <div
      ly-flex ly-flex-col ly-gap="10px" ly-bg="#fff" ly-p="20px" ly-rounded="6px"
      ly-shadow="[0_0_12px_rgba(0,0,0,0.05)]"
    >
      <div ly-flex ly-items-start ly-justify-between>
        <!-- 表格 header 按钮 -->
        <div ly-gap="10px" ly-flex ly-flex-1 ly-flex-wrap>
          <slot v-if="$slots.tableHeader" name="tableHeader" />
        </div>
        <div ly-gap="10px" ly-flex ly-flex-shrink-0 ly-items-center>
          <a-button v-if="showToolButton('refresh')" shape="circle" :icon="h(SyncOutlined)" @click="emit('refresh')" />
          <a-button v-if="showToolButton('setting')" shape="circle" :icon="h(SettingFilled)" @click="openColSetting" />
          <a-button
            v-if="showToolButton('search')" shape="circle" :icon="h(SearchOutlined)"
            @click="isShowSearch = !isShowSearch"
          />
        </div>
      </div>
      <a-table
        :data-source="dataSource" :columns="renderColumns" :row-key="rowKey" bordered size="small"
        v-bind="$attrs"
      >
        <!-- 头部插槽 -->
        <template v-if="headSlots?.length" #headerCell="{ title, column }">
          <template v-for="slot in headSlots">
            <template v-if="getSlotName(slot) === column.dataIndex">
              <slot :name="slot" v-bind="{ title, column }" />
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
        <!-- 页头 -->
        <template v-if="$slots.title" #title>
          <slot name="title" />
        </template>
        <!-- 页脚 -->
        <template v-if="$slots.footer" #footer>
          <slot name="footer" />
        </template>
        <!-- 行展开 -->
        <template v-if="$slots.expandedRowRender" #expandedRowRender="{ record, index, indent, expanded }">
          <slot name="expandedRowRender" v-bind="{ record, index, indent, expanded }" />
        </template>
        <!-- 行展开的表头 -->
        <template v-if="$slots.expandColumnTitle" #expandColumnTitle>
          <slot name="expandColumnTitle" />
        </template>
        <!-- 自定义筛选菜单 -->
        <template v-if="$slots.customFilterDropdown" #customFilterDropdown>
          <slot name="customFilterDropdown" />
        </template>
        <!-- 总结栏 -->
        <template v-if="$slots.summary" #summary>
          <slot name="summary" />
        </template>
      </a-table>
    </div>
    <!-- 列设置 -->
    <ColSetting v-if="toolButton" ref="ColRef" v-model:columns-col="fullColumns" />
  </div>
</template>

<style lang="less" scoped></style>
