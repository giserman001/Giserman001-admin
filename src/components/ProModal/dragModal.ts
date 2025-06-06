import { nextTick } from 'vue'

export default {
  mounted(el: any, binding?: any) {
    nextTick(() => {
      // 获取对应DOM
      const dialogHeaderEl = el.closest('.ant-modal-header')
      const dragDom = el.closest('.ant-modal')
      dialogHeaderEl.style.cssText += ';cursor:move;'
      const sty = (function () {
        return (dom: any, attr: any) => getComputedStyle(dom, null)[attr]
      })()
      dialogHeaderEl.onmousedown = (e: any) => {
        // 鼠标按下，计算当前元素距离可视区的距离
        const disX = e.clientX - dialogHeaderEl.offsetLeft
        const disY = e.clientY - dialogHeaderEl.offsetTop
        const screenWidth = document.body.clientWidth // body当前宽度
        const screenHeight = document.documentElement.clientHeight // 可见区域高度(应为body高度，可某些环境下无法获取)
        const dragDomWidth = dragDom.offsetWidth // 对话框宽度
        const dragDomheight = dragDom.offsetHeight // 对话框高度
        const minDragDomLeft = dragDom.offsetLeft
        const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth
        const minDragDomTop = dragDom.offsetTop
        const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomheight
        // 获取到的值带px 正则匹配替换
        let styL: any = sty(dragDom, 'left')
        // 为兼容ie
        if (styL === 'auto')
          styL = '0px'
        let styT: any = sty(dragDom, 'top')
        // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
        if (styL.includes('%')) {
          styL = +document.body.clientWidth * (+styL.replace(/%/g, '') / 100)
          styT = +document.body.clientHeight * (+styT.replace(/%/g, '') / 100)
        }
        else {
          styL = +styL.replace(/px/g, '')
          styT = +styT.replace(/px/g, '')
        }
        document.onmousemove = function (e) {
          // 通过事件委托，计算移动的距离
          let left = e.clientX - disX
          let top = e.clientY - disY
          // 边界处理
          if (-(left) > minDragDomLeft) {
            left = -(minDragDomLeft)
          }
          else if (left > maxDragDomLeft) {
            left = maxDragDomLeft
          }

          if (-(top) > minDragDomTop) {
            top = -(minDragDomTop)
          }
          else if (top > maxDragDomTop) {
            top = maxDragDomTop
          }
          // 移动当前元素
          dragDom.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`
        }
        document.onmouseup = function () {
          document.onmousemove = null
          document.onmouseup = null
        }
        return false
      }
    })
  },
}
