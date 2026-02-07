import type { Component } from 'vue'
import type { TableProps } from 'ant-design-vue'

export type SearchItemType =
  | 'input'
  | 'select'
  | 'dateRange'
  | 'component'

export interface SearchItem {
  key: string
  type: SearchItemType
  props?: Record<string, any>
  component?: Component
}

export interface ProTableProps {
  request: (params: any) => Promise<any>
  searchConfig?: SearchItem[]
  params?: Record<string, any>
  columns: NonNullable<TableProps['columns']>
  getParams?: (params: Record<string, any>) => Record<string, any>
  scroll?: TableProps['scroll']
}
