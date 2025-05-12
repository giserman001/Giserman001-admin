<template>
  <a-dropdown>
    <span class="ly-flex ly-items-center ly-gap-[6px]">
      <a-avatar class="avatar" :src="userInfo.avatar" />
      <span class="nickname">{{ userInfo.name }}</span>
    </span>
    <template #overlay>
      <a-menu>
        <a-menu-item v-for="menu in menus" :key="menu.id" @click="clickMenu(menu)">
          <div ly-flex ly-items-center ly-gap="[2px]">
            <component :is="menu.iconComponent"></component>
            <span>{{ menu.name }}</span>
          </div>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script lang="ts" setup name="User">
import { LogoutOutlined, LockOutlined } from '@ant-design/icons-vue'
import { Modal } from 'ant-design-vue'
import { LOGIN_URL } from "@/config";
import { logoutApi } from "@/api/modules/login";
import { message } from 'ant-design-vue'

const router = useRouter()

const userStore = useUserStore()

const userInfo = computed(() => userStore.state.userInfo)

const menus = ref([{
  id: 1,
  name: '锁定屏幕',
  iconComponent: LockOutlined
}, {
  id: 2,
  name: '退出登录',
  iconComponent: LogoutOutlined
}])

// 退出登录
const handleLogout = () => {
  Modal.confirm({
    title: '提示',
    content: '真的要注销登录吗 ?',
    onOk: async () => {
      // 1.执行退出登录接口
      await logoutApi();

      // 2.清除 Token
      userStore.setToken("");

      // 3.重定向到登陆页
      router.replace(LOGIN_URL);
      message.success("退出登录成功！");
    },
    onCancel() { }
  })
}

const onLockScreen = () => {
  systemConfig.commit('SET_LOCK_SCREEN', true)
}

function clickMenu(menu) {
  const actionMap = {
    1: onLockScreen,
    2: handleLogout
  }
  actionMap[menu.id]()
}
</script>
<style scoped lang="less"></style>