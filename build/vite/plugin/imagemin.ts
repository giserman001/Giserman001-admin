// Image resource files used to compress the output of the production environment
// https://github.com/FatehAK/vite-plugin-image-optimizer
import type { PluginOption } from 'vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

export function configImageminPlugin(): PluginOption {
  const plugin = ViteImageOptimizer({
    /* pass your config */
  })
  return plugin
}
