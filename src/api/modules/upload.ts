import type { Upload } from '@/api/interface/index'
import http from '@/api'

/**
 * @name 文件上传模块
 */
// 图片上传
export function uploadImg(params: FormData) {
  return http.post<Upload.ResFileUrl>(`/file/upload/img`, params, { cancel: false })
}

// 视频上传
export function uploadVideo(params: FormData) {
  return http.post<Upload.ResFileUrl>(`/file/upload/video`, params, { cancel: false })
}
