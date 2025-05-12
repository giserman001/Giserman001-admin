import type { WatchOptions, WatchSource } from 'vue'

export function watchAsync<T>(asyncCallback: () => Promise<T>, initialValue?: T, watchSources?: WatchSource | WatchSource[], watchOptions: WatchOptions = { immediate: true, deep: true }) {
  const ret = ref(initialValue) as Ref<T>

  const handler = () => {
    asyncCallback().then(r => (ret.value = r ?? initialValue!))
  }

  watchSources ? watch(watchSources, handler, watchOptions) : handler()

  return ret
}
