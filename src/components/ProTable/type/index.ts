// import { VNode, ComponentPublicInstance, Ref } from "vue";
// import { BreakPoint, Responsive } from "@/components/Grid/interface";
import type { TableColumnsType } from 'ant-design-vue'

export interface ColumnProps extends Partial<TableColumnsType> {

}

export interface ProTableProps {
  dataSource: any[]
  columns: TableColumnsType
  rowKey?: string
  toolButton?: ('refresh' | 'setting' | 'search')[] | boolean // 是否显示表格功能按钮 ==> 非必传（默认为true）
}
