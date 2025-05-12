/**
 * Independent time operation tool to facilitate subsequent switch to dayjs
 */
import dayjs from 'dayjs'

import durationPlug from 'dayjs/plugin/duration'
import isLeapYear from 'dayjs/plugin/isLeapYear' // import plugin
import isoWeekPlug from 'dayjs/plugin/isoWeek'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import relativeTime from 'dayjs/plugin/relativeTime'

// import 'dayjs/locale/zh-cn' // import locale

dayjs.extend(isLeapYear) // use plugin
dayjs.extend(relativeTime)
dayjs.extend(durationPlug)
dayjs.extend(isoWeekPlug)
dayjs.extend(isSameOrAfter)
// dayjs.locale('zh-cn') // use locale

type DayJsDate = string | number | dayjs.Dayjs | Date | null | undefined

export const dateUtil = dayjs

export function dateFormat(date: DayJsDate = new Date(), template = 'YYYY-MM-DD') {
  return dayjs(date).format(template)
}

export function dateDuration(time: number, unit: durationPlug.DurationUnitType) {
  const ctx = dayjs.duration(time, unit)

  interface Ret {
    seconds: number
    minutes: number
    hours: number
    days: number
  }

  const ret: Ret = (ctx as any).$d
  const asDays = ~~ctx.asDays()
  const asHours = ~~ctx.asHours()
  const asMinutes = ~~ctx.asMinutes()

  function getFormat() {
    return `${asDays ? `${asDays}天` : ''}${ret.hours ? `${ret.hours}小时` : ''}${
      ret.minutes ? `${ret.minutes}分钟` : ''
    }${ret.seconds ? `${ret.seconds}秒` : ''}`
  }
  return {
    getFormat,
    asDays,
    asHours,
    asMinutes,
    ...ret,
  }
}

export function dateFromNow(date: DayJsDate, withoutSuffix = false) {
  return dayjs(date).fromNow(withoutSuffix)
}

export function isToday(date: DayJsDate) {
  return dayjs().format('YYYY-MM-DD') === dayjs(date).format('YYYY-MM-DD')
}

export function isThisMonth(date: DayJsDate) {
  return dayjs().format('YYYY-MM') === dayjs(date).format('YYYY-MM')
}

export function isThisWeek(date: DayJsDate) {
  return dayjs().isoWeek() === dayjs(date).isoWeek()
}

export default dayjs
