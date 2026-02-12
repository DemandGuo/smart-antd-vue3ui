<script setup lang="ts">
import { ProSelectPage } from 'smart-antd-vue3ui'
import { ref } from 'vue'
import Card from 'ant-design-vue/es/card'
import Divider from 'ant-design-vue/es/divider'
import message from 'ant-design-vue/es/message'

/* ---------- 模拟数据 ---------- */
const mockData = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `选项 ${i + 1}`,
  code: `CODE_${String(i + 1).padStart(3, '0')}`,
}))

/* ---------- 模拟分页接口 ---------- */
const fetchList = async (params: { page: number; pageSize: number; q?: string }) => {
  await new Promise((r) => setTimeout(r, 400))

  let filtered = mockData
  if (params.q) {
    filtered = mockData.filter(
      (item) => item.name.includes(params.q!) || item.code.includes(params.q!),
    )
  }

  const start = (params.page - 1) * params.pageSize
  const list = filtered.slice(start, start + params.pageSize)

  return { list, total: filtered.length }
}

/* ---------- 基础用法 ---------- */
const basicValue = ref<number>()

/* ---------- 自定义 key ---------- */
const codeValue = ref<string>()

/* ---------- 带新增按钮 ---------- */
const addValue = ref<number>()
const handleAdd = () => {
  message.success('新增回调触发 —— 可在此打开弹窗')
}

/* ---------- 禁用状态 ---------- */
const disabledValue = ref<number>(3)

/* ---------- change 事件 ---------- */
const handleChange = (value: any, option: any) => {
  console.log('选中值:', value, '完整选项:', option)
}
</script>

<template>
  <div>
    <h2 style="margin-bottom: 16px">ProSelectPage 组件调试</h2>

    <!-- 基础用法 -->
    <Card title="基础用法" style="margin-bottom: 16px">
      <p style="margin-bottom: 8px; color: #666">支持远程搜索 + 滚动分页加载（共 100 条模拟数据）</p>
      <ProSelectPage
        v-model="basicValue"
        :fetch="fetchList"
        placeholder="请选择"
        style="width: 300px"
        @change="handleChange"
      />
      <p style="margin-top: 8px; color: #999">当前值：{{ basicValue ?? '未选择' }}</p>
    </Card>

    <!-- 自定义 valueKey / labelKey -->
    <Card title="自定义 valueKey / labelKey" style="margin-bottom: 16px">
      <p style="margin-bottom: 8px; color: #666">使用 code 作为 value，name 作为 label</p>
      <ProSelectPage
        v-model="codeValue"
        :fetch="fetchList"
        value-key="code"
        label-key="name"
        placeholder="以 code 为值"
        style="width: 300px"
      />
      <p style="margin-top: 8px; color: #999">当前值：{{ codeValue ?? '未选择' }}</p>
    </Card>

    <!-- 带新增按钮 -->
    <Card title="带新增按钮" style="margin-bottom: 16px">
      <p style="margin-bottom: 8px; color: #666">通过 @add 事件启用下拉底部「+ 新增」按钮</p>
      <ProSelectPage
        v-model="addValue"
        :fetch="fetchList"
        placeholder="支持新增"
        style="width: 300px"
        @add="handleAdd"
      />
    </Card>

    <Divider />

    <!-- 禁用状态 -->
    <Card title="禁用状态">
      <ProSelectPage
        v-model="disabledValue"
        :fetch="fetchList"
        placeholder="已禁用"
        disabled
        style="width: 300px"
      />
    </Card>
  </div>
</template>
