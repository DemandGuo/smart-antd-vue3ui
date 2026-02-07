import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import path from 'path'
import { fileURLToPath } from 'url'

// 👇 ESM 下没有 __dirname，自己补
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [
    vue(),
    dts({
      entryRoot: 'src',
      outDir: 'dist',
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
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'MyUILib',
      formats: ['es', 'cjs'],
      fileName: (format) =>
        format === 'es'
          ? 'my-ui-lib.es.js'
          : 'my-ui-lib.cjs.js',
    },
    rollupOptions: {
      external: ['vue', /^ant-design-vue/],
      output: {
        exports: 'named',
      },
    },
  },
})
