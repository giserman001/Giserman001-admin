<script lang="ts" setup name="Analysis">
import { EllipsisOutlined, InfoCircleOutlined } from '@ant-design/icons-vue'
import dayjs from 'dayjs'
import Bar from './components/Charts/Bar.vue'
import ChartCard from './components/Charts/ChartCard.vue'
import MiniArea from './components/Charts/MiniArea.vue'
import MiniBar from './components/Charts/MiniBar.vue'
import MiniProgress from './components/Charts/MiniProgress.vue'
import MiniSmoothArea from './components/Charts/MiniSmoothArea.vue'
import Pie from './components/Charts/Pie.vue'
import RankList from './components/Charts/RankList.vue'
import Trend from './components/Charts/Trend.vue'
import NumberInfo from './components/NumberInfo/NumberInfo.vue'

// info:todo:当g2设置 {yAxis: false,smooth: true}时,会出现最高点显示不全的问题,官网示例也是如此,解决方法:设置中加padding: [5, 0, 0, 0]
// created
const loading = ref<boolean>(true)
setTimeout(() => {
  loading.value = !loading.value
}, 500)

const barData: any = []
const barData2: any = []
for (let i = 0; i < 12; i += 1) {
  barData.push({
    x: `${i + 1}月`,
    y: Math.floor(Math.random() * 1000) + 200,
  })
  barData2.push({
    x: `${i + 1}月`,
    y: Math.floor(Math.random() * 1000) + 200,
  })
}

const rankList: any = []
for (let i = 0; i < 7; i++) {
  rankList.push({
    name: `白鹭岛 ${i + 1} 号店`,
    total: 1234.56 - i * 100,
  })
}

const searchUserData: any = []
for (let i = 0; i < 7; i++) {
  searchUserData.push({
    x: dayjs().add(i, 'days').format('YYYY-MM-DD'),
    y: Math.ceil((Math.random() + 1) * 10),
  })
}
// const searchUserScale = [
//   {
//     dataKey: 'x',
//     alias: '时间',
//   },
//   {
//     dataKey: 'y',
//     alias: '用户数',
//     min: 0,
//     max: 10,
//   },
// ]

const searchData: any = []
for (let i = 0; i < 50; i += 1) {
  searchData.push({
    index: i + 1,
    keyword: `搜索关键词-${i}`,
    count: Math.floor(Math.random() * 1000),
    range: Math.floor(Math.random() * 100),
    status: Math.floor((Math.random() * 10) % 2),
  })
}

const sourceData = [
  { item: '家用电器', count: 32.2 },
  { item: '食用酒水', count: 21 },
  { item: '个护健康', count: 17 },
  { item: '服饰箱包', count: 13 },
  { item: '母婴产品', count: 9 },
  { item: '其他', count: 7.8 },
]

const searchTableColumns = computed(() => [
  {
    dataIndex: 'index',
    title: '排名',
    width: 90,
  },
  {
    dataIndex: 'keyword',
    title: '搜索关键词',
  },
  {
    dataIndex: 'count',
    title: '用户数',
  },
  {
    key: 'range',
    title: '周涨幅',
    align: 'right',
    sorter: (a, b) => a.range - b.range,
  },
])

const salesTypeRadio = ref<string>('a')
</script>

<template>
  <div>
    <a-row :gutter="24">
      <!-- 总销售额 -->
      <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
        <ChartCard :loading="loading" title="总销售额" total="￥126,560">
          <template #action>
            <a-tooltip>
              <template #title>指标说明</template>
              <InfoCircleOutlined />
            </a-tooltip>
          </template>
          <div>
            <Trend flag="up" style="margin-right: 16px" :percentage="12" :type="true">
              <template #term>
                <span>周同比</span>
              </template>
            </Trend>
            <Trend flag="down" :percentage="11">
              <template #term>
                <span>日同比</span>
              </template>
            </Trend>
          </div>
          <template #footer>
            日均销售额￥
            <span>234.56</span>
          </template>
        </ChartCard>
      </a-col>
      <!-- 访问量 -->
      <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
        <ChartCard :loading="loading" title="访问量" total="8,846">
          <template #action>
            <a-tooltip>
              <template #title>指标说明</template>
              <InfoCircleOutlined />
            </a-tooltip>
          </template>
          <MiniArea id="day-visits" />
          <template #footer>
            日访问量
            <span>{{ '1,234' }}</span>
          </template>
        </ChartCard>
      </a-col>
      <!-- 支付笔数 -->
      <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
        <ChartCard :loading="loading" title="支付笔数" total="6,560">
          <template #action>
            <a-tooltip>
              <template #title>指标说明</template>
              <InfoCircleOutlined />
            </a-tooltip>
          </template>
          <div>
            <MiniBar id="payments" />
          </div>
          <template #footer>
            转化率
            <span>60%</span>
          </template>
        </ChartCard>
      </a-col>
      <!-- 运营活动效果 -->
      <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
        <ChartCard :loading="loading" title="运营活动效果" total="78%">
          <template #action>
            <a-tooltip>
              <template #title>指标说明</template>
              <InfoCircleOutlined />
            </a-tooltip>
          </template>
          <div>
            <MiniProgress color="rgb(19, 194, 194)" :target="80" :percentage="78" height="8px" />
          </div>
          <template #footer>
            <Trend flag="down" style="margin-right: 16px" :percentage="12">
              <template #term>周同比</template>
            </Trend>
            <Trend flag="up" :percentage="80" :type="true">
              <template #term>日同比</template>
            </Trend>
          </template>
        </ChartCard>
      </a-col>
    </a-row>

    <!-- 销售额.访问量 -->
    <a-card :loading="loading" :bordered="false" :body-style="{ padding: '0' }">
      <div class="salesCard">
        <a-tabs default-active-key="1" size="large" :tab-bar-style="{ marginBottom: '24px', paddingLeft: '16px' }">
          <template #rightExtra>
            <div class="extra-wrapper">
              <div class="extra-item">
                <a>今日</a>
                <a>本周</a>
                <a>本月</a>
                <a>全年</a>
              </div>
              <a-range-picker :style="{ width: '256px' }" />
            </div>
          </template>
          <a-tab-pane key="1" loading="true" tab="销售额">
            <a-row>
              <a-col :xl="16" :lg="12" :md="12" :sm="24" :xs="24">
                <Bar id="sales" :data="barData" title="销售趋势" />
              </a-col>
              <a-col :xl="8" :lg="12" :md="12" :sm="24" :xs="24">
                <RankList title="门店销售额排名" :list="rankList" />
              </a-col>
            </a-row>
          </a-tab-pane>
          <a-tab-pane key="2" tab="访问量">
            <a-row>
              <a-col :xl="16" :lg="12" :md="12" :sm="24" :xs="24">
                <Bar id="visits" :data="barData2" title="访问量趋势" />
              </a-col>
              <a-col :xl="8" :lg="12" :md="12" :sm="24" :xs="24">
                <RankList title="门店访问量排名" :list="rankList" />
              </a-col>
            </a-row>
          </a-tab-pane>
        </a-tabs>
      </div>
    </a-card>

    <div class="antd-pro-pages-dashboard-analysis-twoColLayout desktop">
      <a-row :gutter="24" type="flex" :style="{ marginTop: '24px' }">
        <!-- 线上热门搜索 -->
        <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card :loading="loading" :bordered="false" title="线上热门搜索" :style="{ height: '100%' }">
            <template #extra>
              <a-dropdown :trigger="['click']" placement="bottomLeft">
                <a class="ant-dropdown-link" href="#">
                  <EllipsisOutlined />
                </a>
                <template #overlay>
                  <a-menu>
                    <a-menu-item>
                      <a href="javascript:;">操作一</a>
                    </a-menu-item>
                    <a-menu-item>
                      <a href="javascript:;">操作二</a>
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </template>
            <a-row :gutter="68">
              <a-col :xs="24" :sm="12" :style="{ marginBottom: ' 24px' }">
                <NumberInfo :total="12321" :sub-total="17.1">
                  <template #subtitle>
                    <span>搜索用户数</span>
                    <a-tooltip>
                      <template #title>指标说明</template>
                      <InfoCircleOutlined :style="{ marginLeft: '8px' }" />
                    </a-tooltip>
                  </template>
                </NumberInfo>
                <div>
                  <MiniSmoothArea id="search-users" :data="searchUserData" />
                </div>
              </a-col>
              <a-col :xs="24" :sm="12" :style="{ marginBottom: ' 24px' }">
                <NumberInfo :total="2.7" :sub-total="26.2" status="down">
                  <template #subtitle>
                    <span>人均搜索次数</span>
                    <a-tooltip>
                      <template #title>指标说明</template>
                      <InfoCircleOutlined :style="{ marginLeft: '8px' }" />
                    </a-tooltip>
                  </template>
                </NumberInfo>
                <div>
                  <MiniSmoothArea id="per-capita-search" :data="searchUserData" />
                </div>
              </a-col>
            </a-row>
            <div class="ant-table-wrapper">
              <a-table row-key="index" size="small" :columns="searchTableColumns as any" :data-source="searchData" :pagination="{ pageSize: 5 }">
                <template #bodyCell="{ column, text }">
                  <template v-if="column.key === 'range'">
                    <Trend :type="text.status !== 0" :percentage="text.range" />
                  </template>
                </template>
              </a-table>
            </div>
          </a-card>
        </a-col>
        <!-- 销售额类别占比 -->
        <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card class="antd-pro-pages-dashboard-analysis-salesCard" :loading="loading" :bordered="false" title="销售额类别占比" :style="{ height: '100%' }">
            <template #extra>
              <div style="height: inherit">
                <span class="dashboard-analysis-iconGroup">
                  <a-dropdown :trigger="['click']" placement="bottomLeft">
                    <EllipsisOutlined class="ant-dropdown-link" />
                    <template #overlay>
                      <a-menu>
                        <a-menu-item>
                          <a href="javascript:;">操作一</a>
                        </a-menu-item>
                        <a-menu-item>
                          <a href="javascript:;">操作二</a>
                        </a-menu-item>
                      </a-menu>
                    </template>
                  </a-dropdown>
                </span>
                <div class="analysis-salesTypeRadio">
                  <a-radio-group v-model:value="salesTypeRadio">
                    <a-radio-button value="a">全部渠道</a-radio-button>
                    <a-radio-button value="b">线上</a-radio-button>
                    <a-radio-button value="c">门店</a-radio-button>
                  </a-radio-group>
                </div>
              </div>
            </template>
            <h4>销售额</h4>
            <div>
              <div>
                <Pie id="salesPie" :data="sourceData" />
              </div>
            </div>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import '@/style/variables.less';

.extra-wrapper {
  line-height: 55px;
  padding-right: 24px;

  .extra-item {
    display: inline-block;
    margin-right: 24px;

    a {
      margin-left: 24px;
    }
  }
}

.antd-pro-pages-dashboard-analysis-twoColLayout {
  position: relative;
  display: flex;
  display: block;
  flex-flow: row wrap;
}

.antd-pro-pages-dashboard-analysis-salesCard {
  height: calc(100% - 24px);

  ::v-deep(.ant-card-head) {
    position: relative;
  }
}

.dashboard-analysis-iconGroup {
  i {
    margin-left: 16px;
    color: rgba(0, 0, 0, 0.45);
    cursor: pointer;
    transition: color 0.32s;
  }
}

.analysis-salesTypeRadio {
  position: absolute;
  right: 54px;
  bottom: 12px;
}

::v-deep(.ant-table-row) {
  color: rgba(0, 0, 0, 0.65);

  &:hover {
    background-color: #fff1f0;
  }
}

::v-deep(.ant-table-tbody) {
  & > tr.ant-table-row:hover {
    & > td {
      background-color: #fff1f0;
    }
  }
}
</style>
