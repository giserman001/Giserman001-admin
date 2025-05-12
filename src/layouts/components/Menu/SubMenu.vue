<template>
  <a-sub-menu v-if="menu.children && menu.children.length" :key="menu.path">
    <template #icon>
      <SvgIcon :name="menu.meta.icon" v-if="menu.meta.icon" />
    </template>
    <template #title>{{ menu.meta.title }}</template>
    <template v-for="sub in menu.children">
      <SubMenu :menu="sub" />
    </template>
  </a-sub-menu>
  <a-menu-item :key="`${menu.path}`" v-else-if="!menu.meta.hidden" @click="handleClickMenu(menu)">
    <template v-if="menu.meta.icon" #icon>
      <SvgIcon :name="menu.meta.icon" />
    </template>
    <span>{{ menu.meta.title }}</span>
  </a-menu-item>
</template>
<script lang="ts" setup name="SubMenu">
import SvgIcon from '@/components/SvgIcon/index.vue'

defineProps(['menu'])

const router = useRouter()

const handleClickMenu = (subItem: Menu.MenuOptions) => {
  if (subItem.meta.isLink) return window.open(subItem.meta.isLink, subItem.meta.blank ? '_blank' : '')
  router.push(subItem.path)
}
</script>
<style lang="less" scoped></style>
