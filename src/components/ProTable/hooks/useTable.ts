import type { TablePaginationConfig } from 'ant-design-vue'
import type { Table } from '../type/index'
import { reactive, toRefs } from 'vue'

/**
 * @description table 页面操作方法封装
 * @param {Function} api 获取表格数据 api 方法 (必传)
 * @param {object} initParam 获取数据初始化参数 (非必传，默认为{})
 * @param {boolean} isParable 是否有分页
 * @param {Function} dataCallBack 对后台返回的数据进行处理的方法 (非必传)
 */
export function useTable(api?: (params: any) => Promise<any>, initParam: object = {}, isParable?: (TablePaginationConfig | false), dataCallBack?: (data: any) => any, requestError?: (error: any) => void, loadingable?: boolean) {
  const state = reactive<Table.StateProps>({
    // 表格数据
    tableData: [],
    // 分页数据
    pagination: isParable !== false ? { current: 1, pageSize: 10, total: 0, ...isParable } : false,
    // 查询参数(只包括查询)
    searchParam: {},
    // 初始化默认的查询参数
    searchInitParam: {},
    // 总参数(包含分页和查询参数)
    totalParam: {},
    loading: false,
  })

  /**
   * @description 分页查询参数(只包括分页和表格字段排序,其他排序方式可自行配置)
   */
  // const pageParam = computed({
  //   get: () => {
  //     return {
  //       current: (state.pagination as TablePaginationConfig).current,
  //       pageSize: (state.pagination as TablePaginationConfig).pageSize,
  //     }
  //   },
  //   set: (newVal: any) => {
  //     console.log('我是分页更新之后的值', newVal)
  //   },
  // })

  /**
   * @description 获取表格数据
   * @return void
   */
  const getTableList = async () => {
    if (!api)
      return
    try {
      // 先把初始化参数和分页参数放到总参数里面
      Object.assign(state.totalParam, initParam, isParable !== false ? state.pagination : {})
      loadingable && (state.loading = true)
      const { data } = await api({ ...state.searchInitParam, ...state.totalParam })
      loadingable && (state.loading = false)
      state.tableData = isParable !== false ? data.list : data
      // 解构后台返回的分页数据 (如果有分页更新分页信息)
      if (state.pagination !== false) {
        state.pagination.total = data.total
      }
    }
    catch (error) {
      requestError && requestError(error)
    }
  }

  /**
   * @description 更新查询参数
   * @return void
   */
  const updatedTotalParam = () => {
    state.totalParam = {}
    // 处理查询参数，可以给查询参数加自定义前缀操作
    const nowSearchParam: Table.StateProps['searchParam'] = {}
    // 防止手动清空输入框携带参数（这里可以自定义查询参数前缀）
    for (const key in state.searchParam) {
      // 某些情况下参数为 false/0 也应该携带参数
      if (state.searchParam[key] || state.searchParam[key] === false || state.searchParam[key] === 0) {
        nowSearchParam[key] = state.searchParam[key]
      }
    }
    Object.assign(state.totalParam, nowSearchParam)
  }

  /**
   * @description 表格数据查询
   * @return void
   */
  const search = () => {
    (state.pagination as TablePaginationConfig).current = 1
    updatedTotalParam()
    getTableList()
  }

  /**
   * @description 表格数据重置
   * @return void
   */
  const reset = () => {
    (state.pagination as TablePaginationConfig).current = 1
    // 重置搜索表单的时，如果有默认搜索参数，则重置默认的搜索参数
    state.searchParam = { ...state.searchInitParam }
    updatedTotalParam()
    getTableList()
  }

  const handlePageChange = () => {
    getTableList()
  }

  return {
    ...toRefs(state),
    getTableList,
    search,
    reset,
    handlePageChange,
    updatedTotalParam,
  }
}
