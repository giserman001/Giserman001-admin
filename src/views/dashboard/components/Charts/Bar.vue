<script lang="ts" setup name="Bar">
import { Column } from '@antv/g2plot'

const props = defineProps({
  id: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  data: {
    default: () => {
      return []
    },
  },
})
onMounted(() => {
  const columnPlot = new Column(props.id, {
    data: props.data,
    xField: 'x',
    yField: 'y',
    height: 254,
    color: '#38A0FF',
    yAxis: {
      grid: {
        line: {
          style: {
            lineWidth: 0.5,
            lineDash: [4, 5],
          },
        },
      },
    },
  })
  columnPlot.render()
})
</script>

<template>
  <div :style="{ padding: '0 0 32px 32px' }">
    <h4 :style="{ marginBottom: '20px' }">{{ title }}</h4>
    <div class="chart-wrapper" :style="{ height: 254, width: '97%', margin: '25px auto 0 auto' }">
      <div :id="id" />
    </div>
  </div>
</template>
