export interface Response {
  message: string
  timestamp: Date
  code: number
}

export interface GlobConfig {
  // Site title
  title: string
  // Service interface url
  baseUrl: string

  staticUrl: string
}

export interface GlobEnvConfig {
  // Site title
  VITE_GLOB_APP_TITLE: string
  // Service interface url
  VITE_GLOB_API_URL: string

  VITE_GLOB_STATIC_URL: string
}

declare global {
  interface Window {
    log: (message?: any, ...optionalParams: any[]) => void
    i18n: any
  }

  interface ViteEnv {
    VITE_PORT: number
    VITE_PUBLIC_PATH: string
    VITE_PROXY: [string, string][]
    VITE_GLOB_APP_TITLE: string
    VITE_GLOB_APP_SHORT_NAME: string
    VITE_DROP_CONSOLE: boolean
    VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none'
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean
    VITE_LEGACY: boolean
    VITE_USE_IMAGEMIN: boolean
    VITE_USE_MOCK: boolean
  }

  const __APP_INFO__: {
    pkg: {
      name: string;
      version: string;
      dependencies: Recordable<string>;
      devDependencies: Recordable<string>;
    };
    lastBuildTime: string;
  };

  type Nullable<T> = T | null
  type Recordable<T = any> = Record<string, T>
  interface ReadonlyRecordable<T = any> {
    readonly [key: string]: T
  }

  interface Fn<T = any, R = T> {
    (...arg: T[]): R
  }

  interface PromiseFn<T = any, R = T> {
    (...arg: T[]): Promise<R>
  }

  type Indexable<T = any> = {
    [key: string]: T
  }
  type ObjToKeyValUnion<T> = {
    [K in keyof T]: { key: K; value: T[K] }
  }[keyof T]

  type ObjToKeyValArray<T> = {
    [K in keyof T]: [K, T[K]]
  }[keyof T]

  type ObjToSelectedValueUnion<T> = {
    [K in keyof T]: T[K]
  }[keyof T]

  type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

  type GetOptional<T> = {
    [P in keyof T as T[P] extends Required<T>[P] ? never : P]: T[P]
  }
  namespace Menu {
    interface MenuOptions {
      path: string
      name: string
      component?: string | (() => Promise<unknown>)
      redirect?: string
      meta: MetaProps
      children?: MenuOptions[]
    }
    interface MetaProps {
      icon: string
      title: string
      activeMenu?: string
      isLink?: string
      blank?: boolean
      isHide: boolean
      isFull: boolean
      isAffix: boolean
      isKeepAlive: boolean
    }
  }
  interface Navigator {
    msSaveOrOpenBlob: (blob: Blob, fileName: string) => void;
    browserLanguage: string;
  }

  type GreyOrWeakType = "grey" | "weak";
}
