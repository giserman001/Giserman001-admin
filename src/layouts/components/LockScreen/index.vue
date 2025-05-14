<script lang="ts" setup name="LockScreen">
import { ArrowRightOutlined, LockOutlined, SearchOutlined, UnlockOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import dayjs from 'dayjs'
import weekday from 'dayjs/plugin/weekday'
import SvgIcon from '@/components/SvgIcon/index.vue'
import indexdb from '@/utils/indexDB'
import { getWeek } from '@/utils/util'
import 'dayjs/locale/zh-cn'

const userStore = useUserStore()
const globalStore = useGlobalStore()

const userInfo = computed(() => userStore.state.userInfo)

const lockScreen = computed(() => globalStore.state.lockScreen)

dayjs.extend(weekday)

const initBg = 'https://desk-fd.zol-img.com.cn/t_s1920x1080c5/g6/M00/03/0B/ChMkKWECB-OIKeSVAFU590PRoH0AASPhQB7J0oAVToP393.jpg'

const isClickedUnlockBtn = ref(false)

function onClickUnlockBtn() {
  isClickedUnlockBtn.value = true
}
function onClickLockBtn() {
  isClickedUnlockBtn.value = false
}

// 获取锁屏壁纸
const lockImg = ref(null)
onMounted(async () => {
  setTimeout(async () => {
    const bg: any = await indexdb.get('lockImg')
    lockImg.value = bg?.value || initBg
  }, 100)
})

// 获取左下角日期时间
function getDateTime() {
  const week = dayjs().weekday()
  const formatedWeek = getWeek(week, false)
  const day = dayjs().date()
  const month = dayjs().month() + 1
  return `${month}月${day}日` + `, ${formatedWeek}`
}
const dateTime = ref(getDateTime())
const currentTime = ref(dayjs().format('HH:mm'))
setInterval(() => {
  currentTime.value = dayjs().format('HH:mm')
  dateTime.value = getDateTime()
}, 1000)

// 获取电池状态
const { charging } = useBattery()
// 获取网络状态
const { isOnline } = useNetwork()

function onChangeBg(file) {
  if (!file.type.indexOf('image')) {
    message.error('只能传图片!')
  }
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = function () {
    indexdb.set('lockImg', this.result)
    lockImg.value = this.result
  }
  return false
}

const password = ref()
const isWrongPwd = ref(false)
const afterUnlock = ref()

function onUnlockScreen() {
  // api.userLogin({ username: userInfo.value.name, password: password.value }).then((res: any) => {
  //   if (!password.value) {
  //     isWrongPwd.value = true
  //     return false
  //   } else {
  //     isWrongPwd.value = false
  //   }
  //   if (res) {
  //     if (res.unlocked) {
  //       afterUnlock.value = 'afterUnlock'
  //       setTimeout(() => {
  //         globalStore.lockScreen(false)
  //         afterUnlock.value = null
  //         isWrongPwd.value = false
  //         isClickedUnlockBtn.value = false
  //         password.value = null
  //       }, 300)
  //     } else {
  //       isWrongPwd.value = true
  //     }
  //   } else {
  //     isWrongPwd.value = true
  //   }
  // })
}
</script>

<template>
  <section v-if="lockScreen" class="LockScreen" :class="afterUnlock">
    <div v-if="lockImg" class="bg" :class="isClickedUnlockBtn ? 'unlockClicked' : ''" :style="{ backgroundImage: `url(${lockImg})` }" />
    <div class="content">
      <div v-if="isClickedUnlockBtn" class="iptPassword">
        <img :src="userInfo.avatar" class="avatar">
        <div class="username">{{ userInfo.name }}</div>
        <a-input-search v-model:value="password" placeholder="密码" style="width: 300px" @search="onUnlockScreen">
          <template #enterButton>
            <a-button type="link">
              <template #icon>
                <div class="ArrowRightOutlined">
                  <ArrowRightOutlined />
                </div>
              </template>
            </a-button>
          </template>
        </a-input-search>
        <div v-if="isWrongPwd" class="wrongPwd">密码不正确</div>
      </div>
      <a-upload v-else :before-upload="onChangeBg" :show-upload-list="false">
        <div class="uploadTxt">
          <SearchOutlined class="changeBg" />
          <div class="txt">点击更换背景图片</div>
        </div>
      </a-upload>
      <!-- 左下角时间 -->
      <div class="timeZone">
        <div class="currentTime">{{ currentTime }}</div>
        <div class="dateTime">{{ dateTime }}</div>
      </div>
      <!-- 右下角三个按钮 -->
      <div class="deviceStatus">
        <!-- 是否联网 -->
        <span class="onlineStatus">
          <img v-show="isOnline" src="/icons/onLine.ico">
          <img v-show="!isOnline" src="/icons/offLine.ico">
        </span>
        <!-- 是否充电 -->
        <SvgIcon :name="charging ? 'batteryCharge' : 'battery'" color="#fff" width="33px" height="33px" class="charge" />
        <!-- 解锁按钮 -->
        <a-tooltip>
          <template #title>{{ isClickedUnlockBtn ? '返回' : '点击解锁' }}</template>
          <LockOutlined v-if="isClickedUnlockBtn" class="unlock" @click="onClickLockBtn" />
          <UnlockOutlined v-else class="unlock" @click="onClickUnlockBtn" />
        </a-tooltip>
      </div>
    </div>
  </section>
</template>

<style lang="less" scoped>
.afterUnlock {
  opacity: 0 !important;
  transition: opacity 0.3s;
}

.LockScreen {
  background-color: rgba(0, 0, 0, 0.6);
  opacity: 1;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 106;
  overflow: hidden;

  .bg {
    width: 100%;
    position: absolute;
    z-index: 1;
    background-color: #fff;
    background-size: 100% auto;
    background-repeat: no-repeat;
    height: 100%;
  }

  .unlockClicked {
    transform: scale(1.1);
    filter: blur(10px);
    transition: all 0.1s;
  }

  .content {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 2;

    .iptPassword {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);

      .avatar {
        width: 130px;
        height: 130px;
        background-color: #e8eceb;
        border-radius: 50%;
        font-size: 80px;
        line-height: 130px;
        padding: 5px;
      }

      .username {
        color: #fff;
        font-size: 40px;
        margin: 10px auto 15px auto;
      }

      .wrongPwd {
        color: #f88070;
        font-size: 16px;
        text-align: left;
        margin: 5px 0;
        width: 100%;
      }

      ::v-deep(.ant-input) {
        border-radius: 0;

        &:hover {
          border-color: grey;
        }
      }

      .ant-btn.ant-btn-link {
        width: 32px;
        height: 32px;
        background-color: grey;
        border: 2px solid #fff;

        &:hover {
          color: #fff;
          border-color: #fff;
        }

        .ArrowRightOutlined {
          color: #fff;

          &:hover {
            color: rgba(0, 0, 0, 0.6);
          }
        }
      }
    }

    .uploadTxt {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      position: absolute;
      left: 45%;
      top: 50%;
      color: #fff;

      &:hover {
        color: #0094ff;
      }

      .changeBg {
        font-size: 20px;
        cursor: pointer;
        margin-right: 15px;
      }

      .txt {
        cursor: pointer;
      }
    }

    .timeZone {
      position: absolute;
      bottom: 50px;
      left: 20px;
      color: #fff;

      .currentTime {
        font-size: 100px;
        font-weight: 100;
        height: 90px;
        line-height: 90px;
      }

      .dateTime {
        font-size: 60px;
        font-weight: 300;
      }
    }

    .deviceStatus {
      position: absolute;
      bottom: 30px;
      right: 50px;

      .onlineStatus {
        margin-right: 20px;
        display: inline-block;

        img {
          width: 25px;
          height: 25px;
        }
      }

      .onlineStatus,
      .charge,
      .unlock {
        vertical-align: middle;
      }

      .unlock {
        font-size: 23px;
        color: #fff;
        margin-left: 20px;
        font-weight: 500;

        &:hover {
          color: #0094ff;
        }
      }
    }
  }
}
</style>

<style lang="less" scoped>
.afterUnlock {
  opacity: 0 !important;
  transition: opacity 0.3s;
}

.LockScreen {
  background-color: rgba(0, 0, 0, 0.6);
  opacity: 1;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 106;
  overflow: hidden;

  .bg {
    width: 100%;
    position: absolute;
    z-index: 1;
    background-color: #fff;
    background-size: 100% auto;
    background-repeat: no-repeat;
    height: 100%;
  }

  .unlockClicked {
    transform: scale(1.1);
    filter: blur(10px);
    transition: all 0.1s;
  }

  .content {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 2;

    .iptPassword {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);

      .avatar {
        width: 130px;
        height: 130px;
        background-color: #e8eceb;
        border-radius: 50%;
        font-size: 80px;
        line-height: 130px;
        padding: 5px;
      }

      .username {
        color: #fff;
        font-size: 40px;
        margin: 10px auto 15px auto;
      }

      .wrongPwd {
        color: #f88070;
        font-size: 16px;
        text-align: left;
        margin: 5px 0;
        width: 100%;
      }

      ::v-deep(.ant-input) {
        border-radius: 0;

        &:hover {
          border-color: grey;
        }
      }

      .ant-btn.ant-btn-link {
        width: 32px;
        height: 32px;
        background-color: grey;
        border: 2px solid #fff;

        &:hover {
          color: #fff;
          border-color: #fff;
        }

        .ArrowRightOutlined {
          color: #fff;

          &:hover {
            color: rgba(0, 0, 0, 0.6);
          }
        }
      }
    }

    .uploadTxt {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      position: absolute;
      left: 45%;
      top: 50%;
      color: #fff;

      &:hover {
        color: #0094ff;
      }

      .changeBg {
        font-size: 20px;
        cursor: pointer;
        margin-right: 15px;
      }

      .txt {
        cursor: pointer;
      }
    }

    .timeZone {
      position: absolute;
      bottom: 50px;
      left: 20px;
      color: #fff;

      .currentTime {
        font-size: 100px;
        font-weight: 100;
        height: 90px;
        line-height: 90px;
      }

      .dateTime {
        font-size: 60px;
        font-weight: 300;
      }
    }

    .deviceStatus {
      position: absolute;
      bottom: 30px;
      right: 50px;

      .onlineStatus {
        margin-right: 20px;
        display: inline-block;

        img {
          width: 25px;
          height: 25px;
        }
      }

      .onlineStatus,
      .charge,
      .unlock {
        vertical-align: middle;
      }

      .unlock {
        font-size: 23px;
        color: #fff;
        margin-left: 20px;
        font-weight: 500;

        &:hover {
          color: #0094ff;
        }
      }
    }
  }
}
</style>
