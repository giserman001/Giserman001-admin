<script setup lang="tsx" name="accountManage">
import type { ResultData } from '@/api/interface'
import type { ColumnProps } from '@/components/ProTable/type/index'

function test(): Promise<ResultData<any>> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        code: 200,
        msg: 'ok',
        data: [{ name: '测试111', val: 23 }, { name: '测试2222', val: 33 }],
      })
    }, 10000)
  })
}

const addonBeforeValue = ref('add')

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
          el: 'select',
          label: '年龄',
          defaultValue: 22,
          options: [{ label: '测试1', value: 23 }, { label: '测试2', value: 33 }],
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
                // search: {
                //   el: 'select',
                //   label: '建筑',
                //   defaultValue: '22',
                //   options: test,
                //   props: {
                //     fieldNames: { label: 'name', value: 'val' },
                //   },
                //   tooltip: '建筑111',
                // },
                search: {
                  el: 'input-number',
                  label: '数字',
                  defaultValue: 11,
                  props: {
                    fieldNames: { label: 'name', value: 'val' },
                  },
                  slots: {
                    addonBefore: ({ column, searchParam }) => {
                      // console.log(column, searchParam, 'column, searchParam outer')
                      return (
                        <a-select v-model:value={addonBeforeValue.value} style="width: 60px">
                          <a-select-option value="add">+</a-select-option>
                          <a-select-option value="minus">-</a-select-option>
                        </a-select>
                      )
                    },
                  },
                  tooltip: '建筑111',
                },
              },
              {
                title: 'Door No.',
                dataIndex: 'number',
                key: 'number',
                search: {
                  el: 'select',
                  label: '建筑333',
                  defaultValue: '22',
                  options: test,
                  props: {
                    fieldNames: { label: 'name', value: 'val' },
                  },
                  tooltip: '建筑111',
                },
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
        search: {
          el: 'select',
          label: '建筑333',
          defaultValue: '22',
          options: test,
          props: {
            fieldNames: { label: 'name', value: 'val' },
          },
          tooltip: '建筑111',
        },
      },
      {
        title: 'Company Name',
        dataIndex: 'companyName',
        key: 'companyName',
        search: {
          label: '数字',
          // defaultValue: '22',
          render: ({ searchParam }) => {
            return (
              <div class="ly-flex ly-items-center">
                <a-input v-model:value={searchParam.minAge} placeholder="最小数字" />
                <span class="ly-mx-[10px]">-</span>
                {searchParam.minAge}
                <a-input v-model:value={searchParam.maxAge} placeholder="最大数字" />
              </div>
            )
          },
          tooltip: '建筑111',
        },
      },
    ],
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
    fixed: 'right',
    search: {
      el: 'select',
      label: '建筑333',
      defaultValue: '22',
      options: test,
      props: {
        fieldNames: { label: 'name', value: 'val' },
      },
      tooltip: '建筑111',
    },
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
