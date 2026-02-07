# smart-antd-vue3ui

基于 [Ant Design Vue 4.x](https://antdv.com/) 的高级业务组件库，提供开箱即用的 Pro 系列组件。

## 特性

- 🚀 基于 Ant Design Vue 4.x，开箱即用
- 📦 支持按需引入，提供 `unplugin-vue-components` Resolver
- 🔧 Monorepo 架构（pnpm workspace），结构清晰
- 🤖 组件导出全自动化，新增组件零配置

## 项目结构

```
smart-antd-vue3ui/
├── package.json              # 根 package.json（工作区脚本入口）
├── pnpm-workspace.yaml       # pnpm 工作区配置
├── packages/
│   ├── ui/                   # 核心组件库
│   │   ├── src/
│   │   │   ├── index.ts            # 库入口（导出所有组件 + install 方法）
│   │   │   ├── resolver.ts         # unplugin-vue-components 自定义 Resolver
│   │   │   └── components/
│   │   │       ├── index.ts        # ⚡ 自动生成的组件导出文件
│   │   │       └── ProTable/       # 组件目录（PascalCase 命名）
│   │   │           ├── index.ts
│   │   │           ├── index.vue
│   │   │           └── types.ts
│   │   ├── scripts/
│   │   │   └── gen-components.ts   # 🤖 自动扫描组件并生成 components/index.ts
│   │   ├── dist/                   # 构建产物
│   │   ├── vite.config.ts          # Vite 库模式构建配置
│   │   └── package.json
│   └── hooks/                # 公共 hooks（预留）
└── apps/
    └── playground/           # 开发调试用 Demo 应用
```

## 安装

```bash
npm install smart-antd-vue3ui
# or
pnpm add smart-antd-vue3ui
```

### 前置依赖

本库将以下包声明为 `peerDependencies`，请确保项目中已安装：

```bash
pnpm add vue ant-design-vue vue-request
```

## 使用方式

### 方式一：全局注册

```ts
// main.ts
import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import smartAntdVue3ui from 'smart-antd-vue3ui'
import 'ant-design-vue/dist/reset.css'

const app = createApp(App)
app.use(Antd)
app.use(smartAntdVue3ui)
app.mount('#app')
```

### 方式二：手动按需引入

```ts
import { ProTable } from 'smart-antd-vue3ui'
```

### 方式三：自动按需引入（推荐）

配合 `unplugin-vue-components` 使用，在模板中直接使用组件无需手动 import。

```bash
pnpm add -D unplugin-vue-components
```

```ts
// vite.config.ts
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import { SmartAntdVue3uiResolver } from 'smart-antd-vue3ui/resolver'

export default defineConfig({
  plugins: [
    Components({
      resolvers: [
        AntDesignVueResolver({ importStyle: false }),
        SmartAntdVue3uiResolver(),
      ],
    }),
  ],
})
```

然后直接在模板中使用即可：

```vue
<template>
  <ProTable :request="fetchData" :columns="columns" :searchConfig="searchConfig" />
</template>
```

#### Resolver 配置项

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `prefix` | `string` | `'Pro'` | 组件前缀，所有以此前缀开头的组件名都会被自动解析 |
| `importFrom` | `string` | `'smart-antd-vue3ui'` | 导入源包名 |

## 组件文档

### ProTable 高级表格

集成搜索表单 + 数据表格 + 分页的一体化方案。

#### 基本用法

```vue
<script setup lang="ts">
const columns = [
  { title: '姓名', dataIndex: 'name', key: 'name' },
  { title: '年龄', dataIndex: 'age', key: 'age' },
  { title: '操作', key: 'action' },
]

const searchConfig = [
  { key: 'name', type: 'input', props: { placeholder: '请输入姓名' } },
  {
    key: 'status',
    type: 'select',
    props: {
      placeholder: '请选择状态',
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 },
      ],
    },
  },
  { key: 'dateRange', type: 'dateRange', props: { placeholder: ['开始日期', '结束日期'] } },
]

const fetchData = (params: any) => {
  return api.getList(params)
  // 返回格式：{ data: { list: [], total: 0 } }
}
</script>

<template>
  <ProTable
    :request="fetchData"
    :columns="columns"
    :searchConfig="searchConfig"
  >
    <!-- 操作列插槽（以 column.key 命名） -->
    <template #action="{ record }">
      <a-button type="link" @click="handleEdit(record)">编辑</a-button>
    </template>

    <!-- 自定义列渲染（以 column.key 命名） -->
    <template #name="{ text, record }">
      <span style="color: red">{{ text }}</span>
    </template>

    <!-- 搜索区左侧扩展按钮 -->
    <template #extra>
      <a-button type="primary">新增</a-button>
    </template>
  </ProTable>
</template>
```

#### Props

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `request` | `(params: any) => Promise<any>` | 是 | - | 数据请求方法，返回 `{ data: { list, total } }` |
| `columns` | `ColumnsType` | 是 | - | 表格列配置，同 ant-design-vue Table |
| `searchConfig` | `SearchItem[]` | 否 | `[]` | 搜索表单配置 |
| `params` | `Record<string, any>` | 否 | `{}` | 额外的请求参数 |
| `getParams` | `(params) => params` | 否 | 透传 | 请求前参数预处理函数 |
| `scroll` | `TableProps['scroll']` | 否 | `{ x: 1300 }` | 表格滚动配置 |

#### SearchItem 配置

| 参数 | 类型 | 说明 |
|------|------|------|
| `key` | `string` | 字段名 |
| `type` | `'input' \| 'select' \| 'dateRange' \| 'component'` | 搜索项类型 |
| `props` | `Record<string, any>` | 传递给搜索组件的 props |
| `component` | `Component` | 自定义组件（type 为 `'component'` 时使用） |

#### 插槽

| 插槽名 | 参数 | 说明 |
|--------|------|------|
| `#extra` | - | 搜索区左侧扩展内容 |
| `#[column.key]` | `{ record, column, text }` | 按列 key 动态渲染单元格 |

#### 事件

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `search` | `params` | 点击查询时触发 |
| `reset` | - | 点击重置时触发 |

## 自动化机制详解

### 1. 组件导出自动生成

[scripts/gen-components.ts](packages/ui/scripts/gen-components.ts) 会在每次 `pnpm build` 前自动运行：

```
pnpm build
  → tsx scripts/gen-components.ts   （扫描 src/components/ 子目录）
  → vite build                      （构建库产物）
```

**工作原理：**
- 扫描 `src/components/` 下所有子目录
- 过滤出包含 `index.ts` 或 `index.vue` 的有效组件目录
- 自动生成 `src/components/index.ts`，内容为所有组件的 `export { default as XXX }` 语句

**效果：** 新增组件只需在 `src/components/` 下创建目录，无需手动修改导出文件。

### 2. Resolver 前缀匹配

[src/resolver.ts](packages/ui/src/resolver.ts) 使用前缀匹配策略而非组件列表：

```ts
// 所有以 'Pro' 开头的组件名自动解析到本库
if (name.startsWith(prefix)) {
  return { name, from: importFrom }
}
```

**效果：** 新增 `ProModal`、`ProForm` 等组件时，Resolver 无需任何修改，只要命名以 `Pro` 开头即可。

### 3. 新增组件流程（零配置）

只需一步：在 `packages/ui/src/components/` 下新建组件目录

```bash
packages/ui/src/components/
  ProTable/     # 已有
  ProModal/     # ← 新增：目录名 = 导出名
    index.vue
    index.ts    # export default ProModal; export * from './types'
    types.ts
```

然后运行 `pnpm build`，一切自动完成。

## 构建产物

构建后 `dist/` 目录包含：

| 文件 | 说明 |
|------|------|
| `index.mjs` | ESM 格式主入口 |
| `index.cjs` | CommonJS 格式主入口 |
| `index.d.ts` | 类型声明 |
| `resolver.mjs` | ESM 格式 Resolver |
| `resolver.cjs` | CommonJS 格式 Resolver |
| `resolver.d.ts` | Resolver 类型声明 |

### 关键构建配置

- **external**：`vue`、`ant-design-vue`（含子路径）、`vue-request` 不打包进产物，由使用方提供
- **子模块导入**：ant-design-vue 组件从 `ant-design-vue/es/xxx` 子路径导入，兼容 `AntDesignVueResolver` 按需引入场景
- **多入口打包**：`index` 和 `resolver` 分开打包，resolver 不会把 Vue 组件代码带进 Node.js 环境

## 开发

```bash
# 安装依赖
pnpm install

# 构建组件库
pnpm build

# 启动 Playground 开发调试
pnpm dev
```

## License

ISC
