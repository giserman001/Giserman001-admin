import type { PluginOption } from 'vite'
import path from 'path'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import { visualizer } from 'rollup-plugin-visualizer'
// import vueDevTools from 'vite-plugin-vue-devtools'
import Unocss from 'unocss/vite'

import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import { configCompressPlugin } from './compress'
import { configHtmlPlugin } from './html'
import { configImageminPlugin } from './imagemin'
import { configUnpluginPlugin } from './unplugin'

import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import mockDevServerPlugin from 'vite-plugin-mock-dev-server'

const lifecycle = process.env.npm_lifecycle_event
export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const { VITE_USE_IMAGEMIN, VITE_BUILD_COMPRESS, VITE_PROXY, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE } = viteEnv

  const vitePlugins: (PluginOption | PluginOption[])[] = [
    Vue(),
    VueJsx(),
    // vueDevTools(),
    lifecycle === 'report' ? visualizer({ gzipSize: true, open: true, brotliSize: true, filename: 'report.html' }) : null,
    VueSetupExtend(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]'
    }),
    mockDevServerPlugin({
      prefix: '/',
      include: 'mock/*.ts',
      log: false
    }),
    Unocss()
  ]

  // vite-plugin-html
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild))

  // 自动引入插件
  vitePlugins.push(configUnpluginPlugin())

  // The following plugins only work in the production environment
  if (isBuild) {
    // vite-plugin-imagemin
    VITE_USE_IMAGEMIN && vitePlugins.push(configImageminPlugin())

    // rollup-plugin-gzip
    vitePlugins.push(configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE))
  }

  return vitePlugins
}
