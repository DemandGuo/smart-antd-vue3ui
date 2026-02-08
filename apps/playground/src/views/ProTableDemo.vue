<script setup lang="ts">
import { ProTable } from 'smart-antd-vue3ui'

// 模拟接口
const request = (params: any) => {
  console.log('request params:', params)
  return Promise.resolve({
    data: {
      list: [
        { id: 1, name: '张三', age: 28, status: '在职' },
        { id: 2, name: '李四', age: 32, status: '离职' },
        { id: 3, name: '王五', age: 25, status: '在职' },
      ],
      total: 3,
    },
  })
}

const columns = [
  { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
  { title: '姓名', dataIndex: 'name', key: 'name' },
  { title: '年龄', dataIndex: 'age', key: 'age' },
  { title: '状态', dataIndex: 'status', key: 'status' },
]

const searchConfig = [
  { key: 'name', type: 'input' as const, props: { placeholder: '请输入姓名' } },
  {
    key: 'status',
    type: 'select' as const,
    props: {
      placeholder: '请选择状态',
      options: [
        { label: '在职', value: '在职' },
        { label: '离职', value: '离职' },
      ],
    },
  },
]
</script>

<template>
  <div>
    <h2 style="margin-bottom: 16px">ProTable 组件调试</h2>
    <ProTable
      :request="request"
      :columns="columns"
      :searchConfig="searchConfig"
    />
  </div>
</template>
