import type { PageResult, Response } from './types/index'

type ResponseType<T> = Omit<Response<T>, 'data'> & { data?: T }

export function createResponse<T>(data: T = null as unknown as T, code = 200, msg = 'ok'): ResponseType<T> {
  return { code, msg, data }
}

export function createPageResponse<T>(data: PageResult<T>, code = 200, msg = 'ok'): ResponseType<PageResult<T>> {
  return createResponse(data, code, msg)
}

// 随机生成固定数量数据
export function generatePagesData<T>(count, data: T): T[] {
  return Array.from({ length: count }, () => (data))
}

export function getPagesItems(items, pageNum = 1, pageSize = 10) {
  const offset = (pageNum - 1) * pageSize
  const list = items.slice(offset, offset + pageSize)
  const totalPages = Math.ceil(items.length / pageSize)

  return {
    list,
    total: items.length, // 总条目数
    totalPages, // 总共页数
    pageSize, // 每页显示条目个数
    pageNum, // 当前页数
  }
}
