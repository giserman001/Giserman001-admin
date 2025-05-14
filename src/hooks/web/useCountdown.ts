import type { MaybeRef } from 'vue'

interface CountdownParams {
  enable?: MaybeRef<boolean>
  seconds?: number
}

export function useCountDown({ enable = true, seconds = 0 }: CountdownParams) {
  const time = ref(0)

  let timer: NodeJS.Timeout

  watch(
    () => unref(enable),
    () => {
      if (unref(enable)) {
        time.value = unref(seconds)
        timer = setInterval(() => {
          time.value -= 1
          if (time.value <= 0) {
            clearInterval(timer)
          }
        }, 1000)
      }
      else {
        clearInterval(timer)
        time.value = 0
      }
    },
  )

  return { time }
}
