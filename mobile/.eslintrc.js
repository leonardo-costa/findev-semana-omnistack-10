module.exports = {
  env: {
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "camelcase": "off",
    "no-underscore-dangle": "off",
    "react/jsx-filename-extension": ["error", { extensions: [".js", ".jsx"] }],
    "import/prefer-default-export": "off",
    "import/no-extraneous-dependencies": "off",

  },
};
