<script setup lang="ts" name="dataScreen">
import dayjs from 'dayjs'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { HOME_URL } from '@/config'
import AgeRatioChart from './components/AgeRatioChart.vue'
import AnnualUseChart from './components/AnnualUseChart.vue'
import ChinaMapChart from './components/ChinaMapChart.vue'
import HotPlateChart from './components/HotPlateChart.vue'
import MaleFemaleRatioChart from './components/MaleFemaleRatioChart.vue'
import OverNext30Chart from './components/OverNext30Chart.vue'
import PlatformSourceChart from './components/PlatformSourceChart.vue'
import RealTimeAccessChart from './components/RealTimeAccessChart.vue'

const router = useRouter()
const dataScreenRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (dataScreenRef.value) {
    dataScreenRef.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`
    dataScreenRef.value.style.width = `1920px`
    dataScreenRef.value.style.height = `1080px`
  }
  window.addEventListener('resize', resize)
})

// 设置响应式
function resize() {
  if (dataScreenRef.value) {
    dataScreenRef.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`
  }
}

// 根据浏览器大小推断缩放比例
function getScale(width = 1920, height = 1080) {
  const ww = window.innerWidth / width
  const wh = window.innerHeight / height
  return ww < wh ? ww : wh
}

// 获取当前时间
let timer: NodeJS.Timer | null = null
const time = ref<string>(dayjs().format('YYYY年MM月DD HH:mm:ss'))
timer = setInterval(() => {
  time.value = dayjs().format('YYYY年MM月DD HH:mm:ss')
}, 1000)

onBeforeUnmount(() => {
  window.removeEventListener('resize', resize)
  clearInterval(timer as unknown as number)
})
</script>

<template>
  <div class="dataScreen-container">
    <div ref="dataScreenRef" class="dataScreen-content">
      <div class="dataScreen-header">
        <div class="header-lf">
          <span class="header-screening" @click="router.push(HOME_URL)">首页</span>
        </div>
        <div class="header-ct">
          <div class="header-ct-title">
            <span>智慧旅游可视化大数据展示平台</span>
            <div class="header-ct-warning">平台高峰预警信息（2条）</div>
          </div>
        </div>
        <div class="header-ri">
          <span class="header-download">统计报告</span>
          <span class="header-time">当前时间：{{ time }}</span>
        </div>
      </div>
      <div class="dataScreen-main">
        <div class="dataScreen-lf">
          <div class="dataScreen-top">
            <div class="dataScreen-main-title">
              <span>实时游客统计</span>
              <img src="./images/dataScreen-title.png" alt="">
            </div>
            <div class="dataScreen-main-chart">
              <RealTimeAccessChart />
            </div>
          </div>
          <div class="dataScreen-center">
            <div class="dataScreen-main-title">
              <span>男女比例</span>
              <img src="./images/dataScreen-title.png" alt="">
            </div>
            <div class="dataScreen-main-chart">
              <MaleFemaleRatioChart />
            </div>
          </div>
          <div class="dataScreen-bottom">
            <div class="dataScreen-main-title">
              <span>年龄比例</span>
              <img src="./images/dataScreen-title.png" alt="">
            </div>
            <div class="dataScreen-main-chart">
              <AgeRatioChart />
            </div>
          </div>
        </div>
        <div class="dataScreen-ct">
          <div class="dataScreen-map">
            <div class="dataScreen-map-title">景区实时客流量</div>
            <ChinaMapChart />
          </div>
          <div class="dataScreen-cb">
            <div class="dataScreen-main-title">
              <span>未来30天游客量趋势图</span>
              <img src="./images/dataScreen-title.png" alt="">
            </div>
            <div class="dataScreen-main-chart">
              <OverNext30Chart />
            </div>
          </div>
        </div>
        <div class="dataScreen-rg">
          <div class="dataScreen-top">
            <div class="dataScreen-main-title">
              <span>热门景区排行</span>
              <img src="./images/dataScreen-title.png" alt="">
            </div>
            <div class="dataScreen-main-chart">
              <HotPlateChart />
            </div>
          </div>
          <div class="dataScreen-center">
            <div class="dataScreen-main-title">
              <span>年度游客量对比</span>
              <img src="./images/dataScreen-title.png" alt="">
            </div>
            <div class="dataScreen-main-chart">
              <AnnualUseChart />
            </div>
          </div>
          <div class="dataScreen-bottom">
            <div class="dataScreen-main-title">
              <span>预约渠道数据统计</span>
              <img src="./images/dataScreen-title.png" alt="">
            </div>
            <div class="dataScreen-main-chart">
              <PlatformSourceChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import './index.less';
</style>
