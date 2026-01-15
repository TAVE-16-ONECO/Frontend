import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'
import pluginQuery from '@tanstack/eslint-plugin-query'
import eslintConfigPrettier from 'eslint-config-prettier/flat'
import plugin from 'eslint-plugin-react'

export default defineConfig([
  globalIgnores(['dist', 'dev-dist']),
  // 기본 JS 권장 설정
  js.configs.recommended,

  // React 관련 설정
  plugin.configs.flat['jsx-runtime'],

  // React Hooks 및 Refresh 설정
  {
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
    },
  },

  // 프로젝트 전역 설정 및 커스텀 규칙
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },

  // 기타 플러그인
  ...pluginQuery.configs['flat/recommended'],
  eslintConfigPrettier
])
