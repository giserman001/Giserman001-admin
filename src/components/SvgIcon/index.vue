<script lang="ts" setup name="SvgIcon">
// 注意svg文件的<svg> 标签上必须有 fill="currentColor" 字段,这样才能从外部的span等标签复制颜色,否则颜色不可变

const props = defineProps({
  prefix: {
    type: String,
    default: 'icon',
  },
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: '',
  },
  width: {
    type: String,
    default: '20px',
  },
  height: {
    type: String,
    default: '20px',
  },
})
const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>

<template>
  <svg aria-hidden="true" :width="width" :height="height" :style="{ color }">
    <use :xlink:href="symbolId" />
  </svg>
</template>
