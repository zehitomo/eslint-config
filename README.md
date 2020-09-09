# @zehitomo/eslint-config

> ESLint [shareable config](http://eslint.org/docs/developer-guide/shareable-configs.html) for Zehitomo

## Installation

```sh
npm install --save-dev eslint prettier husky @zehitomo/eslint-config
```

## Usage

### eslint

Once the `@zehitomo/eslint-config` package is installed, you can use it by specifying `@zehitomo` in the [`extends`](http://eslint.org/docs/user-guide/configuring#extending-configuration-files) section of your [ESLint configuration](http://eslint.org/docs/user-guide/configuring).

```json
{
  "extends": ["@zehitomo"],
  "rules": {
    // Additional, per-project rules...
  }
}
```

### prettier

Export the included config from your `prettier.config.js` file.

```js
module.exports = {
  ...require('@zehitomo/eslint-config/prettier.config'),
  // Additional, per-project rules...
};
```

### husky

Export the included config from your `husky.config.js` file.

```js
module.exports = {
  ...require('@zehitomo/eslint-config/husky.config'),
  // Additional, per-project rules...
};
```
