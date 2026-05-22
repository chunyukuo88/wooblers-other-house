import next from 'eslint-config-next';
import prettierConfig from 'eslint-config-prettier';

export default [
  ...next,
  prettierConfig,
  {
    ignores: ['.next/**', 'node_modules/**', 'coverage/**'],
  },
  {
    rules: {
      'no-console': 'warn',
      'react-hooks/exhaustive-deps': 'error',
      '@next/next/no-img-element': 'error',
    },
  },
];
