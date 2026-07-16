import { defineConfig } from 'tsup'
import { readFileSync } from 'fs'

const { version } = JSON.parse(readFileSync('./package.json', 'utf-8')) as { version: string }

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: false,
  sourcemap: false,
  clean: true,
  // Runs as an executable MCP server over stdio.
  banner: { js: '#!/usr/bin/env node' },
  // Bake the package version into the bundle so serverInfo stays in sync.
  define: {
    __MCP_VERSION__: JSON.stringify(version),
  },
})
