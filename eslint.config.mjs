import antfu from '@antfu/eslint-config'

export default antfu({
  vue: true,
  react: false,
  typescript: true,
  unocss: true,
  regexp: false,
  stylistic: {
    indent: 2, // 4, or 'tab'
    quotes: 'single', // or 'double'
  },
  formatters: {
    css: true,
    html: true,
    markdown: 'prettier',
  },
  ignores: ['**/node_modules/**', '**/dist/**', '**/public/**'],
}, {
  rules: {
    'no-sequences': 'off',
    'no-console': 'off',
    'no-eval': 'off',
    'no-async-promise-executor': 'off',
    'unicorn/consistent-function-scoping': 'off',
    'eslint-comments/no-unlimited-disable': 'off',
    'object-property-newline': 'off',
    'object-curly-newline': 'off',
    '@typescript-eslint/brace-style': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'ts/no-unused-expressions': 'off',
    'ts/no-empty-object-type': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/custom-event-name-casing': 'off',
    'vue/no-export-in-script-setup': 'off',
    'unused-imports/no-unused-vars': 'warn',
    'unused-imports/no-unused-imports': 'warn',
    'ts/no-namespace': 'off',
  },
})
