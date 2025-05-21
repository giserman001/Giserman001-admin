<script setup lang="ts" name="accountManage">
import type { ColumnProps } from '@/components/ProTable/type/index'

interface TableDataType {
  key: number
  name: string
  age: number
  street: string
  building: string
  number: number
  companyAddress: string
  companyName: string
  gender: string
}
const columns: ColumnProps[] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
    filters: [
      {
        text: 'Joe',
        value: 'Joe',
      },
      {
        text: 'John',
        value: 'John',
      },
    ],
    onFilter: (value: string, record: TableDataType) => record.name.indexOf(value) === 0,
    search: {
      el: 'input',
      label: '名字',
      defaultValue: '测试',
      tooltip: '测试111',
    },
  },
  {
    title: 'Other',
    dataIndex: 'Other',
    children: [
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        sorter: (a: TableDataType, b: TableDataType) => a.age - b.age,
        search: {
          el: 'input',
          label: '年龄',
          defaultValue: 22,
          tooltip: '年龄111',
        },
      },
      {
        title: 'Address',
        children: [
          {
            title: 'Street',
            dataIndex: 'street',
            key: 'street',
          },
          {
            title: 'Block',
            children: [
              {
                title: 'Building',
                dataIndex: 'building',
                key: 'building',
                search: {
                  el: 'input',
                  label: '建筑',
                  defaultValue: '22',
                  tooltip: '建筑111',
                },
              },
              {
                title: 'Door No.',
                dataIndex: 'number',
                key: 'number',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'Company',
    dataIndex: 'Company',
    children: [
      {
        title: 'Company Address',
        dataIndex: 'companyAddress',
        key: 'companyAddress',
      },
      {
        title: 'Company Name',
        dataIndex: 'companyName',
        key: 'companyName',
      },
    ],
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
    fixed: 'right',
  },
]
const data = [...Array.from({ length: 100 })].map((_, i) => ({
  key: i,
  name: 'John Brown',
  age: i + 1,
  street: 'Lake Park',
  building: 'C',
  number: 2035,
  companyAddress: 'Lake Street 42',
  companyName: 'SoftLake Co',
  gender: 'M',
}))
</script>

<template>
  <ProTable :data-source="data" :columns="columns" :tool-button="['refresh', 'search', 'setting']" />
</template>
