module.exports = {
  root: true,
  extends: '@react-native',
  plugins: ['babel'],
  rules: {
    'prettier/prettier': ['error', { singleQuote: true }],
    'prettier/prettier': ['error', { jsxSingleQuote: false }],
  },
};
