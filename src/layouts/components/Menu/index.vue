<template>
  <a-menu :mode="mode" :theme="theme" :openKeys="openKeys" :selectedKeys="selectedKeys" @openChange="onOpenChange"
    @click="onSelect">
    <template v-for="m in menu" :key="m.path">
      <SubMenu :menu="m" :key="m.path" v-if="!m.meta.isHide" />
    </template>
  </a-menu>
</template>
<script lang="ts" setup name="Menu">
import SubMenu from './SubMenu.vue'
import type { MenuMode, MenuTheme } from 'ant-design-vue'
import { getTargetPathRoute } from '@/utils/index'


const props = defineProps({
  menu: {
    type: Array as PropType<Menu.MenuOptions[]>,
    required: true
  },
  theme: {
    type: String as PropType<MenuTheme>,
    required: false,
    default: 'light'
  },
  mode: {
    type: String as PropType<MenuMode>,
    required: false,
    default: 'inline'
  },
  collapsed: {
    type: Boolean,
    required: false,
    default: false
  }
})

const emit = defineEmits(['menuSelect'])

const globalStore = useGlobalStore()

const authStore = useAuthStore()

const route = useRoute()

const authMenuList = computed(() => authStore.authMenuListGet)

const openKeys = ref<string[]>([])

const selectedKeys = ref<string[]>([route.path])

const cachedOpenKeys = ref<string[]>([])

const rootSubmenuKeys: ComputedRef<string[]> = computed(() => {
  const keys: string[] = []
  props.menu.forEach((item: Menu.MenuOptions) => keys.push(item.path))
  return keys
})

watch(
  () => openKeys.value,
  (_val, oldVal) => {
    cachedOpenKeys.value = oldVal;
  },
);

watch(
  () => props.collapsed,
  (val) => {
    openKeys.value = val ? [] : cachedOpenKeys.value
  }
)

// 主要作用:使用router.push跳转页面时更左侧新菜单选中项
watch(() => route, () => {
  updateActiveMenu()
  }, {
    deep: true
  }
)

const onOpenChange = (openKeysParams: string[]) => {
  // 水平模式时
  if (props.mode === 'horizontal') {
    openKeys.value = openKeysParams
    return
  }
  // 非水平模式时
  if (globalStore.state.accordion) {
    // 类似手风琴(目前只能打开一个菜单)
    const latestOpenKey: string = openKeysParams.find((key) => !openKeys.value.includes(key))
    if (!rootSubmenuKeys.value.includes(latestOpenKey)) {
      openKeys.value = openKeysParams
    } else {
      openKeys.value = latestOpenKey ? [latestOpenKey] : []
    }
  } else {
    // 全部打开菜单
    openKeys.value = openKeysParams
  }
}

const onSelect = ({ item, key, keyPath }) => {
  selectedKeys.value = keyPath
  emit('menuSelect', { item, key, selectedKeys: selectedKeys.value })
}

const updateActiveMenu = () => {
  const routes = route.matched.concat()

  const isHaveParams = routes[routes.length - 1].path.indexOf('/:') > 0

  const pathRoute = getTargetPathRoute(authMenuList.value, isHaveParams ? routes[routes.length - 1].path : route.path)

  const { isHide } = route.meta
  if (isHide && route.meta.activeMenu) {
    selectedKeys.value = [route.meta.activeMenu as string]
  } else {
    selectedKeys.value = [routes[routes.length - 1].path]
  }

  let openKeysArr: string[] = []
  if (props.mode === 'inline') {
    if(isHide && route.meta.activeMenu) {
      const newArr = pathRoute.slice(0, -1);
      newArr.push(route.meta.activeMenu as string);
      openKeysArr = newArr
    } else {
      openKeysArr = pathRoute
    }
  }

  props.collapsed ? (cachedOpenKeys.value = openKeysArr) : (openKeys.value = openKeysArr)
}

onMounted(() => {
  updateActiveMenu()
})
</script>
<style lang="less" scoped>
::v-deep(.ant-menu) {
  min-height: 100% !important;
}
</style>
