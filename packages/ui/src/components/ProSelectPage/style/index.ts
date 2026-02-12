/**
 * ProSelectPage 组件按需样式入口
 *
 * resolver 的 sideEffects 会自动引入：
 *   smart-antd-vue3ui/es/components/ProSelectPage/style
 */

// ---- Antd 依赖组件样式（按需引入）----
import 'ant-design-vue/es/select/style'
import 'ant-design-vue/es/spin/style'

// ---- 组件自身样式 ----
import './index.less'
