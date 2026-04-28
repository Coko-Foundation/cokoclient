import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const srcDir = path.resolve(__dirname, 'src')

export default defineConfig({
  plugins: [react()],

  build: {
    lib: {
      entry: path.resolve(srcDir, 'index.ts'),
      formats: ['es'],
    },
    rollupOptions: {
      external: (id) => !id.startsWith('.') && !id.startsWith('/'),
      output: {
        preserveModules: true,
        preserveModulesRoot: srcDir,
        dir: 'dist',
      },
    },
    emptyOutDir: true,
  },
})
