<script setup lang="ts" name="accountManage">
import type { Dayjs } from 'dayjs'
import type { ColumnProps } from '@/components/ProTable/type/index'
import { DeleteOutlined, ExclamationCircleOutlined, UsergroupAddOutlined } from '@ant-design/icons-vue'
import { Modal } from 'ant-design-vue'
import dayjs from 'dayjs'
import { createVNode } from 'vue'
import { getUserList } from '@/api/modules/user'

type Key = string | number
const state = reactive<{
  selectedRowKeys: Key[]
}>({
  selectedRowKeys: [], // Check here to configure the default column
})

const defaultTime = ref<Dayjs>(dayjs('2015-06-06', 'YYYY-MM-DD'))

const userModalVisible = ref(false)

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
    search: {
      el: 'select',
      options: [
        { label: '男', value: 1 },
        { label: '女', value: 2 },
      ],
    },
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
    search: {
      el: 'date-picker',
      defaultValue: defaultTime.value,
      props: {
        dateFormat: 'YYYY-MM-DD',
      },
      events: {
        change: (date: [Dayjs, Dayjs], dateString: [string, string]) => {
          console.log('时间变化=>', dateString, date)
        },
      },
    },
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

function onSelectChange(selectedRowKeys: Key[]) {
  console.log('selectedRowKeys changed: ', selectedRowKeys)
  state.selectedRowKeys = selectedRowKeys
}

function handleAdd() {
  userModalVisible.value = true
}
function handleDel() {
  Modal.confirm({
    title: '确认',
    icon: createVNode(ExclamationCircleOutlined),
    content: '确认删除用户?',
    okText: '确认',
    cancelText: '取消',
    onOk() {
      return new Promise((resolve, reject) => {
        setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
      }).catch(() => console.log('errors!'))
    },
    onCancel() { },
  })
}
</script>

<template>
  <div>
    <ProTable
      :request-api="getUserListFn" :columns="columns" :pageable="pagination"
      :tool-button="['refresh', 'search', 'setting']"
      :row-selection="{ selectedRowKeys: state.selectedRowKeys, onChange: onSelectChange }"
    >
      <template #tableHeader>
        <a-button type="primary" @click="handleAdd">
          <UsergroupAddOutlined />
          新增用户
        </a-button>
        <a-button type="primary" :disabled="!state.selectedRowKeys.length" @click="handleDel">
          <template #icon>
            <DeleteOutlined />
          </template>
          删除用户
        </a-button>
      </template>
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
        <div>
          <a @click="handleDel">删除</a>
          <a-divider type="vertical" />
          <a class="ant-dropdown-link">详情</a>
        </div>
      </template>
    </ProTable>
    <ProModal v-model:open="userModalVisible">
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </ProModal>
  </div>
</template>
