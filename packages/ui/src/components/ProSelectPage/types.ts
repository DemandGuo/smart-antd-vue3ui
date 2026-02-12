export interface ProSelectPageFetchParams {
	page: number
	pageSize: number
	q?: string
}

export interface ProSelectPageFetchResult<T = any> {
	list: T[]
	total?: number
	hasMore?: boolean
}

export interface ProSelectPageProps<T = any> {
	modelValue?: string | number
	fetch: (params: ProSelectPageFetchParams) => Promise<ProSelectPageFetchResult<T>>
	placeholder?: string
	pageSize?: number
	valueKey?: string
	labelKey?: string
	allowClear?: boolean
	disabled?: boolean
}
