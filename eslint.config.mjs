import { defineConfig } from 'eslint-define-config'
import eslintPluginVue from 'eslint-plugin-vue'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import vueEslintParser from 'vue-eslint-parser'
import typescriptParser from '@typescript-eslint/parser'

export default defineConfig([
  {
    files: ['**/*.ts', '**/*.vue'],
    plugins: {
      'eslint-plugin-vue': eslintPluginVue,
      prettier: eslintPluginPrettier,
    },
    languageOptions: {
      parser: vueEslintParser,
      parserOptions: {
        parser: typescriptParser,
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'prettier/prettier': 'warn',
    },
  },
])
