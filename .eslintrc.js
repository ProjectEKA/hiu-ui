module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: ['airbnb', 'plugin:react/recommended', 'prettier'],
  globals: {
    BASE_NAME: 'readonly',
    BACKEND_BASE_URL: 'readonly',
    BACKEND_API_PATH: 'readonly',
    DICOM_BASE_URL: 'readonly',
    DICOM_SERVER_PATH: 'readonly',
    REACT_APP_SITE_TITLE: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'import/no-extraneous-dependencies': ['error', {'devDependencies': ['**/*.test.js', '**/*.test.jsx','**/*.spec.js', '**/*.spec.jsx']}],
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['**/setupTests.js', '**/*.test.js'] },
    ],
  },
};
