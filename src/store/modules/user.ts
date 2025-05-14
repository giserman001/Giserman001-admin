import type { UserState } from '@/store/interface'
import { defineStore } from 'pinia'
import piniaPersistConfig from '@/store/helper/persist'

const storeId = 'user'
export const useUserStore = defineStore(storeId, () => {
  const state = reactive<UserState>({
    token: '',
    userInfo: { name: 'giserman001', avatar: '/avatar2.jpg' },
  })

  // Set Token
  function setToken(token: string) {
    state.token = token
  }

  // Set setUserInfo
  function setUserInfo(userInfo: UserState['userInfo']) {
    state.userInfo = userInfo
  }

  return {
    state,
    setToken,
    setUserInfo,
  }
}, {
  persist: piniaPersistConfig(storeId),
})
