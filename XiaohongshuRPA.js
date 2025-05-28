import * as path from 'node:path'
import { fileURLToPath } from 'node:url'
import axios from 'axios'
import { chromium } from 'playwright'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

class XiaohongshuRPA {
  constructor(userDir, port = 9223) {
    this.userDir = userDir
    this.port = port
    this.browser = null
    this.page = null
    this.cookies = null
    this.headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36',
      'Referer': 'https://www.xiaohongshu.com/',
    }
  }

  async startBrowser() {
    this.browser = await chromium.launchPersistentContext(
      this.userDir,
      {
        headless: false,
        args: [
          `--remote-debugging-port=${this.port}`,
          '--disable-blink-features=AutomationControlled',
          '--disable-gpu-sandbox',
        ],
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36',
      },
    )
    this.page = this.browser.pages()[0] || await this.browser.newPage()
  }

  async getCookies() {
    const cookies = await this.page?.context().cookies() || []
    const cookieStr = cookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; ')
    // console.log(cookieStr.trim()) // 输出: user=JohnDoe; auth=1234567890
    this.cookies = cookieStr.trim()
    return this.cookies
  }

  async login() {
    await this.startBrowser()
    await this.page?.goto('https://www.xiaohongshu.com/')
    await new Promise(resolve => setTimeout(resolve, 3000))
    console.log('cookieStr=>', await this.getCookies())

    const headers = {
      Cookie: await this.getCookies(),
    }

    const url = 'https://edith.xiaohongshu.com/api/sns/web/v2/user/me'
    const response = await axios.get(url, { headers })
    console.log('response.data=>', response.data)

    if (response.data.code === 0 && !response.data.data.guest) {
      return true
    }

    try {
      await this.page?.waitForSelector('text="登录"').then(selector => selector.click())
      const qrcodeLocator = this.page?.locator('.qrcode-img')
      await qrcodeLocator?.waitFor()
      const qrcodeElement = await qrcodeLocator?.elementHandle()
      await qrcodeElement?.screenshot({ path: path.resolve(__dirname, 'qrcode.png') })
      console.log('二维码已保存，请使用小红书APP扫描登录...')

      await this.page?.waitForSelector('span:text("我")')
      console.log('登录成功！')
    }
    catch (error) {
      console.error(`发生错误：${error.message}`)
      return false
    }

    await this.getCookies()
    await this.browser?.close()
    return true
  }
}

(async () => {
  try {
    const USER_DIR = 'E:\\xiaohongshu' // 指定用户目录
    const DEBUG_PORT = 9223 // 指定调试端口

    const xhs = new XiaohongshuRPA(USER_DIR, DEBUG_PORT)
    const isLoggedIn = await xhs.login()
    console.log(`登录状态: ${isLoggedIn ? '成功' : '失败'}`)
  }
  catch (error) {
    console.error(`发生错误：${error.message}`)
  }
})()
