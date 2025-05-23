<script setup lang="ts" name="SearchForm">
import type { BreakPoint } from '@/components/Grid/interface'
import type { ColumnProps } from '@/components/ProTable/type'
import { DownOutlined, QuestionCircleOutlined, UpOutlined } from '@ant-design/icons-vue'

import GridItem from '@/components/Grid/components/GridItem.vue'
import Grid from '@/components/Grid/index.vue'
import SearchFormItem from './components/SearchFormItem.vue'

interface ProTableProps {
  columns?: ColumnProps[] // 搜索配置列
  searchParam?: { [key: string]: any } // 搜索参数
  searchCol: number | Record<BreakPoint, number>
  search: (params: any) => void // 搜索方法
  reset: (params: any) => void // 重置方法
}

// 默认值
const props = withDefaults(defineProps<ProTableProps>(), {
  columns: () => [],
  searchParam: () => ({}),
})

// 获取响应式设置
function getResponsive(item: ColumnProps) {
  return {
    span: item.search?.span,
    offset: item.search?.offset ?? 0,
    xs: item.search?.xs,
    sm: item.search?.sm,
    md: item.search?.md,
    lg: item.search?.lg,
    xl: item.search?.xl,
  }
}

// 是否默认折叠搜索项
const collapsed = ref(true)

// 获取响应式断点
const gridRef = useTemplateRef<InstanceType<typeof Grid>>('GridRef')
const breakPoint = computed<BreakPoint>(() => gridRef.value?.breakPoint)

// 判断是否显示 展开/合并 按钮
const showCollapse = computed(() => {
  let show = false
  props.columns.reduce((prev, current) => {
    prev
      += (current.search![breakPoint.value]?.span ?? current.search?.span ?? 1)
        + (current.search![breakPoint.value]?.offset ?? current.search?.offset ?? 0)
    if (typeof props.searchCol !== 'number') {
      if (prev >= props.searchCol[breakPoint.value])
        show = true
    }
    else {
      if (prev >= props.searchCol)
        show = true
    }
    return prev
  }, 0)
  return show
})
</script>

<template>
  <div v-if="columns.length" class="table-search">
    <a-form :model="searchParam">
      <Grid ref="GridRef" :collapsed="collapsed" :gap="[20, 0]" :cols="searchCol">
        <GridItem v-for="(item, index) in columns" :key="(item.dataIndex as string)" v-bind="getResponsive(item)" :index="index">
          <a-form-item>
            <template #label>
              <a-space :size="4">
                <span>{{ `${item.search?.label ?? item.title}` }}</span>
                <a-tooltip v-if="item.search?.tooltip" effect="dark" placement="top">
                  <template #title>{{ item.search?.tooltip }}</template>
                  <QuestionCircleOutlined />
                </a-tooltip>
              </a-space>
            </template>
            <SearchFormItem :column="item" :search-param="searchParam" />
          </a-form-item>
        </GridItem>
        <GridItem suffix>
          <div class="ly-mb-[20px] ly-flex ly-items-center ly-justify-end ly-gap-[10px]">
            <a-button type="primary" @click="search"> 搜索 </a-button>
            <a-button @click="reset"> 重置 </a-button>
            <div v-if="showCollapse" ly-text="#1677ff" ly-cursor-pointer @click="collapsed = !collapsed">
              {{ collapsed ? "展开" : "合并" }}
              <DownOutlined v-if="collapsed" class="ly-ml-[2px]!" />
              <UpOutlined v-else class="ly-ml-[2px]!" />
            </div>
          </div>
        </GridItem>
      </Grid>
    </a-form>
  </div>
</template>

<style lang="less" scoped>
.table-search {
  ::v-deep(.ant-form-item) {
    margin-bottom: 20px !important;
  }
}
</style>
