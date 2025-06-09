<script setup lang="ts" name="departmentManage">
import type { TreeSelectProps } from 'ant-design-vue'
import type { Rule } from 'ant-design-vue/es/form'
import type { ColumnProps } from '@/components/ProTable/type/index'
import { ExclamationCircleOutlined, UsergroupAddOutlined } from '@ant-design/icons-vue'
import { Modal } from 'ant-design-vue'
import { createVNode } from 'vue'
import { getDeptList } from '@/api/modules/user'
import { handleTree } from '@/utils/tree'

const deptModalVisible = ref(false)
const formState = reactive({
  name: '',
  email: '',
  phone: '',
  resource: '1',
  delivery: 1,
})

const treeData = ref<TreeSelectProps['treeData']>([
  {
    label: 'root 1',
    value: 'root 1',
    children: [
      {
        label: 'parent 1',
        value: 'parent 1',
        children: [
          {
            label: 'parent 1-0',
            value: 'parent 1-0',
            children: [
              {
                label: 'my leaf',
                value: 'leaf1',
              },
              {
                label: 'your leaf',
                value: 'leaf2',
              },
            ],
          },
          {
            label: 'parent 1-1',
            value: 'parent 1-1',
          },
        ],
      },
      {
        label: 'parent 2',
        value: 'parent 2',
      },
    ],
  },
])

const columns: ColumnProps[] = [
  {
    title: '部门名称',
    dataIndex: 'name',
  },
  {
    title: '排序',
    dataIndex: 'sort',
  },
  {
    title: '状态',
    dataIndex: 'status',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: 180,
  },
]

async function getUserListFn() {
  const res = await getDeptList()
  res.data = handleTree(res.data)
  treeData.value = res.data
  return res
}

function handleAdd() {
  deptModalVisible.value = true
}
function handleDel() {
  Modal.confirm({
    title: '确认',
    icon: createVNode(ExclamationCircleOutlined),
    content: '确认删除部门?',
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

const labelCol = { style: { width: '80px' } }

const rules: Record<string, Rule[]> = {
  name: [{ required: true, message: '请输入' }],
}

function handleOk() {
  console.log('submit!', toRaw(formState))
  deptModalVisible.value = false
}
</script>

<template>
  <div>
    <ProTable
      :request-api="getUserListFn" :columns="columns" :pageable="false"
      :tool-button="['refresh', 'search', 'setting']" row-key="id" :default-expanded-row-keys="[100, 101]"
    >
      <template #tableHeader>
        <a-button type="primary" @click="handleAdd">
          <UsergroupAddOutlined />
          新增部门
        </a-button>
      </template>
      <template #status-body="scope">
        <a-tag v-if="scope.record.status === 1" color="#2db7f5">启用</a-tag>
        <a-tag v-else color="#f50">禁用</a-tag>
      </template>
      <template #operation-body>
        <div>
          <a>编辑</a>
          <a-divider type="vertical" />
          <a @click="handleDel">删除</a>
        </div>
      </template>
    </ProTable>
    <ProModal v-model:open="deptModalVisible" name="新增部门" width="600px" @ok="handleOk">
      <a-form :model="formState" :rules="rules" layout="horizontal" :label-col="labelCol">
        <a-row>
          <a-col :span="24">
            <a-form-item label="上级部门">
              <a-tree-select
                v-model:value="formState.name" show-search style="width: 100%"
                :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }" placeholder="请选择部门" allow-clear
                tree-default-expand-all :tree-data="treeData" tree-node-filter-prop="name"
                :field-names="{
                  children: 'children',
                  label: 'name',
                  value: 'id',
                }"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="部门名称">
              <a-input v-model:value="formState.name" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="部门负责人">
              <a-input v-model:value="formState.name" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="手机号">
              <a-input v-model:value="formState.name" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="邮箱">
              <a-input v-model:value="formState.name" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="排序">
              <a-input-number v-model:value="formState.name" :min="0" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="部门状态">
              <a-switch
                v-model:checked="formState.delivery" :checked-value="1" :un-checked-value="0"
                checked-children="启用" un-checked-children="禁用"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24">
            <a-form-item label="备注">
              <a-textarea v-model:value="formState.name" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </ProModal>
  </div>
</template>
