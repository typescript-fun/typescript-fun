// https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/README.md
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  plugins: ['@typescript-eslint', 'react-hooks'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier/@typescript-eslint',
    'plugin:react/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    // Unnecessary.
    'react/prop-types': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    // Buggy.
    '@typescript-eslint/explicit-function-return-type': 'off',
    // Any as placeholder is OK.
    '@typescript-eslint/no-explicit-any': 'off',
    // No console in production.
    'no-console': 'error',
    // This is must.
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    // Very usefull for bigger projects.
    'import/no-cycle': 'error',
    // Not working with React Native Web
    'import/no-unresolved': 'off',
  },
};
