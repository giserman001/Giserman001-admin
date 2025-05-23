import { openWindow } from './index'

/**
 * @description: base64 to blob
 */
export function dataURLtoBlob(base64Buf: string): Blob {
  const arr = base64Buf.split(',')
  const typeItem = arr[0]
  const mime = typeItem.match(/:(.*?);/)![1]
  const bstr = window.atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--)
    u8arr[n] = bstr.charCodeAt(n)

  return new Blob([u8arr], { type: mime })
}

/**
 * img url to base64
 * @param url
 */
export function urlToBase64(url: string, mineType?: string): Promise<string> {
  return new Promise((resolve, reject) => {
    let canvas = document.createElement('CANVAS') as Nullable<HTMLCanvasElement>
    const ctx = canvas!.getContext('2d')

    const img = new Image()
    img.crossOrigin = ''
    img.onload = function () {
      if (!canvas || !ctx)
        return reject(new Error('canvas or ctx is null'))

      canvas.height = img.height
      canvas.width = img.width
      ctx.drawImage(img, 0, 0)
      const dataURL = canvas.toDataURL(mineType || 'image/png')
      canvas = null
      resolve(dataURL)
    }
    img.src = url
  })
}

/**
 * @description: suffix
 */
function getFileExtension(url: string) {
  const urlObj = new URL(url)
  const pathname = urlObj.pathname
  const lastDotIndex = pathname.lastIndexOf('.')
  // 如果找到了点，并且它不是 pathname 的第一个字符，提取扩展名
  if (lastDotIndex !== -1 && lastDotIndex !== 0)
    return pathname.substring(lastDotIndex)

  // 如果没有找到点或者它在开始位置，说明可能没有扩展名
  return ''
}

/**
 * Download online pictures
 * @param url
 * @param filename
 * @param mime
 * @param bom
 */
export function downloadImageByOnlineUrl(url: string, filename?: string, mime?: string, bom?: BlobPart) {
  filename = filename || url.substring(url.lastIndexOf('/') + 1, url.length)
  urlToBase64(url).then((base64) => {
    downloadByBase64(base64, filename, mime, bom)
  })
}

/**
 * Download online resources
 * @param url
 * @param filename
 * @param mime
 * @param bom
 */
export function downloadByOnlineUrl(url: string, filename?: string, mime?: string, bom?: BlobPart) {
  filename = filename || url.substring(url.lastIndexOf('/') + 1, url.length)
  return new Promise((resolve, reject) => {
    fetch(url).then((response) => {
      response.arrayBuffer().then((res) => {
        downloadByData(res, filename, mime, bom)
        resolve(true)
      })
    }).catch((err) => {
      reject(err)
    })
  })
}

/**
 * Download online resources
 * @param url
 * @param filename
 * @param mime
 * @param bom
 */
export function downloadByOnlineUrlName(url: string, filename?: string, mime?: string, bom?: BlobPart) {
  const name = filename ? filename + getFileExtension(url) : ''
  filename = name || url.substring(url.lastIndexOf('/') + 1, url.length)
  return new Promise((resolve, reject) => {
    fetch(url).then((response) => {
      response.arrayBuffer().then((res) => {
        downloadByData(res, filename, mime, bom)
        resolve(true)
      })
    }).catch((err) => {
      reject(err)
    })
  })
}

/**
 * Download pictures based on base64
 * @param buf
 * @param filename
 * @param mime
 * @param bom
 */
export function downloadByBase64(buf: string, filename: string, mime?: string, bom?: BlobPart) {
  const base64Buf = dataURLtoBlob(buf)
  downloadByData(base64Buf, filename, mime, bom)
}

/**
 * Download according to the background interface file stream
 * @param {*} data
 * @param {*} filename
 * @param {*} mime
 * @param {*} bom
 */
export function downloadByData(data: BlobPart, filename: string, mime?: string, bom?: BlobPart) {
  const blobData = typeof bom !== 'undefined' ? [bom, data] : [data]
  const blob = new Blob(blobData, { type: mime || 'application/octet-stream' })

  const blobURL = window.URL.createObjectURL(blob)
  const tempLink = document.createElement('a')
  tempLink.style.display = 'none'
  tempLink.href = blobURL
  tempLink.setAttribute('download', filename)
  if (typeof tempLink.download === 'undefined')
    tempLink.setAttribute('target', '_blank')

  document.body.appendChild(tempLink)
  tempLink.click()
  document.body.removeChild(tempLink)
  window.URL.revokeObjectURL(blobURL)
}

/**
 * Download file according to file address
 * @param {*} sUrl
 */
export function downloadByUrl({
  url,
  target = '_blank',
  fileName,
}: {
  url: string
  target?: '_self' | '_blank'
  fileName?: string
}): boolean {
  const isChrome = window.navigator.userAgent.toLowerCase().includes('chrome')
  const isSafari = window.navigator.userAgent.toLowerCase().includes('safari')

  if (/(iP)/g.test(window.navigator.userAgent)) {
    console.error('Your browser does not support download!')
    return false
  }
  if (isChrome || isSafari) {
    const link = document.createElement('a')
    link.href = url
    link.target = target

    if (link.download !== undefined)
      link.download = fileName || url.substring(url.lastIndexOf('/') + 1, url.length)

    if (document.createEvent) {
      const e = document.createEvent('MouseEvents')
      e.initEvent('click', true, true)
      link.dispatchEvent(e)
      return true
    }
  }
  if (!url.includes('?'))
    url += '?download'

  openWindow(url, { target })
  return true
}
