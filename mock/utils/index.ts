import type { PageResult, Response } from './types/index'

type ResponseType<T> = Omit<Response<T>, 'data'> & { data?: T }

export function createResponse<T>(data: T = null as unknown as T, code = 200, msg = 'ok'): ResponseType<T> {
  return { code, msg, data }
}

export function createPageResponse<T>(data: PageResult<T>, code = 200, msg = 'ok'): ResponseType<PageResult<T>> {
  return createResponse(data, code, msg)
}
