import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(() => {
  const baseUrl = process.env.BASE_URL ?? '/'
  return {
    root: 'src',
    publicDir: path.join(process.cwd(), 'src', 'public'),
    base: baseUrl,
    build: {
      outDir: '../dist',
      emptyOutDir: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
            return null;
          }
        }
      }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    plugins: [vue()],
  }
})
