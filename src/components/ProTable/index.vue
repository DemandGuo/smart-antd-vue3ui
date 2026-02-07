<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { usePagination } from 'vue-request'
import ACard from 'ant-design-vue/es/card'
import AForm from 'ant-design-vue/es/form'
import AFormItem from 'ant-design-vue/es/form/FormItem'
import { Row as ARow, Col as ACol } from 'ant-design-vue/es/grid'
import AInput from 'ant-design-vue/es/input'
import ASelect from 'ant-design-vue/es/select'
import ADatePicker from 'ant-design-vue/es/date-picker'
import AButton from 'ant-design-vue/es/button'
import ASpace from 'ant-design-vue/es/space'
import ATable from 'ant-design-vue/es/table'

const ARangePicker = ADatePicker.RangePicker
import type { ProTableProps } from './types'

const props = withDefaults(defineProps<ProTableProps>(), {
  searchConfig: () => [],
  params: () => ({}),
  getParams: (params: Record<string, any>) => params,
  scroll: () => ({ x: 1300 }),
})

const emit = defineEmits<{
  (e: 'search', params: any): void
  (e: 'reset'): void
}>()

const formRef = ref()
const formState = reactive({
  ...props.params,
})

const {
  data,
  loading,
  run,
  current,
  pageSize,
} = usePagination(props.request, {
  defaultParams: [
    {
      pageNum: 1,
      pageSize: 10,
      ...props.getParams(formState),
    },
  ],
  pagination: {
    currentKey: 'pageNum',
    pageSizeKey: 'pageSize',
    totalKey: 'data.total',
  },
})

const list = computed(() => data.value?.data?.list || [])

const pagination = computed(() => ({
  total: data.value?.data?.total || 0,
  current: current.value,
  pageSize: pageSize.value,
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: (total: number) => `共 ${total} 条`,
}))

const tableScroll = computed(() => props.scroll ?? { x: 1300 })

const onSearch = () => {
  const params = {
    ...props.getParams(formState),
    pageNum: 1,
    pageSize: pageSize.value,
  }
  emit('search', params)
  run(params)
}

const onReset = () => {
  formRef.value?.resetFields()
  emit('reset')
  run({
    pageNum: 1,
    pageSize: 10,
  })
}

const handleTableChange = (page: any) => {
  run({
    ...props.getParams(formState),
    pageNum: page.current,
    pageSize: page.pageSize,
  })
}
</script>
<template>
  <!-- 搜索区 -->
  <ACard class="search-wrapper">
    <AForm ref="formRef" :model="formState">
      <ARow :gutter="[16, 16]">
        <ACol :span="6" v-for="item in searchConfig" :key="item.key">
          <AFormItem :name="item.key">
            <component v-if="item.type === 'component'" :is="item.component" v-model="formState[item.key]"
              v-bind="item.props" />
            <AInput v-else-if="item.type === 'input'" v-model:value="formState[item.key]" allow-clear
              v-bind="item.props" />
            <ASelect v-else-if="item.type === 'select'" v-model:value="formState[item.key]" allow-clear
              v-bind="item.props" />
            <ARangePicker v-else-if="item.type === 'dateRange'" v-model:value="formState[item.key]"
              v-bind="item.props" />
          </AFormItem>
        </ACol>
      </ARow>

      <ARow justify="space-between">
        <ACol>
          <slot name="extra" />
        </ACol>
        <ACol>
          <ASpace>
            <AButton type="primary" @click="onSearch">查询</AButton>
            <AButton @click="onReset">重置</AButton>
          </ASpace>
        </ACol>
      </ARow>
    </AForm>
  </ACard>

  <!-- 表格区 -->
  <ACard style="margin-top: 16px">
    <ATable :loading="loading" :columns="columns" :data-source="list" :pagination="pagination" :scroll="tableScroll"
      @change="handleTableChange">
      <template #bodyCell="{ column, record }">
        <slot v-if="column?.key" :name="column.key" :record="record" :column="column" />
      </template>
    </ATable>
  </ACard>
</template>
