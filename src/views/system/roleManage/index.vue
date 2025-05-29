<script setup lang="ts" name="roleManage">
import type { Dayjs } from 'dayjs'
import type { ColumnProps } from '@/components/ProTable/type/index'
import { DeleteOutlined, ExclamationCircleOutlined, UsergroupAddOutlined } from '@ant-design/icons-vue'
import { Modal } from 'ant-design-vue'
import { createVNode } from 'vue'
import { getUserRoleList } from '@/api/modules/user'

type Key = string | number
const state = reactive<{
  selectedRowKeys: Key[]
}>({
  selectedRowKeys: [],
})

const columns: ColumnProps[] = [
  {
    title: '序号',
    dataIndex: 'index',
    align: 'center',
    width: '6%',
  },
  {
    title: '角色名称',
    dataIndex: 'rolename',
    search: {
      el: 'input',
    },
  },
  {
    title: '角色状态',
    dataIndex: 'status',
    width: 80,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    search: {
      el: 'date-picker',
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
    title: '备注',
    dataIndex: 'remark',
    ellipsis: true,
    width: '30%',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: 100,
  },
]

const pagination = ref({
  current: 1,
  pageSize: 10,
  total: 0,
})

async function getUserListFn(params: any) {
  return await getUserRoleList(params)
}

function onSelectChange(selectedRowKeys: Key[]) {
  console.log('selectedRowKeys changed: ', selectedRowKeys)
  state.selectedRowKeys = selectedRowKeys
}

function handleAdd() {}
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
    onCancel() {},
  })
}
</script>

<template>
  <ProTable
    :request-api="getUserListFn" :columns="columns" :pageable="pagination"
    :tool-button="['refresh', 'search', 'setting']"
    :row-selection="{ selectedRowKeys: state.selectedRowKeys, onChange: onSelectChange }"
  >
    <template #tableHeader>
      <a-button type="primary" @click="handleAdd">
        <UsergroupAddOutlined />
        新增角色
      </a-button>
      <a-button type="primary" :disabled="!state.selectedRowKeys.length" @click="handleDel">
        <template #icon><DeleteOutlined /></template>
        删除角色
      </a-button>
    </template>
    <template #status-body="scope">
      <a-switch v-model:checked="scope.record.status" :checked-value="1" :un-checked-value="0" checked-children="启用" un-checked-children="关闭" />
    </template>
    <template #operation-body>
      <div>
        <a @click="handleDel">删除</a>
        <a-divider type="vertical" />
        <a class="ant-dropdown-link">详情</a>
      </div>
    </template>
  </ProTable>
</template>
