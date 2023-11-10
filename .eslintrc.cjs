/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    '@remix-run/eslint-config',
    '@remix-run/eslint-config/node',
    // 'plugin:@tanstack/eslint-plugin-query/recommended',
  ],
  // plugins: ['@tanstack/query'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'warn',
  },
};
