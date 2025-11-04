// @ts-check

import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import prettier from 'eslint-plugin-prettier/recommended';
import reactRefresh from 'eslint-plugin-react-refresh';
import sonarjs from 'eslint-plugin-sonarjs';
import tseslint from 'typescript-eslint';

export default defineConfig(
  {
    ignores: ['**/*.js', '**/*.test.tsx'],
  },
  eslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  reactRefresh.configs.recommended,
  prettier,
  {
    plugins: { sonarjs },
    rules: {
      'sonarjs/no-implicit-dependencies': 'error',
    },
  },
);
