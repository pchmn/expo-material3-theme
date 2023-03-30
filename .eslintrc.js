module.exports = {
  root: true,
  extends: ['universe/native', 'universe/web'],
  ignorePatterns: ['build'],
  plugins: ['unused-imports'],
  rules: {
    'unused-imports/no-unused-imports': 'warn',
  },
};
