module.exports = {
  hooks: {
    // very bad practice!!! it blocks git rebase completely
    //"prepare-commit-msg": "exec < /dev/tty && git cz --hook || true",
    // "pre-commit": 'lint-staged’,
    'pre-commit': 'git add . && tsc --noEmit && git add . && lint-staged',
    // 'pre-commit': 'echo "Pre-commit husky"',
    'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS',
  },
};
