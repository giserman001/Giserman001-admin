import type { PluginOption } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

export function configUnpluginPlugin(): PluginOption[] {
  const plugins = [
    AutoImport({
      dts: 'types/auto-imports.d.ts',
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/ // .vue
      ],
      imports: [
        'vue',
        'vue-router',
        '@vueuse/core',
        {
          'lodash-es': ['throttle', 'debounce', 'cloneDeep', 'pick']
        }
      ],
      resolvers: [AntDesignVueResolver()],
      dirs: ['src/store/**/*', 'src/hooks/**/*']
    }),
    Components({
      dts: 'types/components.d.ts',
      extensions: ['vue', 'tsx'],
      include: [/\.vue$/, /\.tsx$/, /\.vue\?vue/],
      directoryAsNamespace: true,
      globalNamespaces: ['components'],
      resolvers: [AntDesignVueResolver({ importStyle: 'less' })],
      importPathTransform(path: string) {
        return path.replace(/.tsx$/, '')
      }
    })
  ]
  return plugins
}
