<script setup lang="ts" name="menuMange">
import type { ColumnProps } from '@/components/ProTable/type/index'
import { ExclamationCircleOutlined, UsergroupAddOutlined } from '@ant-design/icons-vue'
import { Modal } from 'ant-design-vue'
import { createVNode } from 'vue'
import { getAuthMenuListApi } from '@/api/modules/login'

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
  return res
}

function handleAdd() {}
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
</script>

<template>
  <ProTable
    :request-api="getUserListFn" :columns="columns" :pageable="false"
    :tool-button="['refresh', 'search', 'setting']"
    row-key="name"
  >
    <template #tableHeader>
      <a-button type="primary" @click="handleAdd">
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
</template>
