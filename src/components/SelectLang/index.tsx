import { GlobalOutlined } from '@ant-design/icons-vue'
import { Dropdown, Menu } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
import { setDocumentTitleForLangChange } from '@/utils/domUtil'
import ls from '@/utils/Storage'
import './index.less'

const locales = ['zh-CN', /* 'zh-TW', */ 'en-US']
const languageLabels = {
  'zh-CN': '简体中文',
  // 'zh-TW': '繁体中文',
  'en-US': 'English',
  // 'pt-BR': 'Português'
}

const languageIcons: any = {
  'zh-CN': '🇨🇳',
  // 'zh-TW': '🇭🇰',
  'en-US': '🇺🇸',
  // 'pt-BR': '🇧🇷'
}

const SelectLang = {
  props: {
    prefixCls: {
      type: String,
      default: 'ant-pro-drop-down',
    },
  },
  name: 'SelectLang',
  setup(props) {
    const { locale } = useI18n()

    const { prefixCls } = props
    const currentLang = ref(ls.get('lang') || 'zh-CN')
    function changeLang({ key }) {
      locale.value = key
      ls.set('lang', key)
      currentLang.value = key
      setDocumentTitleForLangChange()
    }

    return {
      prefixCls,
      changeLang,
      currentLang,
    }
  },
  render() {
    const langMenu = (
      <Menu
        class={['menu', 'ant-pro-header-menu']}
        selectedKeys={[this.currentLang]}
        onClick={this.changeLang}
        getPopupContainer={(triggerNode) => {
          return triggerNode.parentNode || document.body
        }}
      >
        {locales.map(locale => (
          <Menu.Item key={locale}>
            <span role="img" aria-label={languageLabels[locale]}>
              {`${languageIcons[locale]} `}
            </span>
            {languageLabels[locale]}
          </Menu.Item>
        ))}
      </Menu>
    )
    return (
      <Dropdown overlay={langMenu} class={this.prefixCls} placement="bottomRight">
        <span>
          <GlobalOutlined />
        </span>
      </Dropdown>
    )
  },
}

export default defineComponent(SelectLang)
