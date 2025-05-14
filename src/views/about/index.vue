<script setup lang="ts" name="about">
const { pkg, lastBuildTime } = __APP_INFO__
const { dependencies, devDependencies, version } = pkg
console.log(dependencies, devDependencies, version)
</script>

<template>
  <div ly-flex="~ col" ly-gap="[15px]">
    <a-card title="简介" hoverable>
      <a type="primary" href="https://docs.spicyboy.cn" target="_blank">Giserman001-Admin</a>
      一款基于 Vue3.5、TypeScript、Vite6、Pinia、Ant Design Vue 开源的后台管理框架，使用目前最新技术栈开发。项目提供强大的
      <a type="primary" href="https://juejin.cn/post/7166068828202336263" target="_blank">ProTable 组件</a>
      在一定程度上提高您的开发效率。另外本项目还封装了一些常用组件、Hooks、指令、动态路由、按钮级别权限控制等功能。
    </a-card>
    <a-card title="项目信息" hoverable>
      <a-descriptions :column="2" bordered>
        <a-descriptions-item label="版本号" label-align="left">
          <a-tag>{{ version }}</a-tag>
        </a-descriptions-item>
        <a-descriptions-item label="发布时间" label-align="left">
          <a-tag>{{ lastBuildTime }}</a-tag>
        </a-descriptions-item>
        <a-descriptions-item label="Gitee" label-align="left">
          <a type="primary" href="https://gitee.com/HalseySpicy/Geeker-Admin" target="_blank"> Gitee </a>
        </a-descriptions-item>
        <a-descriptions-item label="Github" label-align="left">
          <a type="primary" href="https://github.com/HalseySpicy/Geeker-Admin" target="_blank"> Github </a>
        </a-descriptions-item>
        <a-descriptions-item label="文档地址" label-align="left">
          <a type="primary" href="https://docs.spicyboy.cn" target="_blank"> 文档地址 </a>
        </a-descriptions-item>
        <a-descriptions-item label="预览地址" label-align="left">
          <a type="primary" href="https://admin.spicyboy.cn" target="_blank"> 预览地址 </a>
        </a-descriptions-item>
      </a-descriptions>
    </a-card>
    <a-card title="生产环境依赖" hoverable>
      <a-descriptions :column="3" bordered>
        <a-descriptions-item v-for="(value, key) in dependencies" :key="key" width="400px" :label="key">
          <a-tag color="blue">
            {{ value }}
          </a-tag>
        </a-descriptions-item>
      </a-descriptions>
    </a-card>
    <a-card title="开发环境依赖" hoverable>
      <a-descriptions :column="3" bordered>
        <a-descriptions-item v-for="(value, key) in devDependencies" :key="key" width="400px" :label="key">
          <a-tag>
            {{ value }}
          </a-tag>
        </a-descriptions-item>
      </a-descriptions>
    </a-card>
  </div>
</template>

<style lang="less" scoped>

</style>
