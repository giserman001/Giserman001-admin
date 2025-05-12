<template>
  <a-dropdown placement="bottomRight">
    <template #overlay>
      <a-menu
        class="menu ant-pro-header-menu"
        :selectedKeys="[currentLang]"
        @click="changeLang"
      >
        <a-menu-item v-for="locale in locales" :key="locale">
            <span role="img" :aria-label="languageLabels[locale]">
              {{languageIcons[locale] + ' '}}
            </span>
            {{languageLabels[locale]}}
          </a-menu-item>
      </a-menu>
    </template>
    <span>
      <GlobalOutlined class="ly-text-size-[18px]" />
    </span>
  </a-dropdown>
</template>

<script setup lang="tsx">
import { GlobalOutlined } from '@ant-design/icons-vue'
import ls from '@/utils/Storage'
import { setDocumentTitleForLangChange } from '@/utils/domUtil'
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
const locales = ['zh-CN', /*'zh-TW',*/ 'en-US' /*'pt-BR'*/]
const languageLabels = {
  'zh-CN': '简体中文',
  // 'zh-TW': '繁体中文',
  'en-US': 'English'
  // 'pt-BR': 'Português'
}
// eslint-disable-next-line
const languageIcons: any = {
  'zh-CN': '🇨🇳',
  // 'zh-TW': '🇭🇰',
  'en-US': '🇺🇸'
  // 'pt-BR': '🇧🇷'
}
const currentLang = ref(ls.get('lang') || 'zh-CN')
function changeLang({ key }) {
  locale.value = key
  ls.set('lang', key)
  currentLang.value = key
  setDocumentTitleForLangChange()
}
</script>

<style scoped>

</style>
