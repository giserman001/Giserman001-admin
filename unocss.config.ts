import { defineConfig, presetAttributify, presetTypography, presetWind3, presetWebFonts, transformerDirectives, transformerVariantGroup } from 'unocss'

export default defineConfig({
  theme: {
    colors: {}
  },
  shortcuts: [
    ['ly-flex-center', 'ly-flex ly-items-center ly-justify-center'],
    ['ly-cus-ellipsis', 'ly-overflow-hidden ly-text-ellipsis ly-whitespace-nowrap']
  ],
  presets: [
    presetWind3({
      prefix: 'ly-'
    }),
    presetAttributify({
      prefix: ''
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        Impact: {
          name: 'Impact',
          provider: 'none'
        }
      }
    })
  ],
  variants: [
    (matcher) => {
      if (!matcher.startsWith('placeholder:')) return matcher
      return {
        matcher: matcher.slice(12), // 移除 'placeholder:' 前缀
        selector: (s) => `${s}::placeholder`
      }
    }
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  safelist: []
})
