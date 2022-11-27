import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import tsconfigPaths from 'vite-tsconfig-paths'
import { version } from './package.json'

export default defineConfig(() => {
  return {
    publicDir: false,
    clearScreen: false,
    define: {
      __VERSION__: JSON.stringify(version)
    },
    build: {
      outDir: 'dist',
      // modulePreload: false,
      minify: false,
      lib: {
        entry: resolve(__dirname, 'core/index.ts'),
        formats: ['es', 'cjs', 'iife'],
        fileName: (format, entryName) => {
          const fileNameMap = {
            iife: `${entryName}.iife.js`,
            cjs: `${entryName}.cjs`,
            es: `${entryName}.mjs`
          }
          return fileNameMap[format]
        },
        name: 'WUse'
      },
      rollupOptions: {
        output: {
          globals: {
            'vue-demi': 'VueDemi',
            'vue': 'Vue'
          }
        },
        external: ['vue-demi', 'vue']
      }
    },
    plugins: [
      tsconfigPaths(),
      dts({
        outputDir: 'dist/types'
      })
    ]
  }
})
