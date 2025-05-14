import type { GlobEnvConfig } from '#/global'
// import { warn } from '@/utils/log'

export function getAppEnvConfig() {
  // Get the global configuration (the configuration will be extracted independently when packaging)
  const ENV = import.meta.env as unknown as GlobEnvConfig

  const { VITE_GLOB_APP_TITLE, VITE_GLOB_API_URL, VITE_GLOB_STATIC_URL } = ENV

  return {
    VITE_GLOB_APP_TITLE,
    VITE_GLOB_API_URL,
    VITE_GLOB_STATIC_URL,
  }
}

/**
 * @description: Development mode
 */
export const devMode = 'development'

/**
 * @description: Production mode
 */
export const prodMode = 'production'

/**
 * @description: Get environment variables
 * @returns:
 * @example:
 */
export function getEnv(): string {
  return import.meta.env.MODE
}

/**
 * @description: Is it a development mode
 * @returns:
 * @example:
 */
export function isDevMode(): boolean {
  return import.meta.env.DEV
}

/**
 * @description: Is it a production mode
 * @returns:
 * @example:
 */
export function isProdMode(): boolean {
  return import.meta.env.PROD
}

/**
 * @description: Is it a production and formal mode
 * @returns:
 * @example:
 */
export function isProdFormalMode(): boolean {
  return isProdMode() && getEnv() !== 'test'
}
