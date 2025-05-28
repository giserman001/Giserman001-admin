<script setup lang="ts" name="roleManage">
import type { ColumnProps } from '@/components/ProTable/type/index'
import { getUserList } from '@/api/modules/user'

const columns: ColumnProps[] = [
  {
    title: '序号',
    dataIndex: 'index',
    align: 'center',
    width: '6%',
  },
  {
    title: '头像',
    dataIndex: 'avatar',
  },
  {
    title: '用户名',
    dataIndex: 'username',
    search: {
      el: 'input',
    },
  },
  {
    title: '性别',
    dataIndex: 'sex',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    search: {
      el: 'input',
    },
  },
  {
    title: '角色',
    dataIndex: 'role',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
  },
  {
    title: '修改时间',
    dataIndex: 'updateTime',
  },
  {
    title: '操作',
    dataIndex: 'operation',
  },
]

const pagination = ref({
  current: 1,
  pageSize: 10,
  total: 0,
})

async function getUserListFn(params: any) {
  return await getUserList(params)
}

async function handleDelete() {

}
</script>

<template>
  <ProTable :request-api="getUserListFn" :columns="columns" :pageable="pagination" :tool-button="['refresh', 'search', 'setting']">
    <template #avatar-body="scope">
      <a-avatar :src="scope.record.avatar" />
    </template>
    <template #role-body="scope">
      <a-tag v-for="item in scope.record.role" :key="item" color="blue">{{ item }}</a-tag>
    </template>
    <template #sex-body="scope">
      {{ scope.record.sex === 1 ? '男' : '女' }}
    </template>
    <template #operation-body>
      <span>
        <a @click="handleDelete">删除</a>
        <a-divider type="vertical" />
        <a class="ant-dropdown-link">更多操作</a>
      </span>
    </template>
  </ProTable>
</template>
