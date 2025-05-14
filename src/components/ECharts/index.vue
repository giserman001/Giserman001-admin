<script setup lang="ts" name="ECharts">
import type { ECElementEvent, EChartsType } from 'echarts/core'
import type { ECOption } from './config'
import { useDebounceFn } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { computed, markRaw, nextTick, onActivated, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useGlobalStore } from '@/store/modules/global'
import echarts from './config'

interface Props {
  option: ECOption
  renderer?: 'canvas' | 'svg'
  resize?: boolean
  theme?: object | string
  width?: number | string
  height?: number | string
  onClick?: (event: ECElementEvent) => any
}

const props = withDefaults(defineProps<Props>(), {
  renderer: 'canvas',
  resize: true,
})

const echartsStyle = computed(() => {
  return props.width || props.height
    ? { height: `${props.height}px`, width: `${props.width}px` }
    : { height: '100%', width: '100%' }
})

const chartRef = ref<HTMLDivElement | HTMLCanvasElement>()
const chartInstance = ref<EChartsType>()

function draw() {
  if (chartInstance.value) {
    chartInstance.value.setOption(props.option, { notMerge: true })
  }
}

watch(props, () => {
  draw()
})

const handleClick = (event: ECElementEvent) => props.onClick && props.onClick(event)

function init() {
  if (!chartRef.value)
    return
  chartInstance.value = echarts.getInstanceByDom(chartRef.value)

  if (!chartInstance.value) {
    chartInstance.value = markRaw(
      echarts.init(chartRef.value, props.theme, {
        renderer: props.renderer,
      }),
    )
    chartInstance.value.on('click', handleClick)
    draw()
  }
}

function resize() {
  if (chartInstance.value && props.resize) {
    chartInstance.value.resize({ animation: { duration: 300 } })
  }
}

const debouncedResize = useDebounceFn(resize, 300, { maxWait: 800 })

const globalStore = useGlobalStore()
const { state } = storeToRefs(globalStore)

watch(
  () => [state.value.maximize, state.value.isCollapse, state.value.tabs, state.value.footer],
  () => {
    debouncedResize()
  },
  { deep: true },
)

onMounted(() => {
  nextTick(() => init())
  window.addEventListener('resize', debouncedResize)
})

onActivated(() => {
  if (chartInstance.value) {
    chartInstance.value.resize()
  }
})

onBeforeUnmount(() => {
  chartInstance.value?.dispose()
  window.removeEventListener('resize', debouncedResize)
})

defineExpose({
  getInstance: () => chartInstance.value,
  resize,
  draw,
})
</script>

<template>
  <div id="echarts" ref="chartRef" :style="echartsStyle" />
</template>
