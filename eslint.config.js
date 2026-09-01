import js from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';

const isProd = process.env.NODE_ENV === 'production';

export default [
  // Build output is generated, never hand-written: linting it produced
  // dozens of phantom errors under the old config.
  { ignores: ['dist/**', 'node_modules/**'] },

  js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],

  // Application code runs in the browser.
  {
    files: ['src/**/*.{js,vue}'],
    languageOptions: {
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        localStorage: 'readonly',
      },
    },
  },

  // Config files at the repo root run in Node.
  {
    files: ['*.js'],
    languageOptions: {
      globals: { process: 'readonly' },
    },
  },

  {
    rules: {
      'no-console': isProd ? 'error' : 'off',
      'no-debugger': isProd ? 'error' : 'off',
      'vue/multi-word-component-names': 'off',
    },
  },
];
