<template>
  <div ly-w-full ly-h-full ly-flex="~ col" ly-gap="[40px]" class="main">
    <div ly-flex="~ col" ly-items-center ly-gap="[40px]">
      <div ly-flex="~ col" ly-gap="[12px]">
        <div ly-flex ly-items-center ly-gap="[16px]">
          <img src="~@/assets/icons/logo.svg" ly-h="[44px]" alt="logo" />
          <span ly-text="size-[33px] [rgba(0,0,0,0.85)]" ly-font-600>Ant Design</span>
        </div>
        <div ly-text="size-[12px] [rgba(0,0,0,0.45)]">Ant Design 是西湖区最具影响力的 Web 设计规范</div>
      </div>
      <div class="middle">
        <a-form id="formLogin" class="user-layout-login" @submit="handleSubmit" :model="formRef">
          <a-tabs :activeKey="customActiveKey" :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }"
            @change="handleTabClick">
            <!-- 账户密码登录 -->
            <a-tab-pane key="tab1" tab="账户密码登录">
              <a-alert v-if="isLoginError" type="error" showIcon style="margin-bottom: 24px"
                :message="$t('user.login.message-invalid-credentials')" />
              <a-form-item v-bind="validateInfos.username">
                <a-input size="large" type="text" placeholder="账户: admin or ant.design"
                  v-model:value="formRef.username">
                  <template #prefix>
                    <UserOutlined :style="{ color: 'rgba(0,0,0,.25)' }" />
                  </template>
                </a-input>
              </a-form-item>
              <a-form-item v-bind="validateInfos.password">
                <a-input-password size="large" placeholder="密码: 随意" v-model:value="formRef.password">
                  <template #prefix>
                    <LockOutlined :style="{ color: 'rgba(0,0,0,.25)' }" />
                  </template>
                </a-input-password>
              </a-form-item>
            </a-tab-pane>
            <!-- 手机号登录 -->
            <a-tab-pane key="tab2" tab="手机号登录">
              <a-form-item v-bind="validateInfos.mobile">
                <a-input size="large" type="text" placeholder="手机号" v-model:value="formRef.mobile">
                  <MobileOutlined :style="{ color: 'rgba(0,0,0,.25)' }" />
                </a-input>
              </a-form-item>

              <a-row :gutter="16">
                <a-col :span="16">
                  <a-form-item v-bind="validateInfos.captcha">
                    <a-input size="large" type="text" placeholder="验证码" v-model:value="formRef.captcha">
                      <MailOutlined :style="{ color: 'rgba(0,0,0,.25)' }" />
                    </a-input>
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-button class="ly-h-[40px] ly-block ly-w-full" tabindex="-1" :disabled="state.smsSendBtn"
                    @click.stop.prevent="getCaptcha">
                    {{ (!state.smsSendBtn && '获取验证码') || state.time + ' s' }}
                  </a-button>
                </a-col>
              </a-row>
            </a-tab-pane>
          </a-tabs>
          <a-form-item v-bind="validateInfos.rememberMe">
            <div ly-flex ly-items-center ly-justify-between>
              <a-checkbox v-model:checked="formRef.rememberMe" style="float: left">
                自动登录
              </a-checkbox>
              <div @click="router.push({ name: 'recover', params: { user: 'aaa' } })" ly-text="size-[14px] #1677ff"
                ly-cursor-pointer class="hover:ly-text-[#69b1ff]">
                忘记密码
              </div>
            </div>
          </a-form-item>
          <a-form-item style="margin-top: 24px">
            <a-button size="large" type="primary" htmlType="submit"
              class="ly-py-[15px] ly-text-size-[16px] ly-h-[40px] ly-w-full" :loading="state.loginBtn"
              :disabled="state.loginBtn">登录</a-button>
          </a-form-item>
          <div class="user-login-other" ly-flex ly-items-center ly-justify-between>
            <div ly-flex ly-items-center>
              <div>其他登录方式</div>
              <AlipayCircleOutlined />
              <TaobaoCircleOutlined />
              <WeiboCircleOutlined />
            </div>
            <div @click="router.push({ name: 'register' })" ly-text="size-[14px] #1677ff" ly-cursor-pointer
              class="hover:ly-text-[#69b1ff]">
              注册账户
            </div>
          </div>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup name="Login">
import { encryptByMd5 } from '@/utils/encrypt'
import { Form } from 'ant-design-vue'
import { UnwrapRef } from 'vue'
import { MobileOutlined, MailOutlined, AlipayCircleOutlined, TaobaoCircleOutlined, WeiboCircleOutlined, UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { loginApi } from '@/api/modules/login'
import { HOME_URL } from "@/config"
import { initDynamicRouter } from "@/router/modules/dynamicRouter"
import { notification } from 'ant-design-vue';
import { getTimeState } from '@/utils'
import { message } from 'ant-design-vue'

interface FormState {
  rememberMe: boolean
  username: string
  password: string
  mobile: string
  captcha: string
}

const router = useRouter();
const userStore = useUserStore();
const tabsStore = useTabsStore();
const keepAliveStore = useKeepAliveStore();

const useForm = Form.useForm

const state = reactive({
  time: 60,
  loginBtn: false,
  // login type: 0 email, 1 username, 2 telephone
  loginType: 0,
  smsSendBtn: false
})

// #region 表单相关
const formRef: UnwrapRef<FormState> = reactive({
  rememberMe: false,
  username: 'admin',
  password: '1',
  mobile: '',
  captcha: ''
})

const handleUsernameOrEmail = (_, value: string) => {
  const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
  if (regex.test(value)) {
    state.loginType = 0
  } else {
    state.loginType = 1
  }
  return Promise.resolve()
}
const rulesRef = reactive({
  rememberMe: [{ trigger: 'checked' }],
  username: [{ required: true, message: '请输入帐户名或邮箱地址' }, { validator: handleUsernameOrEmail, trigger: 'change' }],
  password: [{ required: true, message: '请输入密码！' }, {}],
  mobile: [{ required: true, pattern: /^1[34578]\d{9}$/, message: '请输入手机号！', validateTrigger: 'change' }],
  captcha: [{ required: true, message: '请输入验证码！', validateTrigger: 'blur' }]
})
const { validate, validateInfos } = useForm(formRef, rulesRef)

const isLoginError = ref(false)

const handleSubmit = (e: Event) => {

  e.preventDefault()

  state.loginBtn = true

  const validateFieldsKey = customActiveKey.value === 'tab1' ? ['username', 'password'] : ['mobile', 'captcha']

  validate(validateFieldsKey).then(async () => {
    try {
      // 1.执行登录接口
      const { data } = await loginApi({ ...formRef, password: encryptByMd5(formRef.password) });

      userStore.setToken(data.token);

      // 2.添加动态路由
      await initDynamicRouter();

      // 3.清空 tabs、keepAlive 数据
      tabsStore.setTabs([]);
      keepAliveStore.setKeepAliveName([]);

      // 4.跳转到首页
      router.push(HOME_URL);

      notification.open({
        message: getTimeState(),
        description: "欢迎登录 Giserman001-Admin",
      });

      isLoginError.value = false
    } catch (error) {
      state.loginBtn = false
      isLoginError.value = true
      formRef.password = ''
    }
  }).catch(() => {
    state.loginBtn = false
  })
}
// #endregion

const customActiveKey = ref<string>('tab1')
const handleTabClick = (key: string) => {
  customActiveKey.value = key
}

const getCaptcha = (e: Event) => {
  e.preventDefault()
  validate(['mobile']).then(() => {
    state.smsSendBtn = true
    const interval = window.setInterval(() => {
      if (state.time-- <= 0) {
        state.time = 60
        state.smsSendBtn = false
        window.clearInterval(interval)
      }
    }, 1000)

    message.loading('验证码发送中..', 1)

    // getSmsCaptcha({ mobile: form.mobile })
    //   .then((res) => {
    //     notification['success']({
    //       message: '提示',
    //       description: '验证码获取成功，您的验证码为：' + res.result.captcha,
    //       duration: 8
    //     })
    //   })
    //   .catch((err) => {
    //     clearInterval(interval)
    //     state.time = 60
    //     state.smsSendBtn = false
    //     requestFailed(err)
    //     registerBtn && (registerBtn.value = false)
    //   })
  })
}
</script>

<style lang="less" scoped>
.main {
  background: #f0f2f5 url(@/assets/background.svg) no-repeat 50%;

  .middle {
    max-width: 368px;
    width: 98% !important;
  }

  .user-login-other {
    .anticon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: @primary-color;
      }
    }
  }
}
</style>
