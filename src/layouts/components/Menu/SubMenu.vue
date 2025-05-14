<script lang="ts" setup name="SubMenu">
import SvgIcon from '@/components/SvgIcon/index.vue'

defineProps(['menu'])

const router = useRouter()

function handleClickMenu(subItem: Menu.MenuOptions) {
  if (subItem.meta.isLink)
    return window.open(subItem.meta.isLink, subItem.meta.blank ? '_blank' : '')
  router.push(subItem.path)
}
</script>

<template>
  <a-sub-menu v-if="menu.children && menu.children.length" :key="menu.path">
    <template #icon>
      <SvgIcon v-if="menu.meta.icon" :name="menu.meta.icon" />
    </template>
    <template #title>{{ menu.meta.title }}</template>
    <template v-for="sub in menu.children" :key="sub.path">
      <SubMenu :menu="sub" />
    </template>
  </a-sub-menu>
  <a-menu-item v-else-if="!menu.meta.hidden" :key="`${menu.path}`" @click="handleClickMenu(menu)">
    <template v-if="menu.meta.icon" #icon>
      <SvgIcon :name="menu.meta.icon" />
    </template>
    <span>{{ menu.meta.title }}</span>
  </a-menu-item>
</template>

<style lang="less" scoped></style>
