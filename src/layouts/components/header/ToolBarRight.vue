<template>
  <div ly-px="[15px]" ly-flex ly-items-center ly-gap="[20px]">
    <Zoom id="fullscreen" />
    <Refresh v-bind="$attrs" />
    <SystemSetting id="themeSetting" />
    <Language />
    <Notice id="message" />
    <User />
  </div>
</template>

<script setup lang="ts">
import Notice from './components/Notice.vue'
import Language from './components/Language.vue'
import User from './components/User.vue'
import SystemSetting from './components/SystemSetting.vue'
import Zoom from './components/Zoom.vue'
import Refresh from './components/Refresh.vue'
</script>

<style scoped></style>
