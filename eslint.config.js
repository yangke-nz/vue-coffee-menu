import js from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';

const isProd = process.env.NODE_ENV === 'production';

export default [
  // Build output is generated, never hand-written: linting it produced
  // dozens of phantom errors under the old config.
  { ignores: ['dist/**', 'node_modules/**'] },

  js.configs.recommended,
  // vue2-*, not the default flat/recommended: that preset carries Vue 3
  // rules and flags correct Vue 2 code (e.g. beforeDestroy) as deprecated.
  ...pluginVue.configs['flat/vue2-recommended'],

  // Application code runs in the browser.
  {
    files: ['src/**/*.{js,vue}'],
    languageOptions: {
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        localStorage: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
      },
    },
  },

  // Root config files and build scripts run in Node.
  {
    files: ['*.js', 'scripts/**/*.js'],
    languageOptions: {
      globals: { process: 'readonly', console: 'readonly', Buffer: 'readonly' },
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
