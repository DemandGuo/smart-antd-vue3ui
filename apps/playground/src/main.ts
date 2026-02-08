/**
 * Playground 入口
 * 引入 Antd 全局样式 + UI 库样式 + 路由，挂载调试页面
 */
import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'

// 因为 resolve.alias 指向了源码，这里等价于直接引入 src/styles/index.less
import 'smart-antd-vue3ui/styles/index.less'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(Antd)
app.use(router)
app.mount('#app')
