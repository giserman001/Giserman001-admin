<script lang="ts" setup name="HeaderNotice">
import { BellOutlined } from '@ant-design/icons-vue'
import { isMobile } from '@/utils/device'

const loading = ref<boolean>(false)
const visible = ref<boolean>(false)
const noticeRef = ref(null)

function fetchNotice() {
  if (!visible.value) {
    loading.value = true
    setTimeout(() => {
      loading.value = false
    }, 300)
  }
  else {
    loading.value = false
  }
}

function getPopupContainer() {
  return noticeRef.value!.parentElement
}
</script>

<template>
  <a-popover
    v-model:open="visible"
    trigger="click"
    :placement="isMobile ? 'bottom' : 'bottomRight'"
    overlay-class-name="header-notice-wrapper"
    :get-popup-container="getPopupContainer"
    :overlay-style="{ width: isMobile ? '250px' : '300px', top: '50px' }"
  >
    <template #content>
      <a-spin :spinning="loading">
        <a-tabs>
          <a-tab-pane key="1" tab="通知">
            <a-list>
              <a-list-item>
                <a-list-item-meta title="你收到了 14 份新周报" description="一年前">
                  <template #avatar>
                    <a-avatar style="background-color: white" src="https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png" />
                  </template>
                </a-list-item-meta>
              </a-list-item>
              <a-list-item>
                <a-list-item-meta title="你推荐的 曲妮妮 已通过第三轮面试" description="一年前">
                  <template #avatar>
                    <a-avatar style="background-color: white" src="https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png" />
                  </template>
                </a-list-item-meta>
              </a-list-item>
              <a-list-item>
                <a-list-item-meta title="这种模板可以区分多种通知类型" description="一年前">
                  <template #avatar>
                    <a-avatar style="background-color: white" src="https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png" />
                  </template>
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </a-tab-pane>
          <a-tab-pane key="2" tab="消息">123</a-tab-pane>
          <a-tab-pane key="3" tab="待办">123</a-tab-pane>
        </a-tabs>
      </a-spin>
    </template>
    <span ref="noticeRef" class="header-notice" style="padding: 0 18px" @click="fetchNotice">
      <a-badge count="12">
        <BellOutlined style="font-size: 16px; padding: 4px" />
      </a-badge>
    </span>
  </a-popover>
</template>

<style lang="css">
.header-notice-wrapper {
  top: 50px !important;
}
</style>

<style lang="less" scoped>
.header-notice {
  display: inline-block;
  transition: all 0.3s;

  span {
    // vertical-align: initial;
  }
}
</style>
