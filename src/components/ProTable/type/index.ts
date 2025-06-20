import type { TableColumnType, TablePaginationConfig } from 'ant-design-vue'
import type { Dayjs } from 'dayjs'
import type { ResultData } from '@/api/interface'
// import { VNode, ComponentPublicInstance, Ref } from "vue";
import type { BreakPoint, Responsive } from '@/components/Grid/interface'

export type SearchType =
  | 'input'
  | 'input-number'
  | 'select'
  | 'tree-select'
  | 'cascader'
  | 'date-picker'
  | 'range-picker'
  | 'time-picker'
  | 'time-select'
  | 'switch'
  | 'slider'

export interface FieldNamesProps {
  label: string
  value: string
  children?: string
}

export interface EnumProps {
  label?: string // 选项框显示的文字
  value?: string | number | boolean | any[] // 选项框值
  disabled?: boolean // 是否禁用此选项
  children?: EnumProps[] // 为树形选择时，可以通过 children 属性指定子选项
  [key: string]: any
}

export type SearchProps = {
  el?: SearchType // 当前项搜索框的类型
  label?: string // 当前项搜索框的 label
  props?: any // 搜索项参数，根据 element plus 官方文档来传递，该属性所有值会透传到组件
  options?: EnumProps[] | Ref<EnumProps[]> | ((params?: any) => Promise<ResultData<any>>) // 枚举字典
  key?: string // 当搜索项 key 不为 prop 属性时，可通过 key 指定
  tooltip?: string // 搜索提示
  order?: number // 搜索项排序（从大到小）
  span?: number // 搜索项所占用的列数，默认为 1 列
  offset?: number // 搜索字段左侧偏移列数
  defaultValue?: string | number | boolean | any[] | Ref<any> | Dayjs // 搜索项默认值
  events?: {
    [key: string]: (...params: any) => void
  }
  slots?: {
    [key: string]: VNode | ((params?: any) => VNode) // 所有插槽 default 属于默认插槽
  }
  render?: (scope: any) => VNode // 自定义搜索内容渲染（tsx语法）
} & Partial<Record<BreakPoint, Responsive>>

export interface ColumnProps extends TableColumnType {
  isSetting?: boolean // 是否在 ColSetting 中可配置
  isShow?: boolean //  是否显示在表格当中
  search?: SearchProps | undefined // 搜索项配置
  children?: ColumnProps[]
  fieldNames?: FieldNamesProps // 指定 label && value && children 的 key 值
}

export namespace Table {
  export interface Pageable {
    current: number
    pageSize: number
    total: number
  }
  export interface StateProps {
    tableData: any[]
    pagination: TablePaginationConfig | false
    searchParam: {
      [key: string]: any
    }
    searchInitParam: {
      [key: string]: any
    }
    totalParam: {
      [key: string]: any
    }
    icon?: {
      [key: string]: any
    }
    loading: boolean
  }
}
