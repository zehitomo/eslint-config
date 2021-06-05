# Changelog

## 4.6.0

- Bump `eslint` version to `7.28.0`

## 4.5.0

- Bump `eslint` version to `7.27.0`

## 4.4.0

- Bump `prettier` version to `2.3.0`

## 4.3.1

- Add `_.takeRight` to restricted methods

## 4.3.0

- Bump `eslint` version to `7.26.0`
- Bump `eslint-config-prettier` version to `8.3.0`
- Upgrade `lint-staged` version to `11.0.0`
- Bump `stylelint` version to `13.12.0`

## 4.2.0

- Bump `eslint` version to `7.25.0`
- Bump `eslint-config-prettier` version to `8.2.0`

## 4.1.0

- Bump `eslint` version to `7.24.0`

## 4.0.2

- Wrap `postinstall` `cross-env-shell` command in quotes

## 4.0.1

- Set up husky git hooks with `postinstall` instead of `prepare`

## 4.0.0

- Upgrade `husky` version to `6.0.0`
- Bump `eslint` version to `7.23.0`
- **Breaking change**: `husky.config.js` must be replaced with `.husky` folder. See: <https://typicode.github.io/husky/#/?id=migrate-from-v4-to-v6>

## 3.2.0

- Remove `.only` from restricted globals

## 3.1.0

- Bump `eslint` version to `7.22.0`
- Bump `stylelint` version to `13.12.0`

## 3.0.3

- Add `stylelint` to peerDependencies.
- Add `stylelint-config-prettier` and `stylelint-config-sass-guidelines` to dependencies.
- Add `stylelint.config.js`.
- Bump `eslint-config-prettier` to `8.0.2`.

## 2.3.0

- Add `if` to allowed identifiers list
- Bump `eslint` version to `7.20.0`
- Bump `lint-staged` to `10.5.4`

## 2.2.0

- Add `_.concat` to restricted methods
- Bump `eslint` version to `7.19.0`
- Bump `eslint-config-prettier` to `7.2.0`
- Bump `husky` to `4.3.8`

## 2.1.0

- Replace `no-shadow` with `@typescript-eslint/no-shadow` in TypeScript files.

## 2.0.0

- **Breaking change**: Non-root configs (`react`, `typescript-eslint`, `typescript-sort-keys`) now export an eslint config object instead of an object with rules. This way these can be used in an eslint config's `extends`.

## 1.13.0

- Add `typescript-sort-keys` file and rules

## 1.12.0

- Bump `eslint` version to `7.17.0`

## 1.11.0

- Configure `react/destructuring-assignment` rule

## 1.10.0

- Add rules referenced in REACT styleguide to React ruleset

## 1.9.0

- Add `typescript-eslint` rules

## 1.8.2

- Add shared rules from `z-web`

## 1.8.1

- Bump `eslint` version to `7.16.0`
- Bump `eslint-config-prettier` to `7.1.0`

## 1.8.0

- Add `eslint-plugin-react` rules

## 1.7.1

- Add `$q` to allowed identifiers list
- Bump `husky` to `4.3.6`

## 1.7.0

- Bump `eslint` version to `7.15.0`
- Upgrade `eslint-config-prettier` to `7.0.0`
- Bump `lint-staged` version to `10.5.3`
- Bump `prettier` to `2.2.1`

## 1.6.1

- Bump `eslint` version to `7.14.0`
- Bump `lint-staged` version to `10.5.2`
- Bump `prettier` to `2.2.0`

## 1.5.2

- Add `vm` to allowed identifiers list

## 1.5.1

- Add `db` to allowed identifiers list

## 1.5.0

- Bump `eslint` version to `7.13.0`
- Bump `eslint-config-prettier` to `6.15.0`
- Bump `lint-staged` version to `10.5.1`

## 1.4.0

- Bump `eslint` version to `7.12.1`
- Bump `lint-staged` version to `10.5.0`

## 1.3.0

- Bump `eslint` version to `7.12.0`

## 1.2.2

- Bump `husky` version to `10.4.2`
- Add `2` to ignored magic numbers list
- Add `TZ` to allowed identifiers list
- Allow arithmetic operators to be mixed
- Add better warning message for restricted `_.values`, `_.keys`, `_.entries`

## 1.2.1

- Add `on` to allowed identifiers list

## 1.2.0

- Bump `eslint` version to `7.11.0`
- Add `EN`, `JA`, `to` to allowed identifiers list

## 1.1.8

- Allow ++ to be used in the final-expression of a for loop

## 1.1.7

- Add `qs` to allowed identifiers list

## 1.1.6

- Add `fs` and `rp` to allowed identifiers list

## 1.1.5

- Add `as`, `in`, `k`, `v` to allowed identifiers list
- Bump `lint-staged`, `prettier` versions

## 1.1.4

- Add `_` and `t` to allowed identifiers list

## 1.1.3

- Add `en` and `ja` to allowed identifiers list

## 1.1.2

- Fix `no-plusplus`, `sort-keys` rule definitions

## 1.1.1

- Bump `eslint` version => 7.9.0

## 1.1.0

- Add JAVASCRIPT.md styleguide

## 1.0.1

- Adjust rules for no-magic-number (allow `-1`, `0`, `1`)

## 1.0.0

- Initial release
