<script setup lang="ts" name="accountManage">
import { message } from 'ant-design-vue'

const dataSource = ref([{
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
const columns = [
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
    dataIndex: 'operation',
  },
]
</script>

<template>
  <ProTable :columns="columns" :data-source="dataSource">
    <template #username-header="column">
      <a-button type="primary">
        {{ column.title }}
      </a-button>
    </template>
    <template #dbname-header="column">
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
        <a class="ant-dropdown-link">
          更多操作
          <down-outlined />
        </a>
      </span>
    </template>
    <template #table-title>
      head
    </template>
    <template #table-footer>
      head
    </template>
  </ProTable>
</template>
