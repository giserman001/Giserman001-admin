<script lang="ts" setup name="Saturation">
import { DOMUtils } from '@aesoper/normal-utils'

const props = defineProps({
  hue: {
    type: Number,
    default: 0,
    validator: (value: number) => {
      return value >= 0 && value <= 360
    },
  },
  saturation: {
    type: Number,
    default: 0,
    validator: (value: number) => {
      return value >= 0 && value <= 1
    },
  },
  value: {
    type: Number,
    default: 0,
    validator: (value: number) => {
      return value >= 0 && value <= 1
    },
  },
  round: Boolean,
  hidden: Boolean,
})
const emit = defineEmits(['update:saturation', 'update:value', 'change'])
function clamp(value: number, min: number, max: number) {
  return min < max ? (value < min ? min : value > max ? max : value) : value < max ? max : value > min ? min : value
}
// instance
const instance = getCurrentInstance()
// data
const cursorTop = ref(0)
const cursorLeft = ref(0)
const background = ref(`hsl(${props.hue}, 100%, 50%)`)
const currentHsv = reactive({
  h: props.hue,
  s: props.saturation,
  v: props.value,
})

function updatePosition() {
  if (instance) {
    const el = instance.vnode.el
    cursorLeft.value = currentHsv.s * el?.clientWidth
    cursorTop.value = (1 - currentHsv.v) * el?.clientHeight
  }
}

function handleDrag(event: MouseEvent) {
  if (instance) {
    const el = instance.vnode.el
    const rect = el?.getBoundingClientRect()

    let left = event.clientX - rect.left
    let top = event.clientY - rect.top

    left = clamp(left, 0, rect.width)
    top = clamp(top, 0, rect.height)

    const saturation = Math.round((left / rect.width) * 100) / 100
    const bright = Math.round(clamp(-(top / rect.height) + 1, 0, 1) * 100) / 100

    cursorLeft.value = left
    cursorTop.value = top

    currentHsv.s = saturation
    currentHsv.v = bright

    emit('update:saturation', saturation)
    emit('update:value', bright)
    emit('change', saturation, bright)
  }
}

onMounted(() => {
  if (instance && instance.vnode.el) {
    DOMUtils.triggerDragEvent(instance.vnode.el as HTMLElement, {
      drag: (event: Event) => {
        handleDrag(event as MouseEvent)
      },
      end: (event) => {
        handleDrag(event as MouseEvent)
      },
    })

    updatePosition()
  }
})

// watch
watch(
  () => props.hue,
  (hue: number) => {
    currentHsv.h = hue
    background.value = `hsl(${Math.round(currentHsv.h)}, 100%, 50%)`
  },
)

watch(
  () => props.value,
  (value: number) => {
    currentHsv.v = value
    updatePosition()
  },
)

watch(
  () => props.saturation,
  (saturation: number) => {
    currentHsv.s = saturation
    updatePosition()
  },
)
</script>

<template>
  <div
    class="bee-saturation"
    :class="{
      'bee-saturation__chrome': round,
      'bee-saturation__hidden': hidden,
    }"
    :style="{ backgroundColor: background }"
  >
    <div class="bee-saturation__white" />
    <div class="bee-saturation__black" />
    <div
      class="bee-saturation__cursor"
      :style="{
        top: `${cursorTop}px`,
        left: `${cursorLeft}px`,
      }"
      @click="handleDrag"
    >
      <div />
    </div>
  </div>
</template>

<style lang="less" scoped>
.bee-saturation {
  position: relative;
  margin-bottom: 15px;
  width: 100%;
  height: 125px;

  &__chrome {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border-color: transparent;
  }

  &__hidden {
    overflow: hidden;
  }

  &__white,
  &__black {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  &__black {
    background: linear-gradient(0deg, #000, transparent);
  }

  &__white {
    background: linear-gradient(90deg, #fff, hsla(0, 0%, 100%, 0));
  }

  &__cursor {
    position: absolute;

    div {
      transform: translate(-5px, -5px);
      box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.37);
      width: 10px;
      height: 10px;
      border: 1px solid white;
      border-radius: 50%;
      cursor: pointer;
    }
  }
}
</style>
