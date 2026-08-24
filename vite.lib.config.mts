import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const srcDir = path.resolve(__dirname, 'src')

export default defineConfig({
  plugins: [react(), visualizer()],

  build: {
    outDir: 'dist',
    assetsDir: '',
    lib: {
      entry: path.resolve(srcDir, 'index.ts'),
      formats: ['es'],
    },
    rolldownOptions: {
      external: id => !id.startsWith('.') && !id.startsWith('/'),
      output: {
        preserveModules: true,
        preserveModulesRoot: srcDir,
        entryFileNames: '[name].js',
      },
    },
    emptyOutDir: true,
  },
})
