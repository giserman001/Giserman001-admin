import type { GlobConfig } from '#/global'

import { getAppEnvConfig } from '@/utils/env'
// import { warn } from '@/utils/log'

export function useGlobSetting(): Readonly<GlobConfig> {
  const { VITE_GLOB_APP_TITLE, VITE_GLOB_API_URL, VITE_GLOB_STATIC_URL } = getAppEnvConfig()

  // Take global configuration
  const glob: Readonly<GlobConfig> = {
    title: VITE_GLOB_APP_TITLE,
    baseUrl: VITE_GLOB_API_URL,
    staticUrl: VITE_GLOB_STATIC_URL
  }
  return glob as Readonly<GlobConfig>
}
