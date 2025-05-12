import type { EChartsOption } from 'echarts'
import type { Ref } from 'vue'
import { useTimeoutFnLoc } from '@/hooks/core/useTimeout'
import { useBreakpoint } from '@/hooks/event/useBreakpoint'
import { useEventListenerLoc } from '@/hooks/event/useEventListener'
import { isInsideHiddenElement } from '@/utils/domUtils'
import echarts from '@/utils/libs/echarts'
import { tryOnUnmounted, useDebounceFn } from '@vueuse/core'
import { computed, nextTick, ref, unref } from 'vue'

export function getLinearGradient([color1, color2]: string[], direction: 'up' | 'down' | 'left' | 'right' = 'down') {
  return new echarts.graphic.LinearGradient(
    +(direction === 'right'), // 左右
    +(direction === 'down'), // 上下
    +(direction === 'left'), // 右左
    +(direction === 'up'), // 下上
    [
      { offset: 0, color: color2 },
      { offset: 1, color: color1 },
    ],
    false,
  )
}

export function useECharts(elRef: Ref<HTMLDivElement | undefined>, theme: 'light' | 'dark' | 'default' = 'dark') {
  let chartInstance: echarts.ECharts | null = null
  let resizeFn: Fn = resize
  const cacheOptions = ref({}) as Ref<EChartsOption>
  let removeResizeFn: Fn = () => { }

  let needResize = false

  resizeFn = useDebounceFn(resize, 200)

  const getOptions = computed(() => {
    if (theme !== 'dark')
      return cacheOptions.value as EChartsOption

    return {
      backgroundColor: 'transparent',
      ...cacheOptions.value,
    } as EChartsOption
  })

  function initCharts(t = theme) {
    const el = unref(elRef)
    if (!el || !unref(el))
      return

    chartInstance = echarts.init(el, t)

    const { removeEvent } = useEventListenerLoc({
      el: window,
      name: 'resize',
      listener: resizeFn,
    })
    removeResizeFn = removeEvent
    const { widthRef, screenEnum } = useBreakpoint()
    if (unref(widthRef) <= screenEnum.MD || el.offsetHeight === 0) {
      useTimeoutFnLoc(() => {
        resizeFn()
      }, 30)
    }
  }

  function setOptions(options: EChartsOption, clear = true) {
    needResize && resize()
    cacheOptions.value = options

    // dom变化了，重新渲染
    if (chartInstance && (chartInstance.getDom() !== elRef.value)) {
      chartInstance = null
      setOptions(unref(getOptions))
      return
    }

    if (unref(elRef)?.offsetHeight === 0) {
      useTimeoutFnLoc(() => {
        setOptions(unref(getOptions))
      }, 30)
      return
    }

    nextTick(() => {
      useTimeoutFnLoc(() => {
        if (!chartInstance) {
          initCharts(theme as 'default')

          if (!chartInstance)
            return
        }

        clear && chartInstance?.clear()

        chartInstance?.setOption(unref(getOptions))
      }, 30)
    })
  }

  function resize() {
    if (isInsideHiddenElement(chartInstance?.getDom()) || unref(elRef)?.offsetHeight === 0)
      return (needResize = true)
    chartInstance?.resize()

    needResize = false
  }

  onActivated(() => {
    nextTick(() => {
      needResize && resize()
    })
  })

  tryOnUnmounted(() => {
    if (!chartInstance)
      return
    removeResizeFn()
    chartInstance.dispose()
    chartInstance = null
  })

  function getInstance(): echarts.ECharts | null {
    if (!chartInstance)
      initCharts(theme as 'default')

    return chartInstance
  }

  return {
    setOptions,
    resize,
    echarts,
    getInstance,
  }
}
