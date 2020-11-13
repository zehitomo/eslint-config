'use strict';

module.exports = {
  extends: ['eslint:recommended', 'prettier'],
  rules: {
    'arrow-body-style': ['error', 'as-needed'],
    camelcase: ['warn', { allow: ['^UNSAFE_'], ignoreDestructuring: true }],
    'class-methods-use-this': 'error',
    eqeqeq: 'error',
    'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
    'id-length': [
      'error',
      {
        exceptions: [
          '_',
          'as',
          'db',
          'en',
          'EN',
          'fs',
          'i',
          'id',
          'in',
          'ja',
          'JA',
          'k',
          'n',
          'on',
          'qs',
          'rp',
          't',
          'to',
          'TZ',
          'v',
        ],
        min: 3,
      },
    ],
    'new-cap': 'warn',
    'no-array-constructor': 'error',
    'no-console': 'error',
    'no-else-return': 'error',
    'no-eval': 'error',
    'no-implicit-coercion': 'error',
    'no-lonely-if': 'error',
    'no-loop-func': 'error',
    'no-magic-numbers': [
      'error',
      { enforceConst: true, ignore: [-1, 0, 1, 2], ignoreDefaultValues: true },
    ],
    'no-mixed-operators': [
      'error',
      {
        groups: [
          ['&', '|', '^', '~', '<<', '>>', '>>>'],
          ['&&', '||'],
        ],
      },
    ],
    'no-multi-assign': 'error',
    'no-negated-condition': 'error',
    'no-nested-ternary': 'error',
    'no-new-func': 'error',
    'no-new-object': 'error',
    'no-new-wrappers': 'error',
    'no-param-reassign': 'error',
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-restricted-globals': [
      'error',
      { message: 'Use Number.isFinite instead.', name: 'isFinite' },
      { message: 'Use Number.isNaN instead.', name: 'isNaN' },
      { message: 'Use Number.parseFloat instead.', name: 'parseFloat' },
      {
        message: 'Use Number for decimal, Number.parseInt for other radices instead.',
        name: 'parseInt',
      },
    ],
    'no-restricted-properties': [
      'error',
      { message: 'Use + operator instead.', object: '_', property: 'add' },
      { message: 'Use Object.assign instead.', object: '_', property: 'assign' },
      { message: 'Use Math.ceil instead.', object: '_', property: 'ceil' },
      { message: 'Use the spread operator ... instead.', object: '_', property: 'clone' },
      { message: 'Use / operator instead.', object: '_', property: 'divide' },
      { message: 'Use a regular loop instead.', object: '_', property: 'each' },
      { message: 'Use String.endsWith instead.', object: '_', property: 'endsWith' },
      {
        message: 'Use Object.entries instead. Take care not to pass undefined.',
        object: '_',
        property: 'entries',
      },
      {
        message: 'Use Array.every, or disable this rule to iterate object.',
        object: '_',
        property: 'every',
      },
      { message: 'Use Array.fill instead.', object: '_', property: 'fill' },
      {
        message: 'Use Array.filter, or disable this rule to iterate object.',
        object: '_',
        property: 'filter',
      },
      {
        message: 'Use Array.find, or disable this rule to iterate object.',
        object: '_',
        property: 'find',
      },
      { message: 'Use Array.findIndex instead.', object: '_', property: 'findIndex' },
      {
        message: 'Use Array.flatMap, or disable this rule to iterate object.',
        object: '_',
        property: 'flatMap',
      },
      { message: 'Use Array.flat instead.', object: '_', property: 'flatten' },
      { message: 'Use Array.flat instead.', object: '_', property: 'flattenDepth' },
      { message: 'Use Math.floor instead.', object: '_', property: 'floor' },
      { message: 'Use a regular loop instead.', object: '_', property: 'forEach' },
      { message: 'Use for..in loop instead.', object: '_', property: 'forIn' },
      { message: 'Use Object.fromEntries instead.', object: '_', property: 'fromPairs' },
      {
        message: 'Use Array.includes, or disable this rule to iterate object.',
        object: '_',
        property: 'includes',
      },
      { message: 'Use Array.indexOf instead.', object: '_', property: 'indexOf' },
      { message: 'Use Array.isArray instead.', object: '_', property: 'isArray' },
      { message: 'Use typeof instead.', object: '_', property: 'isBoolean' },
      { message: 'Use Number.isFinite instead.', object: '_', property: 'isFinite' },
      { message: 'Use typeof instead.', object: '_', property: 'isFunction' },
      { message: 'Use Number.isInteger instead.', object: '_', property: 'isInteger' },
      { message: 'Use Number.isNaN instead.', object: '_', property: 'isNaN' },
      { message: 'Compare with null instead.', object: '_', property: 'isNull' },
      { message: 'Use typeof instead.', object: '_', property: 'isNumber' },
      { message: 'Use typeof instead.', object: '_', property: 'isObject' },
      { message: 'Use Number.isSafeInteger instead.', object: '_', property: 'isSafeInteger' },
      { message: 'Use typeof instead.', object: '_', property: 'isString' },
      { message: 'Use typeof instead.', object: '_', property: 'isUndefined' },
      { message: 'Use Array.join instead.', object: '_', property: 'join' },
      {
        message: 'Use Object.keys instead. Take care not to pass undefined.',
        object: '_',
        property: 'keys',
      },
      {
        message: 'Use Array.map, or disable this rule to iterate object.',
        object: '_',
        property: 'map',
      },
      { message: 'Use Math.min instead.', object: '_', property: 'min' },
      { message: 'Use Math.max instead.', object: '_', property: 'max' },
      { message: 'Use * operator instead.', object: '_', property: 'multiply' },
      { message: 'Use String.padEnd instead.', object: '_', property: 'padEnd' },
      { message: 'Use String.padStart instead.', object: '_', property: 'padStart' },
      { message: 'Use Number.parseInt instead.', object: '_', property: 'parseInt' },
      { message: 'Use a regular loop instead.', object: '_', property: 'reduce' },
      { message: 'Use String.repeat instead.', object: '_', property: 'repeat' },
      { message: 'Use Array.reverse instead.', object: '_', property: 'reverse' },
      { message: 'Use Array.slice instead.', object: '_', property: 'slice' },
      { message: 'Use String.split instead.', object: '_', property: 'split' },
      { message: 'Use String.startsWith instead.', object: '_', property: 'startsWith' },
      { message: 'Use - operator instead.', object: '_', property: 'subtract' },
      { message: 'Use Array.slice instead.', object: '_', property: 'take' },
      { message: 'Use a template literal instead.', object: '_', property: 'template' },
      { message: 'Use String.toLowerCase instead.', object: '_', property: 'toLower' },
      { message: 'Use Object.entries instead.', object: '_', property: 'toPairs' },
      { message: 'Use String instead.', object: '_', property: 'toString' },
      { message: 'Use String.toUpperCase instead.', object: '_', property: 'toUpper' },
      { message: 'Use a regular loop instead.', object: '_', property: 'transform' },
      { message: 'Use String.trim instead.', object: '_', property: 'trim' },
      { message: 'Use String.trimEnd instead.', object: '_', property: 'trimEnd' },
      { message: 'Use String.trimStart instead.', object: '_', property: 'trimStart' },
      {
        message: 'Use Object.values instead. Take care not to pass undefined.',
        object: '_',
        property: 'values',
      },
      { object: 'describe', property: 'only' },
      { object: 'it', property: 'only' },
    ],
    'no-return-assign': 'error',
    'no-return-await': 'error',
    'no-sequences': 'error',
    'no-shadow': 'warn',
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'no-unmodified-loop-condition': 'warn',
    'no-unneeded-ternary': 'error',
    'no-useless-computed-key': 'error',
    'no-useless-constructor': 'error',
    'no-var': 'error',
    'no-void': 'error',
    'object-shorthand': 'error',
    'one-var': ['error', 'never'],
    'operator-assignment': 'error',
    'prefer-arrow-callback': 'error',
    'prefer-const': 'error',
    'prefer-destructuring': 'error',
    'prefer-exponentiation-operator': 'error',
    'prefer-object-spread': 'error',
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'prefer-template': 'error',
    radix: 'error',
    'require-await': 'error',
    'require-yield': 'error',
    'sort-keys': ['warn', 'asc', { natural: true }],
    'spaced-comment': ['error', 'always', { markers: ['/'] }],
    strict: ['error', 'global'],
    yoda: 'error',
  },
};
