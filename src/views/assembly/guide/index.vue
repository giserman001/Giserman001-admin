<template>
  <a-card ly-h-full>
    <div ly-flex ly-flex-col ly-items-center>
      <span class="ly-text-size-[23px] ly-font-bold" ly-m="[20px_0px_30px]">引导页 🍇🍇🍇🍓🍓🍓</span>
      <a-alert message="引导页对于一些第一次进入项目的人很有用，你可以简单介绍下项目的功能。本 Demo 是基于 driver.js." type="success" :closable="false" />
      <a-button ly-mt="20px" type="primary" @click.prevent.stop="driverObj.drive()"> 打开引导页 🤹‍♂️ </a-button>
    </div>
  </a-card>
</template>

<script setup lang="ts" name="guide">
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const driverObj = driver({
  allowClose: true,
  doneBtnText: "结束",
  nextBtnText: "下一步",
  prevBtnText: "上一步",
  steps: [
    {
      element: "#collapseIcon",
      popover: {
        title: "Collapse Icon",
        description: "Open && Close sidebar",
        side: "right"
      }
    },
    {
      element: "#breadcrumb",
      popover: {
        title: "Breadcrumb",
        description: "Indicate the current page location",
        side: "right"
      }
    },
    {
      element: "#themeSetting",
      popover: {
        title: "Setting theme",
        description: "Customize settings theme",
        side: "left"
      }
    },
    {
      element: "#message",
      popover: {
        title: "Message Notification",
        description: "Can receive company information",
        side: "left"
      }
    },
    {
      element: "#fullscreen",
      popover: {
        title: "Full Screen",
        description: "Full Screen, Exit The Full Screen Page",
        side: "left"
      }
    }
  ]
});
</script>

<style scoped lang="less"></style>
