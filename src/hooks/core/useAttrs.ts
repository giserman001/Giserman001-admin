/**
 * 获取组件上的所有属性，返回一个Ref对象
 */

import type { Ref } from 'vue'
import { getCurrentInstance, reactive, shallowRef, watchEffect } from 'vue'

interface Params {
  excludeListeners?: boolean // 是否排除事件监听器
  excludeKeys?: string[] // 排除的属性
  excludeDefaultKeys?: boolean // 是否排除默认属性
}

const DEFAULT_EXCLUDE_KEYS = ['class', 'style']
const LISTENER_PREFIX = /^on[A-Z]/

export function entries<T>(obj: Recordable<T>): [string, T][] {
  return Object.keys(obj).map((key: string) => [key, obj[key]])
}

export function useCurrentInstanceAttrs(params: Params = {}): Ref<Recordable> | object {
  const instance = getCurrentInstance()
  if (!instance) return {}

  const { excludeListeners = false, excludeKeys = [], excludeDefaultKeys = true } = params
  const attrs = shallowRef({})
  const allExcludeKeys = excludeKeys.concat(excludeDefaultKeys ? DEFAULT_EXCLUDE_KEYS : [])

  // Since attrs are not reactive, make it reactive instead of doing in `onUpdated` hook for better performance
  instance.attrs = reactive(instance.attrs)

  watchEffect(() => {
    const res = entries(instance.attrs).reduce((acm, [key, val]) => {
      if (!allExcludeKeys.includes(key) && !(excludeListeners && LISTENER_PREFIX.test(key))) acm[key] = val

      return acm
    }, {} as Recordable)

    attrs.value = res
  })

  return attrs
}
