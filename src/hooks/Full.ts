import { isDev } from '@/utils/util'

export default {
  mounted(el: HTMLElement, binding, vnode) {
    let distance = 0
    // 开发模式高度直接定位450,防止影响开发
    if (isDev) {
      distance = 470
    }
    else {
      // restBottomHeight 剩余底部留出的高度
      const restBottomHeight = 120
      // 视口高度
      const clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
      // tableRef
      // 得到table表格距离视口顶部高度
      const domToTop = el.getBoundingClientRect().top
      // 剩余底部留出的高度和其他高度总和
      // 用视口高度-表格距离视口高度-restBottomHeight得到一个动态表格最大高度值（用以固定表头，使表格内容超出可滚动）
      distance = Math.ceil(clientHeight) - Math.ceil(domToTop) - restBottomHeight
    }

    if (Object.prototype.hasOwnProperty.call(vnode.ctx.props, 'height')) {
      vnode.ctx.props.height = distance
    }
    else {
      el.style.height = `${distance}px`
      el.style.overflow = 'auto'
    }
  },
}

export function calcHeight(el, restBottomHeight = 15) {
  const clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  const domToTop = el.getBoundingClientRect().bottom
  return Math.ceil(clientHeight) - Math.ceil(domToTop) - restBottomHeight
}
