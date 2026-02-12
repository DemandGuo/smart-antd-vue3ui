/**
 * 自动扫描 src/components、src/hooks、src/utils 目录，生成各自的 barrel index.ts
 *
 * 约定：
 * - components：子目录（含 index.ts/vue）以 default 方式导出
 * - hooks：顶层文件以 default 导出，子目录以 export * 导出（递归生成子目录 index.ts）
 * - utils：顶层文件以 export * 导出，子目录同上
 */
import path from 'path'
import { fileURLToPath } from 'url'
import { generateBarrel } from './gen-barrel'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const src = (...p: string[]) => path.resolve(__dirname, '../src', ...p)

// ---- Components: 扫子目录，export { default as Xxx } ----
generateBarrel({ dir: src('components'), fileExportMode: 'default', label: 'components', dirOnly: true })

// ---- Hooks: 顶层文件 export { default as useXxx }，子目录 export * ----
generateBarrel({ dir: src('hooks'), fileExportMode: 'default', label: 'hooks' })

// ---- Utils: 顶层文件 export *，子目录 export * ----
generateBarrel({ dir: src('utils'), fileExportMode: 'named', label: 'utils' })
