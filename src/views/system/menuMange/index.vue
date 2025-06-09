<script setup lang="ts" name="menuMange">
import type { TreeSelectProps } from 'ant-design-vue'
import type { Rule } from 'ant-design-vue/es/form'
import type { ColumnProps } from '@/components/ProTable/type/index'
import { ExclamationCircleOutlined, UsergroupAddOutlined } from '@ant-design/icons-vue'
import { Modal } from 'ant-design-vue'
import { createVNode } from 'vue'
import { getAuthMenuListApi } from '@/api/modules/login'

const formState = reactive({
  name: '',
  email: '',
  phone: '',
  resource: '1',
  delivery: 1,
})

const rules: Record<string, Rule[]> = {
  name: [{ required: true, message: '请输入' }],
}

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
    title: '菜单名称',
    dataIndex: ['meta', 'title'],
  },
  {
    title: '路由名称',
    dataIndex: 'name',
  },
  {
    title: '路由路径',
    dataIndex: 'path',
  },
  {
    title: '组件路径',
    dataIndex: 'component',
  },
  {
    title: '是否全屏',
    dataIndex: 'isFull',
  },
  {
    title: '是否缓存',
    dataIndex: 'isKeepAlive',
  },
  // {
  //   title: '创建时间',
  //   dataIndex: 'createTime',
  //   search: {
  //     el: 'date-picker',
  //     props: {
  //       dateFormat: 'YYYY-MM-DD',
  //     },
  //     events: {
  //       change: (date: [Dayjs, Dayjs], dateString: [string, string]) => {
  //         console.log('时间变化=>', dateString, date)
  //       },
  //     },
  //   },
  // },
  // {
  //   title: '修改时间',
  //   dataIndex: 'updateTime',
  // },
  {
    title: '图标',
    dataIndex: ['meta', 'icon'],
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: 180,
  },
]

function filterMenuItems(menu: Menu.MenuOptions[]): Menu.MenuOptions[] {
  return menu.filter(item => !item.meta.isHide).map((item) => {
    const children = item.children ? filterMenuItems(item.children) : undefined
    if (children && children.length === 0) {
      return { ...item, children: undefined }
    }
    return { ...item, children }
  })
}

async function getUserListFn() {
  const res = await getAuthMenuListApi()
  res.data = filterMenuItems(res.data)
  treeData.value = res.data
  return res
}

function handleDel() {
  Modal.confirm({
    title: '确认',
    icon: createVNode(ExclamationCircleOutlined),
    content: '确认删除菜单?',
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
      :request-api="getUserListFn" :columns="columns" :pageable="false"
      :tool-button="['refresh', 'search', 'setting']"
      row-key="name"
    >
      <template #tableHeader>
        <a-button type="primary" @click="showDrawer">
          <UsergroupAddOutlined />
          新增菜单
        </a-button>
      </template>
      <template #isFull-body="scope">
        {{ scope.record.meta.isFull ? '是' : '否' }}
      </template>
      <template #isKeepAlive-body="scope">
        {{ scope.record.meta.isKeepAlive ? '是' : '否' }}
      </template>
      <template #operation-body>
        <div>
          <a @click="handleDel">编辑</a>
          <a-divider type="vertical" />
          <a @click="handleDel">删除</a>
        </div>
      </template>
    </ProTable>
    <a-drawer
      title="新增菜单"
      :width="620"
      :open="open"
      :body-style="{ paddingBottom: '80px' }"
      :footer-style="{ textAlign: 'right' }"
      @close="onClose"
    >
      <a-form :model="formState" :rules="rules" layout="vertical">
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="上级菜单">
              <a-tree-select
                v-model:value="formState.name" show-search style="width: 100%"
                :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }" placeholder="请选择部门" allow-clear
                tree-default-expand-all :tree-data="treeData" tree-node-filter-prop="name"
                :field-names="{
                  children: 'children',
                  label: 'name',
                  value: 'path',
                }"
              >
                <template #title="row">
                  {{ row?.meta?.title }}
                </template>
              </a-tree-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="菜单名称">
              <a-input v-model:value="formState.name" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="路由名称">
              <a-input v-model:value="formState.name" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="图标">
              <a-input v-model:value="formState.name" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="路由路径">
              <a-input v-model:value="formState.name" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="组件路径">
              <a-input v-model:value="formState.name" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="是否缓存">
              <a-switch
                v-model:checked="formState.delivery" :checked-value="1" :un-checked-value="0"
                checked-children="是" un-checked-children="否"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="是否全屏">
              <a-switch
                v-model:checked="formState.delivery" :checked-value="1" :un-checked-value="0"
                checked-children="是" un-checked-children="否"
              />
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
            <a-form-item label="权限标识">
              <a-input v-model:value="formState.name" />
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
      <template #extra>
        <a-space>
          <a-button @click="onClose">取消</a-button>
          <a-button type="primary" @click="onClose">确定</a-button>
        </a-space>
      </template>
    </a-drawer>
  </div>
</template>
