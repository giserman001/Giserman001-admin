export interface PageResult<T> {
  list: T[]
  pageSize: number
  currentPage: number
  total: number
}

export interface Response<T> {
  code: number
  msg: string
  data: T
}