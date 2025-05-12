# Giserman001-Admin

### 介绍 📖

Giserman001-Admin 一款基于 Vue3.5、TypeScript5.8、Vite6、Pinia3、Ant-design-vue4 开源的后台管理框架，使用目前最新技术栈开发。在一定程度上提高您的开发效率。另外本项目还封装了一些常用组件、Hooks、指令、动态路由、按钮级别权限控制等功能。


### 代码仓库 ⭐

- Gitee：https://gitee.com/giserman001/giserman001-admin
- GitHub：https://github.com/giserman001/giserman001-admin

### 项目功能 🔨

- 使用 Vue3.5 + TypeScript 开发，单文件组件**＜script setup＞**
- 采用 Vite6 作为项目开发、打包工具（配置 gzip/brotli 打包、tsx 语法、跨域代理…）
- 使用 Pinia3 替代 Vuex，轻量、简单、易用，集成 Pinia 持久化插件
- 使用 TypeScript 对 Axios 整个二次封装（请求拦截、取消、常用请求封装…）
- 支持 多主题布局、暗黑模式、i18n 国际化
- 使用 VueRouter 配置动态路由权限拦截、路由懒加载，支持页面按钮权限控制
- 使用 KeepAlive 对页面进行缓存，支持多级嵌套路由缓存
- 常用自定义指令开发（权限、复制、水印、拖拽、节流、防抖、长按…）
- 使用 Prettier 统一格式化代码，集成 ESLint、Stylelint 代码校验规范
- 使用 husky、lint-staged、commitlint、czg、cz-git 规范提交信息

### 安装使用步骤 📔

- **Clone：**

```text
# Gitee
git clone https://gitee.com/giserman001/giserman001-admin
# GitHub
git clone https://github.com/giserman001/giserman001-admin.git
```

- **Install：**

```text
pnpm install
```

- **Run：**

```text
pnpm dev
pnpm serve
```

- **Build：**

```text
# 开发环境
pnpm build:dev

# 测试环境
pnpm build:test

# 生产环境
pnpm build:pro
```
