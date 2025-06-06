<script setup lang="ts" name="roleManage">
import type { Rule } from 'ant-design-vue/es/form'
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
    title: '角色标识',
    dataIndex: 'roleTag',
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

const form = reactive({
  name: '',
  description: '',
})

const rules: Record<string, Rule[]> = {
  name: [{ required: true, message: 'Please enter user name' }],
  url: [{ required: true, message: 'please enter url' }],
  owner: [{ required: true, message: 'Please select an owner' }],
  type: [{ required: true, message: 'Please choose the type' }],
  approver: [{ required: true, message: 'Please choose the approver' }],
  dateTime: [{ required: true, message: 'Please choose the dateTime', type: 'object' }],
  description: [{ required: true, message: 'Please enter url description' }],
}

const open = ref<boolean>(false)

function showDrawer() {
  open.value = true
}

function onClose() {
  open.value = false
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
        <a-button type="primary" @click="showDrawer">
          <UsergroupAddOutlined />
          新增角色
        </a-button>
        <a-button type="primary" :disabled="!state.selectedRowKeys.length" @click="handleDel">
          <template #icon><DeleteOutlined /></template>
          删除角色
        </a-button>
      </template>
      <template #status-body="scope">
        <a-switch v-model:checked="scope.record.status" :checked-value="1" :un-checked-value="0" checked-children="启用" un-checked-children="禁用" />
      </template>
      <template #operation-body>
        <div>
          <a @click="showDrawer">编辑</a>
          <a-divider type="vertical" />
          <a @click="handleDel">删除</a>
          <a-divider type="vertical" />
          <a class="ant-dropdown-link">设置权限</a>
        </div>
      </template>
    </ProTable>
    <a-drawer
      title="新增角色"
      :width="620"
      :open="open"
      :body-style="{ paddingBottom: '80px' }"
      :footer-style="{ textAlign: 'right' }"
      @close="onClose"
    >
      <a-form :model="form" :rules="rules" layout="vertical">
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="角色名称" name="name">
              <a-input v-model:value="form.name" placeholder="请输入角色名称" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="角色标识" name="name">
              <a-input v-model:value="form.name" placeholder="请输入角色标识" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="角色状态" name="name">
              <a-select v-model:value="form.name" placeholder="请选择角色状态">
                <a-select-option value="1">启用</a-select-option>
                <a-select-option value="0">禁用</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="24">
            <a-form-item label="备注" name="description">
              <a-textarea
                v-model:value="form.description"
                :rows="4"
                placeholder="请输入备注"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <template #extra>
        <a-space>
          <a-button @click="onClose">取消</a-button>
          <a-button type="primary" @click="onClose">确定</a-button>
        </a-space>
      </template>
    </a-drawer>
  </div>
</template>
