import mitt from '@/utils/mitt'

export const emitter = mitt()

export function getColor() {
  return [
    {
      key: '拂晓蓝（默认）',
      color: '#1677ff',
    },
    {
      key: '薄暮',
      color: '#F5222D',
    },
    {
      key: '火山',
      color: '#FA541C',
    },
    {
      key: '日暮',
      color: '#FAAD14',
    },
    {
      key: '明青',
      color: '#13C2C2',
    },
    {
      key: '极光绿',
      color: '#52C41A',
    },
    {
      key: '极客蓝',
      color: '#2F54EB',
    },
    {
      key: '酱紫',
      color: '#722ED1',
    },
  ]
}
