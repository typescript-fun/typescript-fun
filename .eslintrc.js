module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
  ],
  plugins: ['react-hooks'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    // Not necessarry.
    'react/prop-types': 'off',
    // Buggy.
    '@typescript-eslint/explicit-function-return-type': 'off',
    // Any as placeholder is OK.
    '@typescript-eslint/no-explicit-any': 'off',
    // No console in production.
    'no-console': 'error',
    // This is must.
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
  },
};
