import { defineConfig } from 'tsup'
import { readFileSync } from 'fs'

const { version } = JSON.parse(readFileSync('./package.json', 'utf-8')) as { version: string }

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs'],
  dts: false,
  sourcemap: false,
  clean: true,
  banner: { js: '#!/usr/bin/env node' },
  // Bake CLI version into the bundle so registry fetches can be pinned to the
  // matching git tag rather than the volatile "main" branch.
  define: {
    __CLI_VERSION__: JSON.stringify(version),
  },
})
