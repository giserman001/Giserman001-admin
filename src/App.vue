<script lang="ts" setup name="App">
import type { NotificationPlacement } from 'ant-design-vue'
import { Modal, notification, theme } from 'ant-design-vue'
import zh_CN from 'ant-design-vue/es/locale/zh_CN'
import LockScreen from '@/layouts/components/LockScreen/index.vue'

const globalStore = useGlobalStore()

const [api, contextHolder] = notification.useNotification()

// 全局错误处理
onErrorCaptured((err, instance, info) => {
  if (window.env !== 'localhost') {
    console.log(err, instance, info)
    Modal.error({
      title: '系统错误',
      content: h('pre', err.stack),
      width: '60%',
    })
  }
})
function openNotification(placement: NotificationPlacement) {
  api.warning({
    message: `通知`,
    description:
      '系统所有数据仅演示，操作后不生效',
    placement,
  })
}
onMounted(() => {
  openNotification('topRight')
})
</script>

<template>
  <a-config-provider
    :locale="zh_CN"
    :theme="{
      token: {
        colorPrimary: globalStore.state.primary,
      },
      algorithm: !globalStore.state.isDark ? theme.defaultAlgorithm : theme.darkAlgorithm,
    }"
  >
    <router-view />
  </a-config-provider>
  <LockScreen />
  <contextHolder />
</template>

<style></style>
