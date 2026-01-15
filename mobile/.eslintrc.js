module.exports = {
  root: true,
  extends: '@react-native',
  plugins: ['header'],
  rules: {
    'header/header': [
      'error',
      'line', // Use line comments instead of block
      [
        ' **************************************************************************',
        '',
        '  Trippier Project - Mobile App',
        '',
        '  By: Ulysse Mercadal',
        '  Email: ulysse.mercadal@trippier.com',
        '',
        ' **************************************************************************',
      ],
      2
    ],
    'eol-last': ['error', 'always'],
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
    'react-native/no-inline-styles': 'off',
    'react/no-unstable-nested-components': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
  },
};
