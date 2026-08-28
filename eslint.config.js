import js from '@eslint/js';
import eslintReact from '@eslint-react/eslint-plugin';
import prettierPlugin from 'eslint-plugin-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import sortKeysFix from 'eslint-plugin-sort-keys-fix';
import unicornPlugin from 'eslint-plugin-unicorn';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';

import hungarianRules from './eslint-rules/hungarian-notation-for-descriptive-patterns.js';
import signatureRules from './eslint-rules/verification-of-signatures-of-descriptive-patterns.js';

export default defineConfig([
  globalIgnores(['dist', 'build', 'coverage', 'node_modules']),
  js.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      ...tseslint.configs.recommended,
      eslintReact.configs['recommended-typescript'],
      unicornPlugin.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      local: {
        rules: {
          ...hungarianRules,
          ...signatureRules,
        },
      },
      prettier: prettierPlugin,
      'simple-import-sort': simpleImportSort,
      'sort-keys-fix': sortKeysFix,
      unicorn: unicornPlugin,
      'unused-imports': unusedImports,
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { fixStyle: 'inline-type-imports', prefer: 'type-imports' },
      ],
      '@typescript-eslint/member-ordering': 'error',
      '@typescript-eslint/no-unused-vars': 'off',

      '@eslint-react/exhaustive-deps': 'off',
      '@eslint-react/rules-of-hooks': 'off',

      'local/hungarian-notation-for-descriptive-patterns': 'error',
      'local/verification-of-signatures-of-descriptive-patterns': 'error',

      'no-console': ['warn', { allow: ['error', 'warn'] }],
      'object-shorthand': 'error',
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', next: '*', prev: 'multiline-block-like' },
        { blankLine: 'always', next: '*', prev: ['const', 'let', 'var'] },
        { blankLine: 'any', next: ['const', 'let', 'var'], prev: ['const', 'let', 'var'] },
        {
          blankLine: 'always',
          next: ['return', 'throw', 'try', 'if', 'switch', 'function'],
          prev: '*',
        },
      ],
      'prettier/prettier': [
        'error',
        {
          arrowParens: 'always',
          bracketSameLine: false,
          endOfLine: 'lf',
          jsxSingleQuote: true,
          printWidth: 100,
          semi: true,
          singleQuote: true,
          tabWidth: 2,
          trailingComma: 'all',
          useTabs: false,
        },
      ],
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': 'error',
      'sort-keys-fix/sort-keys-fix': 'error',
      'unicorn/no-null': 'off',
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/prefer-query-selector': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          args: 'after-used',
          argsIgnorePattern: '^_',
          vars: 'all',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
]);
