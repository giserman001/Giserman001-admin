<script setup lang="ts">
import Notice from './components/Notice.vue'
import Refresh from './components/Refresh.vue'
import SystemSetting from './components/SystemSetting.vue'
import User from './components/User.vue'
import Zoom from './components/Zoom.vue'
</script>

<template>
  <div ly-px="[15px]" ly-flex ly-items-center ly-gap="[20px]">
    <Zoom id="fullscreen" />
    <Refresh v-bind="$attrs" />
    <SystemSetting id="themeSetting" />
    <Notice id="message" />
    <User />
  </div>
</template>

<style scoped></style>
