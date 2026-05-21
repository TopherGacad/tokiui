import { defineConfig } from 'tsup'

export default defineConfig((options) => ({
  entry: {
    index: 'src/index.ts',
    client: 'src/client.ts',
  },
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  clean: !options.watch,
  external: ['react', 'react-dom'],
  banner: {
    js: '"use client";',
  },
}))
