<script lang="ts" setup name="App">
import { Modal, theme } from 'ant-design-vue'
import zh_CN from 'ant-design-vue/es/locale/zh_CN'
import LockScreen from '@/layouts/components/LockScreen/index.vue'

const globalStore = useGlobalStore()

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
</template>

<style></style>
