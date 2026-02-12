<script setup lang="ts">
import { computed, useAttrs ,onMounted} from 'vue'
import Select from 'ant-design-vue/es/select'
import Spin from 'ant-design-vue/es/spin'
import { usePagedSelect } from '../../hooks/internal/usePagedSelect'

import './style/index.less'

defineOptions({ name: 'ProSelectPage' })
import type { ProSelectPageProps } from './types'

const props = withDefaults(defineProps<ProSelectPageProps>(), {
  pageSize: 20,
  valueKey: 'id',
  labelKey: 'name',
  allowClear: true,
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number | null | undefined]
  'change': [value: string | number | null | undefined, option: any]
}>()

const attrs = useAttrs()

/* ---------- 分页 hook ---------- */
const {
  options,
  loading,
  onSearch,
  onPopupScroll,
  onDropdownVisibleChange,
  reset,
  load,
} = usePagedSelect(
  props.fetch,
  (x: any) => ({
    ...x,
    value: x[props.valueKey],
    label: x[props.labelKey],
  }),
  props.pageSize,
)

/* ---------- 是否显示新增按钮 ---------- */
const showAddButton = computed(() => !!attrs.onAdd)

/* ---------- 处理新增 ---------- */
const handleAdd = () => {
  if (attrs.onAdd) {
    ;(attrs.onAdd as Function)()
    reset()
    load()
  }
}

/* ---------- v-model ---------- */
const value = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v),
})

const allowClear = computed(() => props.allowClear ?? true)
const disabled = computed(() => props.disabled ?? false)
onMounted(()=>{
    // 组件挂载时预加载第一页数据，提升用户体验
    onSearch('')
})
</script>

<template>
  <Select
    v-model:value="value"
    :options="options"
    :loading="loading"
    :show-search="true"
    :filter-option="false"
    :virtual="true"
    :list-height="256"
    :placeholder="placeholder"
    :allow-clear="allowClear"
    :disabled="disabled"
    @search="onSearch"
    @popupScroll="onPopupScroll"
    @dropdownVisibleChange="onDropdownVisibleChange"
    @change="(v: any, o: any) => emit('change', v, o)"
    :getPopupContainer="(node: any) => node.parentNode"
  >
    <template #dropdownRender="{ menuNode }">
      <component :is="menuNode" />
      <div v-if="loading" style="padding: 8px; text-align: center">
        <Spin size="small" />
      </div>
      <div v-if="showAddButton" class="pro-select-page__add-btn" @click="handleAdd">
        + 新增
      </div>
    </template>
  </Select>
</template>
