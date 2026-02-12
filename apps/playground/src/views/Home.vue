<script setup lang="ts">
import { useRouter } from 'vue-router'
import Card from 'ant-design-vue/es/card'
import Row from 'ant-design-vue/es/row'
import Col from 'ant-design-vue/es/col'

const router = useRouter()

const components = [
  { name: 'ProTable', path: '/pro-table', desc: '高级表格，集成搜索、分页、请求' },
  { name: 'ProSelectPage', path: '/pro-select-page', desc: '远程分页下拉选择器，支持搜索、滚动加载、新增' },
  // 新增组件在此添加即可
]
</script>

<template>
  <div>
    <h2 style="margin-bottom: 24px">组件列表</h2>
    <Row :gutter="[16, 16]">
      <Col :span="8" v-for="item in components" :key="item.path">
        <Card hoverable @click="router.push(item.path)">
          <template #title>{{ item.name }}</template>
          <p>{{ item.desc }}</p>
        </Card>
      </Col>
    </Row>
  </div>
</template>
