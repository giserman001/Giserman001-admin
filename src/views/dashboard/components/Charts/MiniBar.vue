<script lang="ts" setup name="MiniBar">
import { Column } from '@antv/g2plot'
import dayjs from 'dayjs'

const props = defineProps(['id'])
const data: any = []
const beginDay = new Date().getTime()

for (let i = 0; i < 10; i++) {
  data.push({
    x: dayjs(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: Math.round((Math.random() + 0.1) * 10),
  })
}
onMounted(() => {
  const columnPlot = new Column(props.id, {
    data,
    xField: 'x',
    yField: 'y',
    yAxis: false,
    xAxis: {
      range: [0.038, 1],
      label: null,
    },
    height: 50,
    color: '#38A0FF',
  })
  columnPlot.render()
})
</script>

<template>
  <div class="antv-chart-mini" style="margin-bottom: -10px">
    <div class="chart-wrapper" :style="{ height: 46 }">
      <div :id="id" />
    </div>
  </div>
</template>

<style lang="less" scoped></style>
