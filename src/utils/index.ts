import type { Component, Ref, VNode } from 'vue'
import router from '@/router'
import { renderToString } from '@vue/server-renderer'
import { createSSRApp, isVNode } from 'vue'
import { isMobile, isNullOrUnDef, isObject, isArray } from './is'

export function comp2HtmlStr(vNode: VNode): Promise<string>
export function comp2HtmlStr(component: Component, props?: Recordable): Promise<string>

export function comp2HtmlStr(componentOrVNode: Component | VNode, props?: Recordable): Promise<string> {
  if (isVNode(componentOrVNode)) return renderToString(componentOrVNode)
  return renderToString(createSSRApp(componentOrVNode, props))
}

export function initScript(src: string) {
  return new Promise<void>((resolve, reject) => {
    const script = document.createElement('script')
    script.src = src
    script.addEventListener('load', () => {
      resolve()
    })
    script.addEventListener('error', (error) => {
      console.log('========script标签加载失败！！！========')
      reject(error)
    })
    document.body.appendChild(script)
  })
}

export function removeOnAnimateOver(containerRef: Ref<HTMLElement>, endAni: string, displayRef: Ref<string>) {
  watch(containerRef, () => {
    containerRef.value.addEventListener('animationend', () => {
      if (containerRef.value.classList.contains(endAni)) displayRef.value = 'none'
    })
  })
}

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export function getExtname(filename: string) {
  if (!filename || typeof filename !== 'string') return ''

  const a = filename.split('').reverse().join('')
  const b = a.substring(0, a.search(/\./)).split('').reverse().join('')
  return b
}

export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string
  for (key in src) target[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (target[key] = src[key])

  return target
}

export function deepMerge2<T = any>(src: any = {}, target: any = {}): T {
  let key: string
  for (key in src) {
    if (!Reflect.has(target, key)) continue
    target[key] = isObject(src[key]) ? deepMerge2(src[key], target[key]) : (target[key] = src[key])
  }
  return target
}

export function animateCSS(element: HTMLElement, animation: string, prefix = 'animate__') {
  return new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`

    if (!element)
      // eslint-disable-next-line prefer-promise-reject-errors
      return reject('element not found')

    element.classList.add(`${prefix}animated`, animationName)

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation()
      element!.classList.remove(`${prefix}animated`, animationName)
      resolve('Animation ended')
    }

    element.addEventListener('animationend', handleAnimationEnd, { once: true })
  })
}

export function openWindow(
  url: string,
  opt?: {
    target?: '_self' | '_blank' | string
    noopener?: boolean
    noreferrer?: boolean
  }
) {
  const { target = '__blank', noopener = true, noreferrer = true } = opt || {}
  const feature: string[] = []

  noopener && feature.push('noopener=yes')
  noreferrer && feature.push('noreferrer=yes')

  window.open(url, target, feature.join(','))
}

// 一维数组转二维数组
export function arrayToMatrix<T>(arr: T[], size: number) {
  const result: T[][] = []
  for (let i = 0; i < arr.length; i += size) result.push(arr.slice(i, i + size))

  return result
}

// 格式化手机号码
export function formatMobile(str: string) {
  if (isMobile(str)) str = str.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2')

  return str
}

// 格式化身份证号码
export function formatIdCard(num: string) {
  num && (num = num.replace(/^(\d{4})\d{11}(\d{3})$/, '$1***********$2'))
  return num
}

// 截取日期后的时间
export function getTime(time) {
  if (time) return time.split(' ')[1]

  return '暂无'
}

export function param2Obj(url: string) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) return {}

  const obj: Recordable<string> = {}
  const searchArr = search.split('&')
  searchArr.forEach((v) => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

/**
 * Add the object as a parameter to the URL
 * @param baseUrl url
 * @param obj
 * @returns {string}
 * eg:
 *  let obj = {a: '3', b: '4'}
 *  obj2Param('www.baidu.com', obj)
 *  ==>www.baidu.com?a=3&b=4
 */
export function obj2Param(baseUrl: string, obj: any, encode = true): string {
  if (!baseUrl) return ''
  let parameters = ''
  const preObj = param2Obj(baseUrl)
  obj = {
    ...preObj,
    ...obj
  }

  const rootUrl = baseUrl.split('?')[0]

  for (const [key, val] of Object.entries(obj).filter(([_, v]) => !isNullOrUnDef(v))) {
    parameters += `${key}=${encode ? encodeURIComponent(val as any) : val}&`
  }

  parameters = parameters.replace(/&$/, '')
  return `${rootUrl}?${parameters}`
}

export function handleReturnBack() {
  if (window.history.length > 1) router.go(-1)
  else window.close()
}

// 获取字符串里的数字
export function extractNumbersFromString(str) {
  return str.match(/\d+/g) || []
}

export function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function removeObjKeys(obj: Recordable, keys: string[]): Recordable {
  return Object.values(obj)
    .filter((item) => !keys.includes(item))
    .reduce((a, b) => ({ ...a, ...b }), {})
}




const mode = import.meta.env.VITE_ROUTER_MODE;

/**
 * @description 获取localStorage
 * @param {String} key Storage名称
 * @returns {String}
 */
export function localGet(key: string) {
  const value = window.localStorage.getItem(key);
  try {
    return JSON.parse(window.localStorage.getItem(key) as string);
  } catch (error) {
    return value;
  }
}

/**
 * @description 存储localStorage
 * @param {String} key Storage名称
 * @param {*} value Storage值
 * @returns {void}
 */
export function localSet(key: string, value: any) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

/**
 * @description 清除localStorage
 * @param {String} key Storage名称
 * @returns {void}
 */
export function localRemove(key: string) {
  window.localStorage.removeItem(key);
}

/**
 * @description 清除所有localStorage
 * @returns {void}
 */
export function localClear() {
  window.localStorage.clear();
}

/**
 * @description 判断数据类型
 * @param {*} val 需要判断类型的数据
 * @returns {String}
 */
export function isType(val: any) {
  if (val === null) return "null";
  if (typeof val !== "object") return typeof val;
  else return Object.prototype.toString.call(val).slice(8, -1).toLocaleLowerCase();
}

/**
 * @description 生成唯一 uuid
 * @returns {String}
 */
export function generateUUID() {
  let uuid = "";
  for (let i = 0; i < 32; i++) {
    let random = (Math.random() * 16) | 0;
    if (i === 8 || i === 12 || i === 16 || i === 20) uuid += "-";
    uuid += (i === 12 ? 4 : i === 16 ? (random & 3) | 8 : random).toString(16);
  }
  return uuid;
}

/**
 * 判断两个对象是否相同
 * @param {Object} a 要比较的对象一
 * @param {Object} b 要比较的对象二
 * @returns {Boolean} 相同返回 true，反之 false
 */
export function isObjectValueEqual(a: { [key: string]: any }, b: { [key: string]: any }) {
  if (!a || !b) return false;
  let aProps = Object.getOwnPropertyNames(a);
  let bProps = Object.getOwnPropertyNames(b);
  if (aProps.length != bProps.length) return false;
  for (let i = 0; i < aProps.length; i++) {
    let propName = aProps[i];
    let propA = a[propName];
    let propB = b[propName];
    if (!b.hasOwnProperty(propName)) return false;
    if (propA instanceof Object) {
      if (!isObjectValueEqual(propA, propB)) return false;
    } else if (propA !== propB) {
      return false;
    }
  }
  return true;
}

/**
 * @description 生成随机数
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 * @returns {Number}
 */
export function randomNum(min: number, max: number): number {
  let num = Math.floor(Math.random() * (min - max) + max);
  return num;
}

/**
 * @description 获取当前时间对应的提示语
 * @returns {String}
 */
export function getTimeState() {
  let timeNow = new Date();
  let hours = timeNow.getHours();
  if (hours >= 6 && hours <= 10) return `早上好 ⛅`;
  if (hours >= 10 && hours <= 14) return `中午好 🌞`;
  if (hours >= 14 && hours <= 18) return `下午好 🌞`;
  if (hours >= 18 && hours <= 24) return `晚上好 🌛`;
  if (hours >= 0 && hours <= 6) return `凌晨好 🌛`;
}

/**
 * @description 获取浏览器默认语言
 * @returns {String}
 */
export function getBrowserLang() {
  let browserLang = navigator.language ? navigator.language : navigator.browserLanguage;
  let defaultBrowserLang = "";
  if (["cn", "zh", "zh-cn"].includes(browserLang.toLowerCase())) {
    defaultBrowserLang = "zh";
  } else {
    defaultBrowserLang = "en";
  }
  return defaultBrowserLang;
}

/**
 * @description 获取不同路由模式所对应的 url + params
 * @returns {String}
 */
export function getUrlWithParams() {
  const url = {
    hash: location.hash.substring(1),
    history: location.pathname + location.search
  };
  return url[mode];
}

/**
 * @description 使用递归扁平化菜单，方便添加动态路由
 * @param {Array} menuList 菜单列表
 * @returns {Array}
 */
export function getFlatMenuList(menuList: Menu.MenuOptions[]): Menu.MenuOptions[] {
  let newMenuList: Menu.MenuOptions[] = JSON.parse(JSON.stringify(menuList));
  return newMenuList.flatMap(item => [item, ...(item.children ? getFlatMenuList(item.children) : [])]);
}

/**
 * @description 使用递归过滤出需要渲染在左侧菜单的列表 (需剔除 isHide == true 的菜单)
 * @param {Array} menuList 菜单列表
 * @returns {Array}
 * */
export function getShowMenuList(menuList: Menu.MenuOptions[]) {
  let newMenuList: Menu.MenuOptions[] = JSON.parse(JSON.stringify(menuList));
  return newMenuList.filter(item => {
    item.children?.length && (item.children = getShowMenuList(item.children));
    return !item.meta?.isHide;
  });
}

/**
 * @description 使用递归找出所有面包屑存储到 pinia/vuex 中
 * @param {Array} menuList 菜单列表
 * @param {Array} parent 父级菜单
 * @param {Object} result 处理后的结果
 * @returns {Object}
 */
export const getAllBreadcrumbList = (menuList: Menu.MenuOptions[], parent = [], result: { [key: string]: any } = {}) => {
  for (const item of menuList) {
    result[item.path] = [...parent, item];
    if (item.children) getAllBreadcrumbList(item.children, result[item.path], result);
  }
  return result;
};

/**
 * @description 使用递归处理路由菜单 path，生成一维数组 (第一版本地路由鉴权会用到，该函数暂未使用)
 * @param {Array} menuList 所有菜单列表
 * @param {Array} menuPathArr 菜单地址的一维数组 ['**','**']
 * @returns {Array}
 */
export function getMenuListPath(menuList: Menu.MenuOptions[], menuPathArr: string[] = []): string[] {
  for (const item of menuList) {
    if (typeof item === "object" && item.path) menuPathArr.push(item.path);
    if (item.children?.length) getMenuListPath(item.children, menuPathArr);
  }
  return menuPathArr;
}

/**
 * @description 递归查询当前 path 所对应的菜单对象 (该函数暂未使用)
 * @param {Array} menuList 菜单列表
 * @param {String} path 当前访问地址
 * @returns {Object | null}
 */
export function findMenuByPath(menuList: Menu.MenuOptions[], path: string): Menu.MenuOptions | null {
  for (const item of menuList) {
    if (item.path === path) return item;
    if (item.children) {
      const res = findMenuByPath(item.children, path);
      if (res) return res;
    }
  }
  return null;
}

/**
 * @description 使用递归过滤需要缓存的菜单 name (该函数暂未使用)
 * @param {Array} menuList 所有菜单列表
 * @param {Array} keepAliveNameArr 缓存的菜单 name ['**','**']
 * @returns {Array}
 * */
export function getKeepAliveRouterName(menuList: Menu.MenuOptions[], keepAliveNameArr: string[] = []) {
  menuList.forEach(item => {
    item.meta.isKeepAlive && item.name && keepAliveNameArr.push(item.name);
    item.children?.length && getKeepAliveRouterName(item.children, keepAliveNameArr);
  });
  return keepAliveNameArr;
}

/**
 * @description 使用递归返回给定的path的路径
 * @param {Array} menuList 所有菜单列表
 * @param {Array} targetPath 目标path
 * @returns {Array}
 * */
export function getTargetPathRoute(menuList: Menu.MenuOptions[], targetPath: string) {
  // 递归查找路径的辅助函数
  const _findPath = (node: Menu.MenuOptions, currentPath: string[]): string[] | null => {
    if (node.path === targetPath) {
      return [...currentPath, node.path];
    }

    if (node.children) {
      for (const child of node.children) {
        const result = _findPath(child, [...currentPath, node.path]);
      if (result) {
        return result;
      }
    }
    }

    return null;
  };

  // 遍历菜单列表，查找目标路径
  for (const node of menuList) {
    const result = _findPath(node, []);
    if (result) {
      return result;
    }
  }

  return null;
}

/**
 * @description 格式化表格单元格默认值 (el-table-column)
 * @param {Number} row 行
 * @param {Number} col 列
 * @param {*} callValue 当前单元格值
 * @returns {String}
 * */
export function formatTableColumn(row: number, col: number, callValue: any) {
  // 如果当前值为数组，使用 / 拼接（根据需求自定义）
  if (isArray(callValue)) return callValue.length ? callValue.join(" / ") : "--";
  return callValue ?? "--";
}

/**
 * @description 处理 ProTable 值为数组 || 无数据
 * @param {*} callValue 需要处理的值
 * @returns {String}
 * */
export function formatValue(callValue: any) {
  // 如果当前值为数组，使用 / 拼接（根据需求自定义）
  if (isArray(callValue)) return callValue.length ? callValue.join(" / ") : "--";
  return callValue ?? "--";
}

/**
 * @description 处理 prop 为多级嵌套的情况，返回的数据 (列如: prop: user.name)
 * @param {Object} row 当前行数据
 * @param {String} prop 当前 prop
 * @returns {*}
 * */
export function handleRowAccordingToProp(row: { [key: string]: any }, prop: string) {
  if (!prop.includes(".")) return row[prop] ?? "--";
  prop.split(".").forEach(item => (row = row[item] ?? "--"));
  return row;
}

/**
 * @description 处理 prop，当 prop 为多级嵌套时 ==> 返回最后一级 prop
 * @param {String} prop 当前 prop
 * @returns {String}
 * */
export function handleProp(prop: string) {
  const propArr = prop.split(".");
  if (propArr.length == 1) return prop;
  return propArr[propArr.length - 1];
}


/**
 * @description 递归查找 callValue 对应的 enum 值
 * */
export function findItemNested(enumData: any, callValue: any, value: string, children: string) {
  return enumData.reduce((accumulator: any, current: any) => {
    if (accumulator) return accumulator;
    if (current[value] === callValue) return current;
    if (current[children]) return findItemNested(current[children], callValue, value, children);
  }, null);
}


