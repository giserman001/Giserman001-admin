import type { Directive, DirectiveBinding } from 'vue'
/**
 * v-auth
 * 按钮权限指令
 */
import { useAuthStore } from '@/store/modules/auth'

const auth: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { value } = binding
    const authStore = useAuthStore()
    const currentPageRoles = authStore.authButtonListGet[authStore.routeName] ?? []
    if (Array.isArray(value) && value.length) {
      const hasPermission = value.every(item => currentPageRoles.includes(item))
      if (!hasPermission)
        el.remove()
    }
    else {
      if (!currentPageRoles.includes(value))
        el.remove()
    }
  },
}

export default auth
