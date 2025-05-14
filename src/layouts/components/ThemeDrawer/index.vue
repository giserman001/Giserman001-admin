<script setup lang="ts">
import { BgColorsOutlined, CheckCircleOutlined, CheckOutlined, CodepenOutlined, SettingOutlined } from '@ant-design/icons-vue'
import { storeToRefs } from 'pinia'
import { emitter, getColor } from './index'

const globalStore = useGlobalStore()

const { state } = storeToRefs(globalStore)

const colorList = computed(() => getColor())

// 打开主题设置
const drawerVisible = ref(false)

emitter.on('openThemeDrawer', () => {
  drawerVisible.value = true
})

// 设置布局方式
function setLayout(val: LayoutType) {
  globalStore.setGlobalState('layout', val)
}

// function setAsideTheme(checked: boolean) {
//   globalStore.setGlobalState('asideInverted', checked)
// }

// function setHeadTheme(checked: boolean) {
//   globalStore.setGlobalState('headerInverted', checked)
// }

function changeColor(color: string) {
  globalStore.setGlobalState('primary', color)
}

// 灰色和弱色切换
function changeGreyOrWeak(type: GreyOrWeakType, value: boolean) {
  const body = document.body as HTMLElement
  if (!value)
    return body.removeAttribute('style')
  const styles: Record<GreyOrWeakType, string> = {
    grey: 'filter: grayscale(1)',
    weak: 'filter: invert(80%)',
  }
  body.setAttribute('style', styles[type])
  const propName = type === 'grey' ? 'isWeak' : 'isGrey'
  globalStore.setGlobalState(propName, false)
}

onMounted(() => {
  // init 主题
  if (state.value.isGrey)
    changeGreyOrWeak('grey', true)
  if (state.value.isWeak)
    changeGreyOrWeak('weak', true)
})
</script>

<template>
  <a-drawer v-model:open="drawerVisible" width="300" placement="right" title="布局设置" closable>
    <div ly-flex ly-flex-col ly-gap="25px">
      <a-divider class="ly-m-0!">
        <CodepenOutlined /> 布局样式
      </a-divider>
      <div ly-flex ly-flex-col ly-gap="20px">
        <div ly-flex ly-flex-wrap ly-gap="20px">
          <a-tooltip placement="top">
            <template #title>
              <span>经典布局</span>
            </template>
            <div
              ly-gap="[4px]" ly-w="110px" ly-h="80px"
              :class="[state.layout === 'classic' ? 'ly-shadow-[0_0_0_2px_#409EFF]' : 'ly-shadow-[0_0_5px_1px_#d4d7de] hover:ly-shadow-[0_0_5px_1px_#909399]']"
              ly-p="8px" ly-rounded="6px" ly-relative ly-box-border ly-flex ly-flex-col ly-cursor-pointer
              ly-transition="all duration-[0.2s]" @click="setLayout('classic')"
            >
              <div ly-bg="#409EFF" ly-rounded="3px" ly-h="14px" />
              <div ly-flex ly-flex-1 ly-gap="[4px]">
                <div ly-bg="#a0cfff" ly-rounded="3px" ly-w="15px" />
                <div ly-border="1px dashed #409EFF" ly-flex-1 ly-rounded="3px" ly-bg="#d9ecff" />
              </div>
              <CheckCircleOutlined
                v-if="state.layout === 'classic'" ly-absolute ly-text="#409EFF"
                ly-transition="all duration-[0.2s]" ly-right="15px" ly-bottom="15px"
              />
            </div>
          </a-tooltip>
          <a-tooltip placement="top">
            <template #title>
              <span>纵向布局</span>
            </template>
            <div
              ly-gap="[4px]" ly-w="110px" ly-h="80px"
              :class="[state.layout === 'vertical' ? 'ly-shadow-[0_0_0_2px_#409EFF]' : 'ly-shadow-[0_0_5px_1px_#d4d7de] hover:ly-shadow-[0_0_5px_1px_#909399]']"
              ly-p="8px" ly-rounded="6px" ly-relative ly-box-border ly-flex ly-cursor-pointer
              ly-transition="all duration-[0.2s]" @click="setLayout('vertical')"
            >
              <div ly-bg="#409EFF" ly-rounded="3px" ly-w="15px" />
              <div ly-flex ly-flex-1 ly-flex-col ly-gap="[4px]">
                <div ly-bg="#a0cfff" ly-rounded="3px" ly-h="14px" />
                <div ly-border="1px dashed #409EFF" ly-flex-1 ly-rounded="3px" ly-bg="#d9ecff" />
              </div>
              <CheckCircleOutlined
                v-if="state.layout === 'vertical'" ly-absolute ly-text="#409EFF"
                ly-transition="all duration-[0.2s]" ly-right="15px" ly-bottom="15px"
              />
            </div>
          </a-tooltip>
          <a-tooltip placement="top">
            <template #title>
              <span>横向布局</span>
            </template>
            <div
              ly-gap="[4px]" ly-w="110px" ly-h="80px"
              :class="[state.layout === 'transverse' ? 'ly-shadow-[0_0_0_2px_#409EFF]' : 'ly-shadow-[0_0_5px_1px_#d4d7de] hover:ly-shadow-[0_0_5px_1px_#909399]']"
              ly-p="8px" ly-rounded="6px" ly-relative ly-box-border ly-flex ly-flex-col ly-cursor-pointer
              ly-transition="all duration-[0.2s]" @click="setLayout('transverse')"
            >
              <div ly-bg="#409EFF" ly-rounded="3px" ly-h="15px" />
              <div ly-border="1px dashed #409EFF" ly-flex-1 ly-rounded="3px" ly-bg="#d9ecff" />
              <CheckCircleOutlined
                v-if="state.layout === 'transverse'" ly-absolute ly-text="#409EFF"
                ly-transition="all duration-[0.2s]" ly-right="15px" ly-bottom="15px"
              />
            </div>
          </a-tooltip>
          <a-tooltip placement="top">
            <template #title>
              <span>分栏布局</span>
            </template>
            <div
              ly-gap="[4px]" ly-w="110px" ly-h="80px"
              :class="[state.layout === 'columns' ? 'ly-shadow-[0_0_0_2px_#409EFF]' : 'ly-shadow-[0_0_5px_1px_#d4d7de] hover:ly-shadow-[0_0_5px_1px_#909399]']"
              ly-p="8px" ly-rounded="6px" ly-relative ly-box-border ly-flex ly-cursor-pointer
              ly-transition="all duration-[0.2s]" @click="setLayout('columns')"
            >
              <div ly-bg="#409EFF" ly-rounded="3px" ly-w="14px" />
              <div ly-bg="#a0cfff" ly-rounded="3px" ly-w="15px" />
              <div ly-border="1px dashed #409EFF" ly-flex-1 ly-rounded="3px" ly-bg="#d9ecff" />
              <CheckCircleOutlined
                v-if="state.layout === 'columns'" ly-absolute ly-text="#409EFF"
                ly-transition="all duration-[0.2s]" ly-right="15px" ly-bottom="15px"
              />
            </div>
          </a-tooltip>
        </div>
        <!-- <div ly-flex ly-flex-col ly-gap="10px">
          <div ly-flex ly-items-center ly-justify-between>
            <div>
              侧边栏反转色
              <a-tooltip placement="top">
                <template #title>侧边栏颜色变为深色模式</template>
                <QuestionCircleOutlined />
              </a-tooltip>
            </div>
            <a-switch :checked="state.asideInverted" :disabled="state.layout === 'transverse'"
              @change="setAsideTheme" />
          </div>
          <div ly-flex ly-items-center ly-justify-between>
            <div>
              头部反转色
              <a-tooltip placement="top">
                <template #title>头部颜色变为深色模式</template>
                <QuestionCircleOutlined />
              </a-tooltip>
            </div>
            <a-switch :checked="state.headerInverted" @change="setHeadTheme" />
          </div>
        </div> -->
      </div>
      <a-divider class="ly-m-0!">
        <BgColorsOutlined /> 全局主题
      </a-divider>
      <div ly-flex ly-flex-col ly-gap="20px">
        <div ly-flex ly-flex-col ly-gap="10px">
          <span>主题颜色</span>
          <div ly-flex ly-items-center>
            <a-tooltip v-for="(item, index) in colorList" :key="index">
              <template #title>{{ item.key }}</template>
              <a-tag
                :color="item.color" class="ly-h-[20px] ly-w-[20px] ly-flex ly-items-center ly-justify-center"
                @click="changeColor(item.color)"
              >
                <CheckOutlined v-if="item.color === state.primary" />
              </a-tag>
            </a-tooltip>
          </div>
        </div>
        <!-- <div ly-flex ly-items-center ly-justify-between>
          <div>暗黑模式</div>
          <a-switch v-model:checked="state.isDark" />
        </div> -->
        <div ly-flex ly-items-center ly-justify-between>
          <div>灰色模式</div>
          <a-switch v-model:checked="state.isGrey" @change="(check) => changeGreyOrWeak('grey', check)" />
        </div>
        <div ly-flex ly-items-center ly-justify-between>
          <div>色弱模式</div>
          <a-switch v-model:checked="state.isWeak" @change="(check) => changeGreyOrWeak('weak', check)" />
        </div>
      </div>
      <a-divider class="ly-m-0!">
        <SettingOutlined /> 界面设置
      </a-divider>
      <div ly-flex ly-flex-col ly-gap="20px">
        <div ly-flex ly-items-center ly-justify-between>
          <div>菜单折叠</div>
          <a-switch v-model:checked="state.isCollapse" :disabled="state.layout === 'transverse'" />
        </div>
        <div ly-flex ly-items-center ly-justify-between>
          <div>菜单手风琴</div>
          <a-switch v-model:checked="state.accordion" :disabled="state.layout === 'transverse'" />
        </div>
        <div ly-flex ly-items-center ly-justify-between>
          <div>面包屑</div>
          <a-switch v-model:checked="state.breadcrumb" />
        </div>
        <div ly-flex ly-items-center ly-justify-between>
          <div>面包屑图标</div>
          <a-switch v-model:checked="state.breadcrumbIcon" />
        </div>
        <div ly-flex ly-items-center ly-justify-between>
          <div>标签栏</div>
          <a-switch v-model:checked="state.tabs" />
        </div>
        <div ly-flex ly-items-center ly-justify-between>
          <div>标签栏图标</div>
          <a-switch v-model:checked="state.tabsIcon" />
        </div>
        <div ly-flex ly-items-center ly-justify-between>
          <div>页脚</div>
          <a-switch v-model:checked="state.footer" />
        </div>
      </div>
    </div>
  </a-drawer>
</template>

<style lang="less" scoped></style>
