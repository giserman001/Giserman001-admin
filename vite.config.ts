import type { ConfigEnv } from 'vite'
import { createVitePlugins } from './build/vite/plugin'
import { createProxy } from './build/vite/proxy'
import { wrapperEnv } from './build/utils'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import pkg from "./package.json";
import dayjs from "dayjs";
import { theme } from 'ant-design-vue';

const { defaultAlgorithm, defaultSeed } = theme;

const mapToken = defaultAlgorithm(defaultSeed);

// console.log(mapToken, 'mapToken')

const { dependencies, devDependencies, name, version } = pkg;
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format("YYYY-MM-DD HH:mm:ss")
};

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv) => {
  const root = process.cwd()

  const env = loadEnv(mode, root)

  // The boolean type read by loadEnv is a string. This function can be converted to boolean type
  const viteEnv = wrapperEnv(env)

  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_DROP_CONSOLE, VITE_PROXY } = viteEnv

  const isBuild = command === 'build'
  return {
    base: VITE_PUBLIC_PATH,
    server: {
      port: VITE_PORT,
      proxy: createProxy(VITE_PROXY)
    },
    // 向import.meta.env注入变量,无法注入全局windows,只能注入import.meta.env中
    // 'import.meta.env.ENV_VARIABLE': JSON.stringify(process.env.ENV_VARIABLE)
    // https://cn.vitejs.dev/config/shared-options.html#envprefix
    define: {
      __APP_INFO__VERSION: JSON.stringify(version),
      __APP_INFO__: JSON.stringify(__APP_INFO__)
    },
    esbuild: {
      // pure: VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : [],
      pure: VITE_DROP_CONSOLE ? ['debugger'] : []
    },
    build: {
      sourcemap: true,
      // terserOptions: {
      //   compress: {
      //     drop_console: false,
      //     drop_debugger: false,
      //   },
      // },
      chunkSizeWarningLimit: 5000,
      rollupOptions: {
        output: {
          // manualChunks: {
          //   vendor
          // },
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames: '[ext]/[name]-[hash].[ext]',
          manualChunks(id) {
            //静态资源分拆打包
            // 可参考https://www.cnblogs.com/jyk/p/16029074.html
            // node包插件打包在一起
            if (id.includes('node_modules')) {
              const arr = id.toString().split('node_modules/')[1].split('/')
              switch (arr[0]) {
                // logicflow是例外,和页面文件打包在一起
                case '@logicflow':
                  // if (arr[1] === 'core') {
                  //   return 'logicflow_core'
                  // } else {
                  //   return 'logicflow_extension'
                  // }
                  break
                default:
                  return 'vendors'
              }
            }
          }
        }
      }
    },
    plugins: createVitePlugins(viteEnv, isBuild),
    resolve: {
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
      alias: [
        {
          find: '@',
          replacement: fileURLToPath(new URL('./src', import.meta.url))
        }
      ]
    },
    css: {
      modules: {
        // css模块化 文件以.module.[css|less|scss]结尾
        generateScopedName: '[name]__[local]___[hash:base64:5]',
        hashPrefix: 'prefix',
        localsConvention: 'camelCaseOnly'
      },
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          additionalData: '@import "./src/style/variables.less";',
          modifyVars: mapToken,
        }
      }
    }
  }
})
