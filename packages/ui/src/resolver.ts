/**
 * unplugin-vue-components resolver for smart-antd-vue3ui
 *
 * Usage in consumer's vite.config.ts:
 * ```ts
 * import Components from 'unplugin-vue-components/vite'
 * import { SmartAntdVue3uiResolver } from 'smart-antd-vue3ui/resolver'
 *
 * export default defineConfig({
 *   plugins: [
 *     Components({
 *       resolvers: [SmartAntdVue3uiResolver()]
 *     })
 *   ]
 * })
 * ```
 */

export interface SmartAntdVue3uiResolverOptions {
  /**
   * 导入来源，默认 'smart-antd-vue3ui'
   */
  importFrom?: string
  /**
   * 组件前缀匹配，默认 'Pro'
   * 所有以该前缀开头的 PascalCase 组件名都会被自动解析
   */
  prefix?: string
}

export function SmartAntdVue3uiResolver(options: SmartAntdVue3uiResolverOptions = {}) {
  const { importFrom = 'smart-antd-vue3ui', prefix = 'Pro' } = options

  return {
    type: 'component' as const,
    resolve: (name: string) => {
      if (name.startsWith(prefix)) {
        return {
          name,
          from: importFrom,
        }
      }
    },
  }
}
