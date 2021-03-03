# @zehitomo/eslint-config

> ESLint [shareable config](http://eslint.org/docs/developer-guide/shareable-configs.html) for Zehitomo

## Installation

```sh
npm install --save-dev @zehitomo/eslint-config
```

## Usage

### eslint

Once the `@zehitomo/eslint-config` package is installed, you can use it by specifying `@zehitomo` in the [`extends`](http://eslint.org/docs/user-guide/configuring#extending-configuration-files) section of your [ESLint configuration](http://eslint.org/docs/user-guide/configuring).

```js
{
  "extends": [
    "@zehitomo",
    // Optional ones for TypeScript and React
    "@zehitomo/eslint-config/typescript-eslint",
    "@zehitomo/eslint-config/typescript-sort-keys",
    "@zehitomo/eslint-config/react"
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
  ...require('@zehitomo/eslint-config/prettier.config'),
  // Additional, per-project rules...
};
```

### husky

Import the included config from your `husky.config.js` file.

```js
module.exports = {
  ...require('@zehitomo/eslint-config/husky.config'),
  // Additional, per-project rules...
};
```

### stylelint

Add the included config to `extends` in your `stylelint.config.js` file.

```js
module.exports = {
  extends: ['@zehitomo/eslint-config/stylelint.config'],
};
```
