module.exports = {
  extends: ['@commitlint/config-angular'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['build', 'ci', 'doc', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test', 'lint', 'example', 'chore'],
    ],
  },
};
