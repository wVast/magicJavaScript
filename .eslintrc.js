module.exports = {
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: "module"
  },
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es6: true
  },
  root: true,
  rules: {
    // error
    "no-constant-condition": 2,
    "no-dupe-args": 2,
    "no-redeclare": 2,
    "no-use-before-define": 2,
    "no-undef": 2,
    "semi": [2, "always"],
    "no-mixed-requires": [2, false],
    "no-mixed-spaces-and-tabs": [2, false],
    "no-unused-vars": [2, {"vars": "all", "args": "after-used"}],

    // waring
    "comma-spacing": 1,
    "no-dupe-keys": 1,
    "eol-last": 1,
    "quotes": [1, "double"],
  }
};
