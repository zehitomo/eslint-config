# @a-ogilvie/eslint-config

> ESLint [shareable config](http://eslint.org/docs/developer-guide/shareable-configs.html)

## Installation

```sh
npm install --save-dev @a-ogilvie/eslint-config
```

## Usage

### eslint

Once the `@a-ogilvie/eslint-config` package is installed, you can use it by specifying `@a-ogilvie` in the [`extends`](http://eslint.org/docs/user-guide/configuring#extending-configuration-files) section of your [ESLint configuration](http://eslint.org/docs/user-guide/configuring).

```js
{
  "extends": [
    "@a-ogilvie",
    // Optional ones for TypeScript and React
    "@a-ogilvie/eslint-config/typescript-eslint",
    "@a-ogilvie/eslint-config/typescript-sort-keys",
    "@a-ogilvie/eslint-config/react"
  ],
  "rules": {
    // Additional, per-project rules...
  }
}
```

### prettier

Import the included config from your `prettier.config.js` file.

```js
module.exports = {
  ...require('@a-ogilvie/eslint-config/prettier.config'),
  // Additional, per-project rules...
};
```

### husky

Import the included config from your `husky.config.js` file.

```js
module.exports = {
  ...require('@a-ogilvie/eslint-config/husky.config'),
  // Additional, per-project rules...
};
```

### stylelint

Add the included config to `extends` in your `stylelint.config.js` file.

```js
module.exports = {
  extends: ['@a-ogilvie/eslint-config/stylelint.config'],
};
```
