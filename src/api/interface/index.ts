// 请求响应参数（不包含data）
export interface Result {
  code: number
  msg: string
}

// 请求响应参数（包含data）
export interface ResultData<T = any> extends Result {
  data: T
}

// 分页响应参数
export interface ResPage<T> {
  list: T[]
  pageNum: number
  pageSize: number
  total: number
}

// 分页请求参数
export interface ReqPage {
  pageNum: number
  pageSize: number
}

// 文件上传模块
export namespace Upload {
  export interface ResFileUrl {
    fileUrl: string
  }
}

// 登录模块
export namespace Login {
  export interface ReqLoginForm {
    username: string
    password: string
  }
  export interface ResLogin {
    access_token: string
  }
  export interface ResAuthButtons {
    [key: string]: string[]
  }
}

// 用户管理模块
export namespace User {
  export interface ReqUserParams extends ReqPage {
    username: string
    gender: number
    email: string
    createTime: string[]
    status: number
  }
  export interface ResUserList {
    id: string
    username: string
    gender: number
    user: { detail: { age: number } }
    idCard: string
    email: string
    address: string
    createTime: string
    status: number
    avatar: string
    photo: any[]
    children?: ResUserList[]
  }
}

// 用户管理模块
export namespace Role {
  export interface ReqRoleParams extends ReqPage {
    rolename: string
    createTime: string
  }
  export interface ResUserList {
    id: number
    rolename: string
    status: 0 | 1
    remark: string
    createTime: string
    updateTime: string
  }
}

// 部门管理模块
export namespace Dept {
  export interface ReqDeptParams extends ReqPage {
    name: string
  }
  export interface ResDeptList {
    name: string
    parentId: number
    id: number
    sort: number
    phone: string
    principal: string
    email: string
    status: number // 状态 1 启用 0 停用
    type: number // 1 公司 2 分公司 3 部门
    createTime: string
    remark: string
  }
}
