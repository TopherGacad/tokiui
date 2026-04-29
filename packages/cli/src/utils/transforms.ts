/**
 * Rewrites the import path for cn() from the library's internal path
 * to the user's project path after copying a component file.
 */
export function transformImports(source: string, libDir: string): string {
  return source.replace(/from ['"]\.\.\/lib\/utils['"]/g, `from '${libDir}/utils'`)
}
