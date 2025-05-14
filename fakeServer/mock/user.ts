import { faker } from "@faker-js/faker";
// import Mock from "mockjs";
import { defineFakeRoute } from "vite-plugin-fake-server/client";
import authMenuList from "../data/menu";

export default defineFakeRoute([
  {
    url: '/login',
    method: 'post',
    response: (data) => {
      if (['admin', 'test'].includes(data.body.username)) {
        return {
          code: 0,
          msg: 'ok',
          data: {
            token: 'S:172285ffc872ab680e068bde360eae8f',
          }
        }
      } else {
        return {
          code: 403,
          msg: '用户名或密码错误'
        }
      }
    },
  },
  {
    url: '/userInfo',
    method: 'get',
    response: () => {
      return {
        code: 0,
        msg: 'ok',
        data: {
          id: faker.string.uuid(),
          avatar: faker.image.avatar(),
          birthday: faker.date.birthdate(),
          email: faker.internet.email(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          sex: faker.person.sexType(),
          roles: ["admin"],
          // avatar: 'https://picsum.photos/400/200?random=1'
        }
      }
    },
  },
  {
    url: '/menu/list',
    method: 'get',
    response: () => {
      return {
        code: 0,
        msg: 'ok',
        data: authMenuList
      }
    },
  },
  {
    url: '/auth/buttons',
    method: 'get',
    response: () => {
      return {
        code: 0,
        msg: 'ok',
        data: {
          "useProTable": ["add", "batchAdd", "export", "batchDelete", "status"],
          "authButton": ["add", "edit", "delete", "import", "export"]
        }
      }
    },
  },
  {
    url: '/logout',
    method: 'post',
    response: () => {
      return {
        code: 0,
        msg: 'ok',
        data: null
      }
    },
  },
])