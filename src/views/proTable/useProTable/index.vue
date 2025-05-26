<script setup lang="ts" name="accountManage">
import type { ColumnProps } from '@/components/ProTable/type/index'
import { message } from 'ant-design-vue'

interface Test {
  id: number
  numbers: number
  dbname: string
  username: string
  port: number
}

const dataSource = ref<Test[]>([{
  id: 1,
  numbers: 1,
  dbname: 'test_db',
  username: 'admin',
  port: 3306,
}, {
  id: 2,
  numbers: 1,
  dbname: 'test_db',
  username: 'admin',
  port: 3306,
}])

const columns: ColumnProps[] = [
  {
    title: '序号',
    dataIndex: 'numbers',
    width: '6%',
  },
  {
    title: '数据库名',
    dataIndex: 'dbname',
  },
  {
    title: '用户名',
    dataIndex: 'username',
  },
  {
    title: '端口',
    dataIndex: 'port',
  },
  {
    title: '操作',
    isSetting: false,
    dataIndex: 'operation',
  },
]
</script>

<template>
  <ProTable :data-source="dataSource" :columns="columns" :tool-button="['refresh', 'search', 'setting']">
    <template #tableHeader>
      <a-button type="primary">新增用户</a-button>
      <a-button>批量添加用户</a-button>
      <!-- <a-button type="primary">新增用户</a-button>
      <a-button>批量添加用户</a-button>
      <a-button type="primary">新增用户</a-button>
      <a-button>批量添加用户</a-button>
      <a-button type="primary">新增用户</a-button>
      <a-button>批量添加用户</a-button>
      <a-button type="primary">新增用户</a-button>
      <a-button>批量添加用户</a-button>
      <a-button type="primary">新增用户</a-button>
      <a-button>批量添加用户</a-button>
      <a-button type="primary">新增用户</a-button>
      <a-button>批量添加用户</a-button>
      <a-button type="primary">新增用户</a-button>
      <a-button>批量添加用户</a-button>
      <a-button type="primary">新增用户</a-button>
      <a-button>批量添加用户</a-button>
      <a-button type="primary">新增用户</a-button>
      <a-button>批量添加用户</a-button>
      <a-button type="primary">新增用户</a-button>
      <a-button>批量添加用户</a-button>
      <a-button type="primary">新增用户</a-button>
      <a-button>批量添加用户</a-button> -->
    </template>
    <template #username-header="{ column }">
      <a-button type="primary">
        {{ column.title }}
      </a-button>
    </template>
    <template #dbname-header="{ column }">
      <a-button type="primary">
        {{ column.title }}
      </a-button>
    </template>
    <template #port-body="scope">
      <a-button type="primary" @click="message.success('我是通过作用域插槽渲染的内容')">
        {{ scope.column.title }}
        {{ scope.record.port }}
      </a-button>
    </template>
    <template #operation-body>
      <span>
        <a>删除</a>
        <a-divider type="vertical" />
        <a class="ant-dropdown-link">更多操作</a>
      </span>
    </template>
    <template #expandedRowRender="{ record }">
      {{ record.username }}
    </template>
  </ProTable>
</template>
