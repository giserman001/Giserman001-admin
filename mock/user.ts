import { faker } from "@faker-js/faker";
// import Mock from "mockjs";
import { defineFakeRoute } from "vite-plugin-fake-server/client";
import authMenuList from "./utils/data/menu";
import { createResponse } from './utils/index'

export default defineFakeRoute([
  {
    url: '/login',
    method: 'post',
    response: (data) => {
      if (['admin', 'test'].includes(data.body.username)) {
        return createResponse({
          token: 'S:172285ffc872ab680e068bde360eae8f',
        })
      } else {
        return createResponse(null, 403,'用户名或密码错误')
      }
    },
  },
  {
    url: '/userInfo',
    method: 'get',
    response: () => {
      return createResponse({
        id: faker.string.uuid(),
        avatar: faker.image.avatar(),
        birthday: faker.date.birthdate(),
        email: faker.internet.email(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        sex: faker.person.sexType(),
        roles: ["admin"],
        // avatar: 'https://picsum.photos/400/200?random=1'
      })
    },
  },
  {
    url: '/menu/list',
    method: 'get',
    response: () => {
      return createResponse(authMenuList)
    },
  },
  {
    url: '/auth/buttons',
    method: 'get',
    response: () => {
      return createResponse({
        "useProTable": ["add", "batchAdd", "export", "batchDelete", "status"],
        "authButton": ["add", "edit", "delete", "import", "export"]
      })
    },
  },
  {
    url: '/logout',
    method: 'post',
    response: () => {
      return createResponse(null)
    },
  },
])