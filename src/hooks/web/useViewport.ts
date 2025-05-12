import type { ComputedRef } from 'vue'
import { useWindowSize } from '@vueuse/core'

const { width: winWidth, height: winHeight } = useWindowSize()

const viewportWidth = 1920
const viewportHeight = 1080

export function useViewport({ vpw = viewportWidth, vph = viewportHeight } = {}) {
  const rsWidth = <T extends string | number>(w: T): ComputedRef<T extends string ? string : number> => {
    const s = String(w)
    const n: number = +(s.match(/^\d+(\.\d+)?/)?.[0] || 0)
    const u: any = s.match(/[a-z]+/)?.[0] || 0

    return computed(() => +((n / vpw) * winWidth.value).toFixed(1) + u)
  }

  const rsHeight = <T extends string | number>(w: T): ComputedRef<T extends string ? string : number> => {
    const s = String(w)
    const n: number = +(s.match(/^\d+(\.\d+)?/)?.[0] || 0)
    const u: any = s.match(/[a-z]+/)?.[0] || 0

    return computed(() => +((n / vph) * winHeight.value).toFixed(1) + u)
  }

  const wpx = (px: number) => {
    return `${px * (100 / vpw)}vw`
  }

  return {
    rsWidth,
    rsHeight,
    wpx,
    winWidth,
    winHeight,
  }
}
