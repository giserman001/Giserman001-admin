import baseService from '@/utils/http/axios'

export const userLogin = (data) => {
  return baseService.post(`auth/unlock`, data)
}
