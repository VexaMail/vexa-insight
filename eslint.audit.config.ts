// Scratch audit config: base config plus the four remaining hardening rule
// groups from the backlog, to enumerate and verify fixes. Not part of the
// gate; delete when the hardening lands in eslint.config.ts.
import { defineConfig } from 'eslint/config'
import baseConfig from './eslint.config.ts'

type PluginRecord = Record<string, unknown>

const a11yPlugin = baseConfig.flatMap((c) => {
  if (c && typeof c === 'object' && 'plugins' in c) {
    const plugins = (c as { plugins?: PluginRecord }).plugins
    if (plugins && typeof plugins === 'object' && 'jsx-a11y' in plugins) {
      return [plugins['jsx-a11y']]
    }
  }
  return []
})[0] as
  | { flatConfigs?: { recommended?: { rules?: Record<string, unknown> } } }
  | undefined

const a11yRules = a11yPlugin?.flatConfigs?.recommended?.rules ?? {}

const config = defineConfig([
  ...baseConfig,
  {
    files: ['**/*.{jsx,tsx}'],
    rules: {
      ...(a11yRules as Record<string, 'error' | 'warn' | 'off'>),
      'react/jsx-no-leaked-render': 'error',
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    ignores: ['eslint.config.ts', 'eslint.audit.config.ts', 'scripts/**'],
    rules: {
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-unsafe-member-access': 'error',
      '@typescript-eslint/no-unsafe-call': 'error',
      '@typescript-eslint/no-unsafe-argument': 'error',
      '@typescript-eslint/no-unsafe-return': 'error',
      'security/detect-non-literal-fs-filename': 'error',
    },
  },
])

export default config
