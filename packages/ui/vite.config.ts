import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import path from 'path'
import { fileURLToPath } from 'url'

// 👇 ESM 下没有 __dirname，自己补
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const commonExternal = ['vue', /^ant-design-vue/, 'vue-request']

// 打包产物入口
const entry = {
  index: path.resolve(__dirname, 'src/index.ts'),
  resolver: path.resolve(__dirname, 'src/resolver.ts'),
}

export default defineConfig({
  plugins: [
    vue(),
    dts({
      entryRoot: 'src',
      outDir: ['dist', 'es', 'lib'],
      insertTypesEntry: true,
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    lib: {
      entry,
      name: 'SmartAntdVue3ui',
      formats: ['es', 'cjs', 'umd'],
    },
    rollupOptions: {
      external: commonExternal,
      output: [
        {
          // es/ — ESM 格式，保留模块结构（按需引入友好）
          format: 'es',
          dir: 'es',
          entryFileNames: '[name].mjs',
          chunkFileNames: '[name].mjs',
          preserveModules: true,
          preserveModulesRoot: 'src',
          exports: 'named',
        },
        {
          // lib/ — CJS 格式，保留模块结构
          format: 'cjs',
          dir: 'lib',
          entryFileNames: '[name].cjs',
          chunkFileNames: '[name].cjs',
          preserveModules: true,
          preserveModulesRoot: 'src',
          exports: 'named',
        },
        {
          // dist/ — 打包合并的版本（全量引入）
          format: 'es',
          dir: 'dist',
          entryFileNames: '[name].mjs',
          exports: 'named',
        },
        {
          // dist/ — CJS 合并版本
          format: 'cjs',
          dir: 'dist',
          entryFileNames: '[name].cjs',
          exports: 'named',
        },
        {
          // dist/ — UMD 格式（CDN / <script> 标签引入）
          format: 'umd',
          dir: 'dist',
          entryFileNames: '[name].umd.js',
          name: 'SmartAntdVue3ui',
          exports: 'named',
          globals: {
            vue: 'Vue',
            'ant-design-vue': 'antd',
            'vue-request': 'VueRequest',
          },
        },
      ],
    },
  },
})
