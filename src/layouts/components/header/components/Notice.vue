<script lang="ts" setup name="HeaderNotice">
import { BellOutlined } from '@ant-design/icons-vue'

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
  <div>
    <a-popover
      v-model:open="visible" trigger="click" placement="bottomRight" :get-popup-container="getPopupContainer"
      :overlay-style="{ width: '300px', top: '50px' }"
    >
      <template #content>
        <a-spin :spinning="loading">
          <a-tabs>
            <a-tab-pane key="1" tab="通知">
              <a-list>
                <a-list-item>
                  <a-list-item-meta title="你收到了 14 份新周报" description="一年前">
                    <template #avatar>
                      <a-avatar
                        style="background-color: white"
                        src="https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png"
                      />
                    </template>
                  </a-list-item-meta>
                </a-list-item>
                <a-list-item>
                  <a-list-item-meta title="你推荐的 曲妮妮 已通过第三轮面试" description="一年前">
                    <template #avatar>
                      <a-avatar
                        style="background-color: white"
                        src="https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png"
                      />
                    </template>
                  </a-list-item-meta>
                </a-list-item>
                <a-list-item>
                  <a-list-item-meta title="这种模板可以区分多种通知类型" description="一年前">
                    <template #avatar>
                      <a-avatar
                        style="background-color: white"
                        src="https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png"
                      />
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
      <span ref="noticeRef" @click="fetchNotice">
        <a-badge count="12">
          <BellOutlined ly-text="size-[18px]" ly-cursor-pointer />
        </a-badge>
      </span>
    </a-popover>
  </div>
</template>

<style lang="less" scoped></style>
