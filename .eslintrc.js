module.exports = {
  extends: ['plugin:prettier/recommended'],
  plugins: ['prettier', 'react-hooks'],
  parser: '@typescript-eslint/parser',
  rules: {
    'prettier/prettier': 'error',
  },
}
