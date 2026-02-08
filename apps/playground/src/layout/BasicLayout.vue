<script setup lang="ts">
import { useRouter } from 'vue-router'
import Layout from 'ant-design-vue/es/layout'
import Menu from 'ant-design-vue/es/menu'
import { h, ref } from 'vue'
import { TableOutlined, HomeOutlined } from '@ant-design/icons-vue'

const LayoutSider = Layout.Sider
const LayoutContent = Layout.Content
const LayoutHeader = Layout.Header

const router = useRouter()
const selectedKeys = ref<string[]>([router.currentRoute.value.path])

const menuItems = [
  { key: '/', label: '首页', icon: () => h(HomeOutlined) },
  { key: '/pro-table', label: 'ProTable', icon: () => h(TableOutlined) },
]

const onMenuClick = ({ key }: { key: string }) => {
  router.push(key)
}

router.afterEach((to) => {
  selectedKeys.value = [to.path]
})
</script>

<template>
  <Layout style="min-height: 100vh">
    <LayoutSider theme="light" :width="220" style="border-right: 1px solid #f0f0f0">
      <div class="logo">Smart Antd Vue3 UI</div>
      <Menu
        v-model:selectedKeys="selectedKeys"
        mode="inline"
        :items="menuItems"
        @click="onMenuClick"
      />
    </LayoutSider>
    <Layout>
      <LayoutHeader style="background: #fff; padding: 0 24px; border-bottom: 1px solid #f0f0f0">
        <h3 style="margin: 0; line-height: 64px">Playground</h3>
      </LayoutHeader>
      <LayoutContent style="padding: 24px; background: #f5f5f5">
        <router-view />
      </LayoutContent>
    </Layout>
  </Layout>
</template>

<style scoped>
.logo {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 16px;
  border-bottom: 1px solid #f0f0f0;
}
</style>
