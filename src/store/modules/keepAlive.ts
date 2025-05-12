import { defineStore } from 'pinia'
import { KeepAliveState } from '@/store/interface'

const storeId = 'keepAlive'
export const useKeepAliveStore = defineStore(storeId, () => {

  const state = reactive<KeepAliveState>({
    keepAliveName: []
  })

  async function addKeepAliveName(name: string) {
    !state.keepAliveName.includes(name) && state.keepAliveName.push(name)
  }
  // Remove KeepAliveName
  async function removeKeepAliveName(name: string) {
    state.keepAliveName = state.keepAliveName.filter((item) => item !== name)
  }
  // Set KeepAliveName
  async function setKeepAliveName(keepAliveName: string[] = []) {
    state.keepAliveName = keepAliveName
  }
  return {
    state,
    addKeepAliveName,
    removeKeepAliveName,
    setKeepAliveName
  }
})
