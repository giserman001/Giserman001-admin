import { faker } from '@faker-js/faker/locale/zh_CN'
import { defineFakeRoute } from 'vite-plugin-fake-server/client'
import { createPageResponse, createResponse, getPagesItems } from './utils/index'

export default defineFakeRoute([
  // 用户管理
  {
    url: '/user/list',
    method: 'post',
    response: ({ body }) => {
      const { current, pageSize } = body
      const pages = Array.from({ length: 200 }, () => ({
        username: faker.person.fullName(),
        nickname: faker.person.firstName(),
        avatar: faker.image.avatar(),
        phone: faker.phone.number({ style: 'international' }),
        email: faker.internet.email(),
        sex: faker.number.int({ min: 1, max: 2 }), // 1男 2女
        id: faker.string.uuid(),
        status: faker.number.int({ min: 0, max: 1 }),
        role: Array.from(new Set(Array.from(
          { length: faker.number.int({ min: 1, max: 4 }) },
          () => faker.helpers.arrayElement(['admin', 'common', 'test']),
        ))),
        dept: { // 部门
          id: faker.string.uuid(),
          name: faker.company.name(),
        },
        remark: faker.lorem.paragraph(),
        createTime: faker.date.anytime(),
        updateTime: faker.date.anytime(),
      }))
      return createPageResponse(getPagesItems(pages, current, pageSize))
    },
  },
  // 角色管理
  {
    url: '/role/list',
    method: 'post',
    response: ({ body }) => {
      const { current, pageSize } = body
      let list = [
        {
          createTime: '2025-6-9 14:57:13', // 时间戳（毫秒ms）
          updateTime: '2025-6-9 14:57:25',
          id: 1,
          rolename: '超级管理员',
          roleTag: 'admin',
          status: 1, // 状态 1 启用 0 停用
          remark: '超级管理员拥有最高权限',
        },
        {
          createTime: '2025-6-9 14:57:35',
          updateTime: '2025-6-9 14:57:43',
          id: 2,
          rolename: '普通角色',
          roleTag: 'common',
          status: 1,
          remark: '普通角色拥有部分权限',
        },
      ]
      if (body?.rolename) {
        list = list.filter(item => item.rolename.includes(body?.rolename))
      }

      if (body?.status) {
        list = list.filter(item => String(item.status).includes(String(body?.status)))
      }
      if (body.code) {
        list = list.filter(item => item.roleTag === body.roleTag)
      }
      return createPageResponse(getPagesItems(list, current, pageSize))
    },
  },
  // 部门管理
  {
    url: '/dept/list',
    method: 'post',
    response: () => {
      return createResponse([
        {
          name: '杭州总公司',
          parentId: 0,
          id: 100,
          sort: 0,
          phone: faker.phone.number({ style: 'international' }),
          principal: faker.person.firstName(),
          email: faker.internet.email(),
          status: 1, // 状态 1 启用 0 停用
          type: 1, // 1 公司 2 分公司 3 部门
          createTime: faker.date.anytime(),
          remark: '这里是备注信息这里是备注信息这里是备注信息这里是备注信息',
        },
        {
          name: '郑州分公司',
          parentId: 100,
          id: 101,
          sort: 1,
          phone: faker.phone.number({ style: 'international' }),
          principal: faker.person.firstName(),
          email: faker.internet.email(),
          status: 1,
          type: 2,
          createTime: faker.date.anytime(),
          remark: '这里是备注信息这里是备注信息这里是备注信息这里是备注信息',
        },
        {
          name: '研发部门',
          parentId: 101,
          id: 103,
          sort: 1,
          phone: faker.phone.number({ style: 'international' }),
          principal: faker.person.firstName(),
          email: faker.internet.email(),
          status: 1,
          type: 3,
          createTime: faker.date.anytime(),
          remark: '这里是备注信息这里是备注信息这里是备注信息这里是备注信息',
        },
        {
          name: '市场部门',
          parentId: 102,
          id: 108,
          sort: 1,
          phone: faker.phone.number({ style: 'international' }),
          principal: faker.person.firstName(),
          email: faker.internet.email(),
          status: 1,
          type: 3,
          createTime: faker.date.anytime(),
          remark: '这里是备注信息这里是备注信息这里是备注信息这里是备注信息',
        },
        {
          name: '深圳分公司',
          parentId: 100,
          id: 102,
          sort: 2,
          phone: faker.phone.number({ style: 'international' }),
          principal: faker.person.firstName(),
          email: faker.internet.email(),
          status: 1,
          type: 2,
          createTime: faker.date.anytime(),
          remark: '这里是备注信息这里是备注信息这里是备注信息这里是备注信息',
        },
        {
          name: '市场部门',
          parentId: 101,
          id: 104,
          sort: 2,
          phone: faker.phone.number({ style: 'international' }),
          principal: faker.person.firstName(),
          email: faker.internet.email(),
          status: 1,
          type: 3,
          createTime: faker.date.anytime(),
          remark: '这里是备注信息这里是备注信息这里是备注信息这里是备注信息',
        },
        {
          name: '财务部门',
          parentId: 102,
          id: 109,
          sort: 2,
          phone: faker.phone.number({ style: 'international' }),
          principal: faker.person.firstName(),
          email: faker.internet.email(),
          status: 1,
          type: 3,
          createTime: faker.date.anytime(),
          remark: '这里是备注信息这里是备注信息这里是备注信息这里是备注信息',
        },
        {
          name: '测试部门',
          parentId: 101,
          id: 105,
          sort: 3,
          phone: faker.phone.number({ style: 'international' }),
          principal: faker.person.firstName(),
          email: faker.internet.email(),
          status: 0,
          type: 3,
          createTime: faker.date.anytime(),
          remark: '这里是备注信息这里是备注信息这里是备注信息这里是备注信息',
        },
        {
          name: '财务部门',
          parentId: 101,
          id: 106,
          sort: 4,
          phone: faker.phone.number({ style: 'international' }),
          principal: faker.person.firstName(),
          email: faker.internet.email(),
          status: 1,
          type: 3,
          createTime: faker.date.anytime(),
          remark: '这里是备注信息这里是备注信息这里是备注信息这里是备注信息',
        },
        {
          name: '运维部门',
          parentId: 101,
          id: 107,
          sort: 5,
          phone: faker.phone.number({ style: 'international' }),
          principal: faker.person.firstName(),
          email: faker.internet.email(),
          status: 0,
          type: 3,
          createTime: faker.date.anytime(),
          remark: '这里是备注信息这里是备注信息这里是备注信息这里是备注信息',
        },
      ])
    },
  },
  // 在线用户
  {
    url: '/online-logs',
    method: 'post',
    response: ({ body }) => {
      let list = [
        {
          id: 1,
          username: 'admin',
          ip: faker.internet.ipv4(),
          address: '中国河南省信阳市',
          system: 'macOS',
          browser: 'Chrome',
          loginTime: new Date(),
        },
        {
          id: 2,
          username: 'common',
          ip: faker.internet.ipv4(),
          address: '中国广东省深圳市',
          system: 'Windows',
          browser: 'Firefox',
          loginTime: new Date(),
        },
      ]
      list = list.filter(item => item.username.includes(body?.username))
      return {
        msg: 'ok',
        data: {
          list,
          total: list.length, // 总条目数
          pageSize: 10, // 每页显示条目个数
          currentPage: 1, // 当前页数
        },
        code: 200,
      }
    },
  },
  // 登录日志
  {
    url: '/login-logs',
    method: 'post',
    response: ({ body }) => {
      let list = [
        {
          id: 1,
          username: 'admin',
          ip: faker.internet.ipv4(),
          address: '中国河南省信阳市',
          system: 'macOS',
          browser: 'Chrome',
          status: 1, // 登录状态 1 成功 0 失败
          behavior: '账号登录',
          loginTime: new Date(),
        },
        {
          id: 2,
          username: 'common',
          ip: faker.internet.ipv4(),
          address: '中国广东省深圳市',
          system: 'Windows',
          browser: 'Firefox',
          status: 0,
          behavior: '第三方登录',
          loginTime: new Date(),
        },
      ]
      list = list.filter(item => item.username.includes(body?.username))
      list = list.filter(item =>
        String(item.status).includes(String(body?.status)),
      )
      return createPageResponse({
        list,
        total: list.length, // 总条目数
        pageSize: 10, // 每页显示条目个数
        pageNum: 1, // 当前页数
      })
    },
  },
  // 操作日志
  {
    url: '/operation-logs',
    method: 'post',
    response: ({ body }) => {
      let list = [
        {
          id: 1,
          username: 'admin',
          ip: faker.internet.ipv4(),
          address: '中国河南省信阳市',
          system: 'macOS',
          browser: 'Chrome',
          status: 1, // 操作状态 1 成功 0 失败
          summary: '菜单管理-添加菜单', // 操作概要
          module: '系统管理', // 所属模块
          operatingTime: new Date(), // 操作时间
        },
        {
          id: 2,
          username: 'common',
          ip: faker.internet.ipv4(),
          address: '中国广东省深圳市',
          system: 'Windows',
          browser: 'Firefox',
          status: 0,
          summary: '列表分页查询',
          module: '在线用户',
          operatingTime: new Date(),
        },
      ]
      list = list.filter(item => item.module.includes(body?.module))
      list = list.filter(item =>
        String(item.status).includes(String(body?.status)),
      )
      return createPageResponse({
        list,
        total: list.length, // 总条目数
        pageSize: 10, // 每页显示条目个数
        pageNum: 1, // 当前页数
      })
    },
  },
  // 系统日志
  {
    url: '/system-logs',
    method: 'post',
    response: ({ body }) => {
      let list = [
        {
          id: 1, // 日志ID
          /**
           * 日志级别
           * 0 debug调试（最低级别的日志，用于调试和开发阶段）
           * 1 info信息（默认级别，用于记录一般的信息）
           * 2 warn警告（表示可能出现的问题或潜在的错误，但不会影响系统的正常运行）
           * 3 error错误（表示发生了错误，但不会导致系统崩溃）
           * 4 fatal致命（最高级别的日志，表示发生了严重错误，导致系统无法继续运行）
           */
          level: 1,
          module: '菜单管理', // 所属模块
          url: '/menu', // 请求接口
          method: 'post', // 请求方法
          ip: faker.internet.ipv4(),
          address: '中国河南省信阳市',
          system: 'macOS',
          browser: 'Chrome',
          /**
           * 请求耗时（单位：ms 毫秒）
           * 正常耗时：一般认为在几百毫秒（0.1-0.5秒）范围内的请求耗时较为正常
           * 较慢耗时：在1秒以上的耗时可以被认为是较慢的请求，但具体是否较慢还需要根据具体业务场景和性能要求来判断
           */
          takesTime: 10,
          requestTime: new Date(), // 请求时间
        },
        {
          id: 2,
          level: 0,
          module: '地图',
          url: '/get-map-info',
          method: 'get',
          ip: faker.internet.ipv4(),
          address: '中国广东省深圳市',
          system: 'Windows',
          browser: 'Firefox',
          takesTime: 1200,
          requestTime: new Date(),
        },
      ]
      list = list.filter(item => item.module.includes(body?.module))
      return createPageResponse({
        list,
        total: list.length, // 总条目数
        pageSize: 10, // 每页显示条目个数
        pageNum: 1, // 当前页数
      })
    },
  },
])
