/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GLOB_APP_TITLE
  readonly VITE_GLOB_API_URL
  readonly VITE_GLOB_STATIC_URL
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
