# ProSelectPage

远程分页下拉选择器：支持搜索、防抖、滚动加载更多，以及可选的「+ 新增」入口。

## 基本用法

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { ProSelectPage } from '@zxcore/smart-antd-vue3ui'

const value = ref<number>()

// fetch 必须返回 { list, total? } 或 { list, hasMore? }
const fetchList = async (params: { page: number; pageSize: number; q?: string }) => {
	// 这里替换成你的接口
	const res = await api.getList(params)
	return {
		list: res.list,
		total: res.total,
	}
}
</script>

<template>
	<ProSelectPage
		v-model="value"
		:fetch="fetchList"
		placeholder="请选择"
		style="width: 300px"
	/>
</template>
```

## 带新增按钮

当你监听 `@add` 事件时，会在下拉面板底部显示「+ 新增」。

```vue
<ProSelectPage v-model="value" :fetch="fetchList" @add="onAdd" />
```

## Props

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `modelValue` | `string \| number` | 否 | - | v-model 值 |
| `fetch` | `(params) => Promise<{ list; total?; hasMore? }>` | 是 | - | 远程分页接口 |
| `placeholder` | `string` | 否 | - | 占位文本 |
| `pageSize` | `number` | 否 | `20` | 每页条数 |
| `valueKey` | `string` | 否 | `id` | 从返回项上取 value 的字段 |
| `labelKey` | `string` | 否 | `name` | 从返回项上取 label 的字段 |
| `allowClear` | `boolean` | 否 | `true` | 是否允许清空 |
| `disabled` | `boolean` | 否 | `false` | 是否禁用 |

## 事件

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `update:modelValue` | `(value)` | v-model 更新 |
| `change` | `(value, option)` | 选中变化 |
| `add` | - | 点击「+ 新增」 |

## 样式（按需）

resolver 自动按需引入时会加载：

```ts
import 'smart-antd-vue3ui/es/components/ProSelectPage/style'
```
