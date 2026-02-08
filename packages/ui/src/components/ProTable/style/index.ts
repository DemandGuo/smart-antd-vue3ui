/**
 * ProTable 组件按需样式入口
 *
 * 被 resolver 的 sideEffects 自动引入，或用户手动引入：
 *   import 'smart-antd-vue3ui/es/components/ProTable/style'
 *
 * 职责：
 * 1. 引入本组件自身的 Less 样式
 * 2. 引入本组件所依赖的 Antd 子组件样式（按需）
 */

// ---- Antd 依赖组件样式（按需引入）----
import 'ant-design-vue/es/card/style'
import 'ant-design-vue/es/form/style'
import 'ant-design-vue/es/grid/style'
import 'ant-design-vue/es/input/style'
import 'ant-design-vue/es/select/style'
import 'ant-design-vue/es/date-picker/style'
import 'ant-design-vue/es/button/style'
import 'ant-design-vue/es/space/style'
import 'ant-design-vue/es/table/style'

// ---- 组件自身样式 ----
import './index.less'