<script lang="ts" setup name="Register">
import { MailOutlined } from '@ant-design/icons-vue'
import { Form, message } from 'ant-design-vue'
import { scorePassword } from '@/utils/util'

const levelNames = {
  0: '强度：太短',
  1: '强度：低',
  2: '强度：中',
  3: '强度：强',
}
const levelClass = {
  0: 'error',
  1: 'error',
  2: 'warning',
  3: 'success',
}
const levelColor = {
  0: '#ff0000',
  1: '#ff0000',
  2: '#ff7e05',
  3: '#52c41a',
}
const router = useRouter()
const useForm = Form.useForm

const state = reactive({
  time: 60,
  level: 0,
  smsSendBtn: false,
  passwordLevel: 0,
  passwordLevelChecked: false,
  percent: 10,
  progressColor: '#FF0000',
})

// 表单相关
const form = reactive({
  email: '',
  password: '',
  password2: '',
  mobile: '',
  captcha: '',
})
function handlePasswordLevel(_, value) {
  if (value === '') {
    return Promise.resolve()
  }
  console.log('scorePassword ; ', scorePassword(value))
  if (value.length >= 6) {
    if (scorePassword(value) >= 30) {
      state.level = 1
    }
    if (scorePassword(value) >= 60) {
      state.level = 2
    }
    if (scorePassword(value) >= 80) {
      state.level = 3
    }
  }
  else {
    state.level = 0
    return Promise.reject(new Error('密码强度不够'))
  }
  state.passwordLevel = state.level
  state.percent = state.level * 33

  return Promise.resolve()
}
function handlePhoneCheck() {
  return Promise.resolve()
}
const rules = reactive({
  email: [{ required: true, type: 'email', message: '请输入邮箱' }, { validateTrigger: ['change', 'blur'] }],
  password: [{ required: true, message: '请输入密码' }, { validator: handlePasswordLevel }, { validateTrigger: ['change', 'blur'] }],
  password2: [{ required: true, message: '请再次输入密码' }, { validator: handlePasswordLevel }, { validateTrigger: ['change', 'blur'] }],
  mobile: [{ required: true, message: '请输入手机号', pattern: /^1[3456789]\d{9}$/ }, { validator: handlePhoneCheck }, { validateTrigger: ['change', 'blur'] }],
  captcha: [{ required: true, message: '请输入验证码' }, { validateTrigger: 'blur' }],
})
const { validate, validateInfos } = useForm(form, rules)
function handleSubmit() {
  validate().then(() => {
    state.passwordLevelChecked = false
    router.push({ name: 'registerResult', params: { ...form } })
  })
}

// 密码检查相关
const registerBtn = ref(false)
const passwordLevelClass = computed(() => {
  return levelClass[state.passwordLevel]
})
const passwordLevelName = computed(() => {
  return levelNames[state.passwordLevel]
})
const passwordLevelColor = computed(() => {
  return levelColor[state.passwordLevel]
})
// const handlePasswordCheck = (_, value) => {
//   const password = form.password
//   if (value === undefined) {
//     return Promise.reject(new Error(t('user.password.required')))
//   }
//   if (value && password && value.trim() !== password.trim()) {
//     return Promise.reject(new Error(t('user.password.twice.msg')))
//   }
//   return Promise.resolve()
// }
function handlePasswordInputClick() {
  state.passwordLevelChecked = false
}

function getCaptcha(e) {
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

<template>
  <div class="main user-layout-register">
    <h3>
      <span>注册</span>
    </h3>
    <a-form id="formRegister" :model="form">
      <a-form-item v-bind="validateInfos.email">
        <a-input v-model:value="form.email" size="large" type="text" placeholder="邮箱" />
      </a-form-item>

      <a-popover v-model:value="state.passwordLevelChecked" placement="rightTop" :trigger="['focus']" :get-popup-container="(trigger) => trigger.parentElement">
        <template #content>
          <div :style="{ width: '240px' }">
            <div class="user-register" :class="[passwordLevelClass]">{{ $t(passwordLevelName) }}</div>
            <a-progress :percent="state.percent" :show-info="false" :stroke-color="passwordLevelColor" />
            <div style="margin-top: 10px">
              <span>请至少输入 6 个字符。请不要使用容易被猜到的密码。</span>
            </div>
          </div>
        </template>
        <a-form-item v-bind="validateInfos.password">
          <a-input-password v-model:value="form.password" size="large" placeholder="请至少输入 6 个字符。请不要使用容易被猜到的密码。" @click="handlePasswordInputClick" />
        </a-form-item>
      </a-popover>

      <a-form-item v-bind="validateInfos.password2">
        <a-input-password v-model:value="form.password2" size="large" placeholder="确认密码" />
      </a-form-item>

      <a-form-item v-bind="validateInfos.mobile">
        <a-input v-model:value="form.mobile" size="large" placeholder="手机号">
          <template #addonBefore>
            <a-select size="large" default-value="+86">
              <a-select-option value="+86">+86</a-select-option>
              <a-select-option value="+87">+87</a-select-option>
            </a-select>
          </template>
        </a-input>
      </a-form-item>
      <!-- <a-input-group size="large" compact>
            <a-select style="width: 20%" size="large" defaultValue="+86">
              <a-select-option value="+86">+86</a-select-option>
              <a-select-option value="+87">+87</a-select-option>
            </a-select>
            <a-input style="width: 80%" size="large" placeholder="11 位手机号"></a-input>
      </a-input-group> -->

      <a-row :gutter="16">
        <a-col class="gutter-row" :span="16">
          <a-form-item v-bind="validateInfos.captcha">
            <a-input v-model:value="form.captcha" size="large" type="text" placeholder="验证码">
              <MailOutlined :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input>
          </a-form-item>
        </a-col>
        <a-col class="gutter-row" :span="8">
          <a-button class="getCaptcha" size="large" :disabled="state.smsSendBtn" @click.stop.prevent="getCaptcha">
            {{
              (!state.smsSendBtn && '获取验证码') || `${state.time} s`
            }}
          </a-button>
        </a-col>
      </a-row>

      <a-form-item>
        <a-button size="large" type="primary" html-type="submit" class="register-button" :loading="registerBtn" :disabled="registerBtn" @click.stop.prevent="handleSubmit">注册</a-button>
        <router-link class="login" :to="{ name: 'login' }">使用已有账户登录</router-link>
      </a-form-item>
    </a-form>
  </div>
</template>

<style lang="less">
.user-register {
  &.error {
    color: #ff0000;
  }

  &.warning {
    color: #ff7e05;
  }

  &.success {
    color: #52c41a;
  }
}

.user-layout-register {
  .ant-input-group-addon:first-child {
    background-color: #fff;
  }
}
</style>

<style lang="less" scoped>
.user-layout-register {
  & > h3 {
    font-size: 16px;
    margin-bottom: 20px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .register-button {
    width: 50%;
  }

  .login {
    float: right;
    line-height: 40px;
  }
}
</style>
