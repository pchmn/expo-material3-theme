module.exports = {
  root: true,
  extends: ['universe/native', 'universe/web'],
  ignorePatterns: ['build'],
  plugins: ['unused-imports', 'simple-import-sort'],
  rules: {
    'unused-imports/no-unused-imports': 'warn',
    'simple-import-sort/imports': 'warn',
    'simple-import-sort/exports': 'warn',
    'import/order': 'off',
  },
};
