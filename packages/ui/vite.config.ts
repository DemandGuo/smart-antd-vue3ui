import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import path from 'path'
import { fileURLToPath } from 'url'
import { execSync } from 'child_process'

// 👇 ESM 下没有 __dirname，自己补
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const commonExternal = ['vue', /^ant-design-vue/, 'vue-request']

// 打包产物入口
const entry = {
  index: path.resolve(__dirname, 'src/index.ts'),
  resolver: path.resolve(__dirname, 'src/resolver.ts'),
  style: path.resolve(__dirname, 'src/style.ts'),
}

export default defineConfig({
  plugins: [
    {
      name: 'run-vue-tsc',
      apply: 'build',
      buildStart() {
        execSync('vue-tsc -p tsconfig.build.json', { stdio: 'inherit' })
      },
    },
    vue(),
    dts({
      tsconfigPath: './tsconfig.build.json',
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
    },
    cssCodeSplit: true,
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
          // 组件级 CSS 保留在各自目录下
          assetFileNames: (assetInfo) => {
            if (assetInfo.names?.[0]?.endsWith('.css')) {
              return '[name].[ext]'
            }
            return 'assets/[name]-[hash].[ext]'
          },
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
          assetFileNames: (assetInfo) => {
            if (assetInfo.names?.[0]?.endsWith('.css')) {
              return '[name].[ext]'
            }
            return 'assets/[name]-[hash].[ext]'
          },
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
      ],
    },
  },
})
