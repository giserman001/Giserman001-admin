<template>
  <div class="breadcrumb">
    <a-breadcrumb>
      <a-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="item.path"
        @click="onBreadcrumbClick(item, index)">
        <SvgIcon :name="item.meta.icon" width="16px" height="16px" ly-mr="2px!"
          v-if="item.meta.icon && globalStore.state.breadcrumbIcon" />
        <span :class="breadcrumbList.length - 1 !== index ? 'ly-cursor-pointer' : ''">{{ item.meta.title }}</span>
      </a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { HOME_URL } from "@/config";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const globalStore = useGlobalStore();

const breadcrumbList = computed(() => {
  let breadcrumbData = authStore.breadcrumbListGet[route.matched[route.matched.length - 1].path] ?? [];
  // 🙅‍♀️不需要首页面包屑可删除以下判断
  if (breadcrumbData[0].path !== HOME_URL) {
    breadcrumbData = [{ path: HOME_URL, meta: { icon: "bx-analyse", title: "首页" } }, ...breadcrumbData];
  }
  return breadcrumbData;
});

// Click Breadcrumb
const onBreadcrumbClick = (item: Menu.MenuOptions, index: number) => {
  if (index !== breadcrumbList.value.length - 1) router.push(item.path);
};
</script>

<style lang="less" scoped>
.breadcrumb {
  ::v-deep(.ant-breadcrumb-link svg) {
    vertical-align: middle;
  }

  ::v-deep(.ant-breadcrumb-link span) {
    vertical-align: middle;
  }
}
</style>