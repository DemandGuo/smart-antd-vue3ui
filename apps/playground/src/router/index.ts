import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

/**
 * 组件 demo 路由
 * 新增组件时只需在这里加一条路由 + 对应的 views/XxxDemo.vue
 */
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/pro-table',
    name: 'ProTable',
    component: () => import('../views/ProTableDemo.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
