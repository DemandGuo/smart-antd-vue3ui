import { ref } from 'vue'
import { useDebounce } from '../../utils/internal'

export type Fetcher<T> = (params: { page: number; pageSize: number; q?: string }) => Promise<{ list: T[]; total?: number; hasMore?: boolean }>
export type MapOption<T> = (item: T) => { value: string | number; label: string }

export function usePagedSelect<T>(fetcher: Fetcher<T>, mapOption: MapOption<T>, pageSize = 20) {
  const options = ref<Array<{ value: any; label: string }>>([]);
  const page = ref(1);
  const search = ref('');
  const loading = ref(false);
  const hasMore = ref(true);

  const reset = () => {
    options.value = [];
    page.value = 1;
    hasMore.value = true;
  };

  const load = async () => {
    if (loading.value || !hasMore.value) return;
    loading.value = true;
    try {
      const res = await fetcher({ page: page.value, pageSize, q: search.value });
      const rawList: any = res?.list ?? [];
      const safeList: T[] = Array.isArray(rawList) ? rawList : [];
      const resHasMore = typeof res?.hasMore === 'boolean' ? (res.hasMore as boolean) : undefined;
      const totalNum = typeof res?.total === 'number' ? (res.total as number) : NaN;

      // 映射并去重（按 value 去重）
      if (safeList.length) {
        const mapped = safeList.map(mapOption);
        const seen = new Set(options.value.map(o => o.value));
        for (const opt of mapped) {
          if (!seen.has(opt.value)) {
            options.value.push(opt);
          }
        }
      }

      page.value += 1;

      // 优先使用后端的 hasMore
      if (resHasMore !== undefined) {
        hasMore.value = resHasMore;
      } else if (!Number.isNaN(totalNum)) {
        // 若提供 total（总条数），根据累计数量判断
        hasMore.value = options.value.length < totalNum;
      } else {
        // 兜底：返回数量不足一页，视为没有更多
        hasMore.value = safeList.length >= pageSize;
      }
      // 如果本次无数据，且无法判断总数，视为没有更多
      if (!safeList.length && Number.isNaN(totalNum) && resHasMore === undefined) {
        hasMore.value = false;
      }
    } catch (e) {
      // 出错也要结束 loading，防止界面卡住
      hasMore.value = false;
    } finally {
      loading.value = false;
    }
  };

  const onSearch = useDebounce((val: string) => {
    search.value = val;
    reset();
    load();
  }, 300);

  const onDropdownVisibleChange = (visible: boolean) => {
    if (visible && options.value.length === 0) {
      reset()
      load()
    }
  }

  const onPopupScroll = (e: Event) => {
    const el = e.target as HTMLElement;
    if (el && el.scrollTop + el.clientHeight >= el.scrollHeight - 16) load();
  };

  return { options, loading, hasMore, onSearch, onDropdownVisibleChange, onPopupScroll, reset, load };
}