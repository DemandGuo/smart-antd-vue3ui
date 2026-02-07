/**
 * 单独构建 UMD 格式产物
 * UMD 不支持多入口，因此独立于主构建单独执行
 */
import { build } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const root = path.resolve(__dirname, '..')

await build({
  root,
  configFile: false, // 不读取 vite.config.ts，完全使用此处配置
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      less: { javascriptEnabled: true },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(root, 'src'),
    },
  },
  build: {
    emptyOutDir: false, // 不清空 dist，追加产物
    lib: {
      entry: path.resolve(root, 'src/index.ts'),
      name: 'SmartAntdVue3ui',
      formats: ['umd'],
      fileName: () => 'index.umd.js',
    },
    outDir: 'dist',
    rollupOptions: {
      external: ['vue', /^ant-design-vue/, 'vue-request'],
      output: {
        globals: {
          vue: 'Vue',
          'vue-request': 'VueRequest',
          'ant-design-vue': 'antd',
          'ant-design-vue/es/card': 'antd.Card',
          'ant-design-vue/es/form': 'antd.Form',
          'ant-design-vue/es/form/FormItem': 'antd.FormItem',
          'ant-design-vue/es/grid': 'antd.Grid',
          'ant-design-vue/es/input': 'antd.Input',
          'ant-design-vue/es/select': 'antd.Select',
          'ant-design-vue/es/date-picker': 'antd.DatePicker',
          'ant-design-vue/es/button': 'antd.Button',
          'ant-design-vue/es/space': 'antd.Space',
          'ant-design-vue/es/table': 'antd.Table',
        },
        exports: 'named' as const,
      },
    },
  },
})

console.log('✅ UMD build completed → dist/index.umd.js')
