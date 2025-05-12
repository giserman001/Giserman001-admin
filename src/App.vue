<template>
  <a-config-provider
    :locale="lang[locale]"
    :theme="{
      token: {
        colorPrimary: globalStore.state.primary,
        borderRadius: 2
      },
      algorithm: !globalStore.state.isDark ? theme.defaultAlgorithm : theme.darkAlgorithm
    }"
  >
    <!-- <StyleProvider hash-priority="high">
      <router-view />
    </StyleProvider> -->
    <router-view />
  </a-config-provider>
  <LockScreen />
</template>

<script lang="ts" setup name="App">
import zh_CN from 'ant-design-vue/es/locale/zh_CN'
import en_US from 'ant-design-vue/es/locale/en_US'
import LockScreen from '@/layouts/components/LockScreen/index.vue'
// import emitter from '@/utils/eventBus'
import { Modal } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
// import { StyleProvider } from 'ant-design-vue';
import { theme } from 'ant-design-vue';

const globalStore = useGlobalStore()

const { locale } = useI18n()

const lang = { 'en-US': en_US, 'zh-CN': zh_CN }


//全局错误处理
onErrorCaptured((err, instance, info) => {
  if (window.env !== 'localhost') {
    console.log(err, instance, info)
    Modal.error({
      title: 'System Error',
      content: h('pre', err.stack),
      class: 'errorCapturedModal',
      width: '60%'
    })
  }
})
</script>

<style></style>
