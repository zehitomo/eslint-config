# JavaScript Style Guide

> A human-first approach to JavaScript.

## Intro

<a name="intro"></a>

- [0.1](#intro--human-first) The most important principle when writing code is readability and understandability, moreso than performance (except in extreme circumstances). Code is written to be consumed by other humans, either colleagues or future you. It's transpiled to machine code for computers.. If you get the feedback "I don't understand what this means" during code review, this probably indicates a problem with the code, not with the reviewer.

- [0.2](#intro--rules-eslint) [`eslint`](https://eslint.org/docs/user-guide/) is used for code style. In a case where following an `eslint` rule makes code more difficult to read, it is perfectly acceptable to disable the rule for the offending line or file. Be sure to make a note of why the rule is disabled, either in the pull request or in the code itself.

  Beware of disabling rules without thinking. Always try to follow the rules, and disable them only where no reasonable alternative exists.

- [0.3](#intro--rules-prettier) [`prettier`](https://prettier.io/docs/en/why-prettier.html) is used for code formatting. There may be cases where you don't like the appearance of the formatted code. In this case, feel free to restructure the code, but you should **never disable prettier formatting**.

  > Why? By enforcing a consistent use of prettier, our codebase gets consistent formatting for free. Not only does this look nice, but it also minimises the number of line changes during code review.

## Table of Contents

<!-- markdownlint-disable MD029  -->

0. [Intro](#intro)
1. [Types](#types)
1. [References](#references)
1. [Objects](#objects)
1. [Arrays](#arrays)
1. [Destructuring](#destructuring)
1. [Strings](#strings)
1. [Functions](#functions)
1. [Arrow Functions](#arrow-functions)
1. [Async Functions](#async-functions)
1. [Classes & Constructors](#classes--constructors)
1. [Modules](#modules)
1. [Iterators and Generators](#iterators-and-generators)
1. [Properties](#properties)
1. [Variables](#variables)
1. [Comparison Operators & Equality](#comparison-operators--equality)
1. [Blocks](#blocks)
1. [Control Statements](#control-statements)
1. [Comments](#comments)
1. [Whitespace](#whitespace)
1. [Commas](#commas)
1. [Semicolons](#semicolons)
1. [Typecasting & Coercion](#typecasting--coercion)
1. [Naming Conventions](#naming-conventions)
1. [Accessors](#accessors)
1. [Lodash](#lodash)
1. [Standard Library](#standard-library)
1. [Testing](#testing)
1. [Performance](#performance)
1. [Resources](#resources)
<!-- markdownlint-enable MD029  -->

## Types

<a name="types--primitives"></a>

- [1.1](#types--primitives) When you access a primitive type you work directly on its value.

  - `boolean`
  - `null`
  - `number`
  - `string`
  - `undefined`
  - `bigint`
  - `symbol`

    ```javascript
    const foo = 1;
    let bar = foo;

    bar = 9;

    console.log(foo, bar); // => 1, 9
    ```

  - Symbols and BigInts cannot be faithfully polyfilled, so they should not be used when targeting browsers/environments that don't support them natively.

<a name="types--complex"></a>

- [1.2](#types--complex) When you access a complex type you work on a reference to its value.

  - `object`
  - `array`
  - `function`

    ```javascript
    const foo = [1, 2];
    const bar = foo;

    bar[0] = 9;

    console.log(foo[0], bar[0]); // => 9, 9
    ```

**[⬆ back to top](#table-of-contents)**

## References

<a name="references--prefer-const"></a>

- [2.1](#references--prefer-const) Use `const` for references; avoid using `var`. eslint: [`prefer-const`](https://eslint.org/docs/rules/prefer-const.html), [`no-const-assign`](https://eslint.org/docs/rules/no-const-assign.html)

  > Why? This ensures that you can't reassign your references, which can lead to bugs and difficult to comprehend code.

  ```javascript
  // bad
  var a = 1;
  var b = 2;

  // good
  const a = 1;
  const b = 2;
  ```

<a name="references--no-var"></a>

- [2.2](#references--no-var) If you must reassign references, use `let` instead of `var`. eslint: [`no-var`](https://eslint.org/docs/rules/no-var.html)

  > Why? `let` is block-scoped rather than function-scoped like `var`.

  ```javascript
  // bad
  var count = 1;
  if (true) {
    count += 1;
  }

  // good, use the let.
  let count = 1;
  if (true) {
    count += 1;
  }
  ```

**[⬆ back to top](#table-of-contents)**

## Objects

<a name="objects--no-new"></a>

- [3.1](#objects--no-new) Use literal syntax for object creation. eslint: [`no-new-object`](https://eslint.org/docs/rules/no-new-object.html)

  ```javascript
  // bad
  const item = new Object();

  // good
  const item = {};
  ```

<a name="objects--computed-properties"></a>

- [3.2](#pbjects--computed-properties) Use computed property names when creating objects with dynamic property names.

  > Why? They allow you to define all the properties of an object in one place.

  ```javascript
  function getKey(k) {
    return `a key named ${k}`;
  }

  // bad
  const obj = {
    id: 5,
    name: 'San Francisco',
  };
  obj[getKey('enabled')] = true;

  // good
  const obj = {
    id: 5,
    name: 'San Francisco',
    [getKey('enabled')]: true,
  };
  ```

<a name="objects--shorthand"></a>

- [3.3](#objects--shorthand) Use object shorthand. eslint: [`object-shorthand`](https://eslint.org/docs/rules/object-shorthand.html)

  > Why? It is shorter and descriptive.

  ```javascript
  // bad
  const atom = {
    value: 1,

    addValue: function (value) {
      return atom.value + value;
    },
  };

  // bad
  const lukeSkywalker = 'Luke Skywalker';
  const obj = { lukeSkywalker: lukeSkywalker };

  // good
  const atom = {
    value: 1,

    addValue(value) {
      return atom.value + value;
    },
  };

  // good
  const lukeSkywalker = 'Luke Skywalker';

  const obj = { lukeSkywalker };
  ```

<a name="objects--quotes-props"></a>

- [3.4](#objects--quoted-props) Only quote properties that are invalid identifiers. eslint: [`quote-props`](https://eslint.org/docs/rules/quote-props.html)

  > Why? In general we consider it subjectively easier to read. It improves syntax highlighting, and is also more easily optimized by many JS engines.

  ```javascript
  // bad
  const bad = {
    foo: 3,
    bar: 4,
    'data-blah': 5,
  };

  // good
  const good = {
    foo: 3,
    bar: 4,
    'data-blah': 5,
  };
  ```

<a name="objects--prototype-builtins"></a>

- [3.5](#objects--prototype-builtins) Do not call `Object.prototype` methods directly, such as `hasOwnProperty`, `propertyIsEnumerable`, and `isPrototypeOf`. eslint: [`no-prototype-builtins`](https://eslint.org/docs/rules/no-prototype-builtins)

  > Why? These methods may be shadowed by properties on the object in question - consider `{ hasOwnProperty: false }` - or, the object may be a null object (`Object.create(null)`).

  ```javascript
  // bad
  console.log(object.hasOwnProperty(key));

  // good
  console.log(Object.prototype.hasOwnProperty.call(object, key));
  ```

<a name="objects--rest-spread"></a>

- [3.6](#objects--rest-spread) Prefer the object spread operator over [`Object.assign`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) to shallow-copy objects. Use the object rest operator to get a new object with certain properties omitted.

  ```javascript
  // very bad
  const original = { a: 1, b: 2 };
  const copy = Object.assign(original, { c: 3 }); // this mutates `original` ಠ_ಠ
  delete copy.a; // so does this

  // bad
  const original = { a: 1, b: 2 };
  const copy = Object.assign({}, original, { c: 3 }); // copy => { a: 1, b: 2, c: 3 }

  // good
  const original = { a: 1, b: 2 };
  const copy = { ...original, c: 3 }; // copy => { a: 1, b: 2, c: 3 }

  const { a, ...noA } = copy; // noA => { b: 2, c: 3 }
  ```

<a name="objects--sort-keys"></a>

- [3.7](#objects--sort-keys) When declaring multiple properties, sort these alphabetically. eslint: [`sort-keys`](https://eslint.org/docs/rules/sort-keys)

  > Why? It's easier to spot missing properties when they are alphabetised.

  ```javascript
  // bad
  const obj = { a: 1, c: 3, b: 2 };

  // bad
  const obj = { 1: 'a', 10: 'c', 2: 'b' };

  // good
  const obj = { a: 1, b: 2, c: 3 };

  // good
  const obj = { 1: 'a', 2: 'b', 10: 'c' };
  ```

**[⬆ back to top](#table-of-contents)**

## Arrays

<a name="arrays--literals"></a>

- [4.1](#arrays--literals) Use the literal syntax for array creation. eslint: [`no-array-constructor`](https://eslint.org/docs/rules/no-array-constructor.html)

  ```javascript
  // bad
  const items = new Array();

  // good
  const items = [];
  ```

<a name="arrays--push"></a>

- [4.2](#arrays--push) Use [Array#push](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/push) instead of direct assignment to add items to an array.

  ```javascript
  const someStack = [];

  // bad
  someStack[someStack.length] = 'abracadabra';

  // good
  someStack.push('abracadabra');
  ```

<a name="arrays--slice"></a>

- [4.3](#arrays--slice) Use [Array#slice](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) to shallow copy arrays.

  ```javascript
  // bad
  const len = items.length;
  const itemsCopy = [];
  let i;

  for (i = 0; i < len; i += 1) {
    itemsCopy[i] = items[i];
  }

  // good
  const itemsCopy = [...items];

  // best
  const itemsCopy = items.slice();
  ```

<a name="arrays--from-array-like"></a>

- [4.4](#arrays--from-array-like) Use [`Array.from`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/from) for converting an array-like object to an array.

  ```javascript
  const arrLike = { 0: 'foo', 1: 'bar', 2: 'baz', length: 3 };

  // bad
  const arr = Array.prototype.slice.call(arrLike);

  // good
  const arr = Array.from(arrLike);
  ```

<a name="arrays--mapping"></a>

- [4.5](#arrays--mapping) Use [`Array.from`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/from) instead of spread `...` for mapping over iterables, because it avoids creating an intermediate array.

  ```javascript
  // bad
  const baz = [...foo].map(bar);

  // good
  const baz = Array.from(foo, bar);
  ```

<a name="arrays--no-reduce"></a>

- [4.6](#arrays--no-reduce) Avoid using `Array.reduce`. Use a loop instead.

  > Why? Array.reduce is very difficult to read. Just use a simple loop.

  ```javascript
  // bad
  const obj = ['a', 'b', 'c'].reduce((acc, cur) => {
    acc[cur] = 0;
    return acc;
  }, {});

  // good
  const obj = {};
  for (const prop of ['a', 'b', 'c']) {
    obj[prop] = 0;
  }
  ```

<a name="arrays--callback-return"></a>

- [4.7](#arrays--callback-return) Use return statements in array method callbacks. It's ok to omit the return if the function body consists of a single statement returning an expression without side effects, following [8.2](#arrows--implicit-return). eslint: [`array-callback-return`](https://eslint.org/docs/rules/array-callback-return)

  ```javascript
  // good
  [1, 2, 3].map((x) => {
    const y = x + 1;
    return x * y;
  });

  // good
  [1, 2, 3].map((x) => x + 1);

  // bad
  inbox.filter(function (msg) {
    const { subject, author } = msg;
    if (subject === 'Mockingbird') {
      return author === 'Harper Lee';
    } else {
      return false;
    }
  });

  // good
  inbox.filter((msg) => {
    const { subject, author } = msg;
    if (subject === 'Mockingbird') {
      return author === 'Harper Lee';
    }

    return false;
  });
  ```

**[⬆ back to top](#table-of-contents)**

## Destructuring

<a name="destructuring--object"></a>

- [5.1](#destructuring--object) Use object destructuring when accessing and using multiple properties of an object, and for arrays. eslint: [`prefer-destructuring`](https://eslint.org/docs/rules/prefer-destructuring)

  > Why? Destructuring saves you from creating temporary references for those properties.

  ```javascript
  // bad
  function getFullName(user) {
    const firstName = user.firstName;
    const lastName = user.lastName;

    return `${firstName} ${lastName}`;
  }

  // bad
  const arr = [1, 2, 3, 4];
  const first = arr[0];
  const second = arr[1];

  // good
  function getFullName(user) {
    const { firstName, lastName } = user;
    return `${firstName} ${lastName}`;
  }

  // best
  function getFullName({ firstName, lastName }) {
    return `${firstName} ${lastName}`;
  }

  // good
  const [first, second] = arr;
  ```

<a name="destructuring--object-over-array"></a>

- [5.2](#destructuring--object-over-array) Use object destructuring for multiple return values, not array destructuring.

  > Why? You can add new properties over time or change the order of things without breaking call sites.

  ```javascript
  // bad
  function processInput(input) {
    // then a miracle occurs
    return [left, right, top, bottom];
  }

  // the caller needs to think about the order of return data
  const [left, , top] = processInput(input);

  // good
  function processInput(input) {
    // then a miracle occurs
    return { left, right, top, bottom };
  }

  // the caller selects only the data they need
  const { left, top } = processInput(input);
  ```

**[⬆ back to top](#table-of-contents)**

## Strings

<a name="strings--quotes"></a>

- [6.1](#strings--quotes) Use single quotes `''` for strings. eslint: [`quotes`](https://eslint.org/docs/rules/quotes.html)

  ```javascript
  // bad - template literals should contain interpolation or newlines
  const name = `Capt. Janeway`;

  // good
  const name = 'Capt. Janeway';
  ```

<a name="strings--line-length"></a>

- [6.2](#strings--line-length) Strings that cause the line to go over 100 characters should not be written across multiple lines using string concatenation.

  > Why? Broken strings are painful to work with and make code less searchable.

  ```javascript
  // bad
  const errorMessage =
    'This is a super long error that was thrown because \
  of Batman. When you stop to think about how Batman had anything to do \
  with this, you would get nowhere \
  fast.';

  // bad
  const errorMessage =
    'This is a super long error that was thrown because ' +
    'of Batman. When you stop to think about how Batman had anything to do ' +
    'with this, you would get nowhere fast.';

  // good
  const errorMessage =
    'This is a super long error that was thrown because of Batman. When you stop to think about how Batman had anything to do with this, you would get nowhere fast.';
  ```

<a name="strings--template-literals"></a>

- [6.3](#strings--template-literals) When programmatically building up strings, use template strings instead of concatenation. eslint: [`prefer-template`](https://eslint.org/docs/rules/prefer-template.html)

  > Why? Template strings give you a readable, concise syntax with proper newlines and string interpolation features.

  ```javascript
  // bad
  function sayHi(name) {
    return 'How are you, ' + name + '?';
  }

  // bad
  function sayHi(name) {
    return ['How are you, ', name, '?'].join();
  }

  // good
  function sayHi(name) {
    return `How are you, ${name}?`;
  }
  ```

<a name="strings--no-eval"></a>

- [6.4](#strings--no-eval) Never use `eval()` on a string, it opens too many vulnerabilities. eslint: [`no-eval`](https://eslint.org/docs/rules/no-eval)

**[⬆ back to top](#table-of-contents)**

## Functions

<a name="functions--declaration"></a>

- [7.1](#functions--declaration) Use function declarations instead of function expressions. eslint: [`func-style`](https://eslint.org/docs/rules/func-style)

  ```javascript
  // bad
  const foo = function () {
    // ...
  };

  // good
  function foo() {
    // ...
  }
  ```

<a name="functions--if-blocks"></a>

- [7.2](#functions--if-blocks) Never declare a function in a non-function block (`if`, `while`, etc). Assign the function to a variable instead. Browsers will allow you to do it, but they all interpret it differently, which is no good. eslint: [`no-loop-func`](https://eslint.org/docs/rules/no-loop-func.html)

<a name="functions--arguments-shadow"></a>

- [7.3](#functions--arguments-shadow) Never name a parameter `arguments`. This will take precedence over the `arguments` object that is given to every function scope.

  ```javascript
  // bad
  function foo(name, options, arguments) {
    // ...
  }

  // good
  function foo(name, options, args) {
    // ...
  }
  ```

<a name="functions--rest-params"></a>

- [7.4](#functions--rest-params) Never use `arguments`, opt to use rest syntax `...` instead. eslint: [`prefer-rest-params`](https://eslint.org/docs/rules/prefer-rest-params)

  > Why? `...` is explicit about which arguments you want pulled. Plus, rest arguments are a real Array, and not merely Array-like like `arguments`.

  ```javascript
  // bad
  function concatenateAll() {
    const args = Array.prototype.slice.call(arguments);
    return args.join('');
  }

  // good
  function concatenateAll(...args) {
    return args.join('');
  }
  ```

<a name="functions--default-param"></a>

- [7.5](#functions--default-param) Use default parameter syntax rather than mutating function arguments.

  ```javascript
  // really bad
  function handleThings(opts) {
    // No! We shouldn't mutate function arguments.
    // Double bad: if opts is falsy it'll be set to an object which may
    // be what you want but it can introduce subtle bugs.
    opts = opts || {};
    // ...
  }

  // still bad
  function handleThings(opts) {
    if (opts === undefined) {
      opts = {};
    }
    // ...
  }

  // good
  function handleThings(opts = {}) {
    // ...
  }
  ```

<a name="functions--default-side-effects"></a>

- [7.6](#functions--default-side-effects) Avoid side effects with default parameters.

  > Why? They are confusing to reason about.

  ```javascript
  var b = 1;
  // bad
  function count(a = b++) {
    console.log(a);
  }
  count(); // 1
  count(); // 2
  count(3); // 3
  count(); // 3
  ```

<a name="functions--defaults-last"></a>

- [7.7](#functions--defaults-last) Always put default parameters last.

  ```javascript
  // bad
  function handleThings(opts = {}, name) {
    // ...
  }

  // good
  function handleThings(name, opts = {}) {
    // ...
  }
  ```

<a name="functions--constructor"></a>

- [7.8](#functions--constructor) Never use the Function constructor to create a new function. eslint: [`no-new-func`](https://eslint.org/docs/rules/no-new-func)

  > Why? Creating a function in this way evaluates a string similarly to `eval()`, which opens vulnerabilities.

  ```javascript
  // bad
  var add = new Function('a', 'b', 'return a + b');

  // still bad
  var subtract = Function('a', 'b', 'return a - b');
  ```

<a name="functions--no-param-reassign"></a>

- [7.9](#functions--no-param-reassign) Never mutate or reassign parameters. eslint: [`no-param-reassign`](https://eslint.org/docs/rules/no-param-reassign.html)

  > Why? Manipulating objects passed in as parameters can cause unwanted variable side effects in the original caller.

  ```javascript
  // bad
  function f1(obj) {
    obj.key = 1;
  }

  // bad
  function f2(a) {
    a = 1;
    // ...
  }

  // bad
  function f3(a) {
    if (!a) {
      a = 1;
    }
    // ...
  }

  // good
  function f2(obj) {
    const key = Object.prototype.hasOwnProperty.call(obj, 'key') ? obj.key : 1;
  }

  // good
  function f3(a) {
    const b = a !== undefined ? a : 1;
    // ...
  }

  // best
  function f4(a = 1) {
    // ...
  }
  ```

<a name="functions--prefer-spread"></a>

- [7.10](#functions--prefer-spread) Prefer the use of the spread operator `...` to call variadic functions. eslint: [`prefer-spread`](https://eslint.org/docs/rules/prefer-spread)

  > Why? It's cleaner, you don't need to supply a context, and you can not easily compose `new` with `apply`.

  ```javascript
  // bad
  const x = [1, 2, 3, 4, 5];
  console.log.apply(console, x);

  // good
  const x = [1, 2, 3, 4, 5];
  console.log(...x);

  // bad
  new (Function.prototype.bind.apply(Date, [null, 2016, 8, 5]))();

  // good
  new Date(...[2016, 8, 5]);
  ```

**[⬆ back to top](#table-of-contents)**

## Arrow Functions

<a name="arrows--use-them"></a>

- [8.1](#arrows--use-them) When you must use an anonymous function (as when passing an inline callback), use arrow function notation. eslint: [`prefer-arrow-callback`](https://eslint.org/docs/rules/prefer-arrow-callback.html)

  > Why? It creates a version of the function that executes in the context of `this`, which is usually what you want, and is a more concise syntax.
  > Why not? If you have a fairly complicated function, you might move that logic out into its own named function expression.

  ```javascript
  // bad
  [1, 2, 3].map(function (x) {
    const y = x + 1;
    return x * y;
  });

  // good
  [1, 2, 3].map((x) => {
    const y = x + 1;
    return x * y;
  });

  // better
  [1, 2, 3].map((x) => x * (x + 1));
  ```

<a name="arrows--implicit-return"></a>

- [8.2](#arrows--implicit-return) If the function body consists of a single statement returning an [expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#Expressions) without side effects, omit the braces and use the implicit return. Otherwise, keep the braces and use a `return` statement. eslint: [`arrow-body-style`](https://eslint.org/docs/rules/arrow-body-style.html)

  > Why? Syntactic sugar. It reads well when multiple functions are chained together.

  ```javascript
  // bad
  [1, 2, 3].map((number) => {
    const nextNumber = number + 1;
    `A string containing the ${nextNumber}.`;
  });

  // good
  [1, 2, 3].map((number) => `A string containing the ${number + 1}.`);

  // good
  [1, 2, 3].map((number) => {
    const nextNumber = number + 1;
    return `A string containing the ${nextNumber}.`;
  });

  // good
  [1, 2, 3].map((number, index) => ({
    [index]: number,
  }));

  // No implicit return with side effects
  function foo(callback) {
    const val = callback();
    if (val === true) {
      // Do something if callback returns true
    }
  }

  let bool = false;

  // bad
  foo(() => (bool = true));

  // good
  foo(() => {
    bool = true;
  });
  ```

<a name="arrows--arrow-parens"></a>

- [8.3](#arrows--arrow-parens) Always include parentheses around arguments for clarity and consistency. prettier: [`arrow-parens`](https://prettier.io/docs/en/options.html#arrow-function-parentheses)

  > Why? Minimizes diff churn when adding or removing arguments.

  ```javascript
  // good
  [1, 2, 3].map((x) => x * x);

  // good
  [1, 2, 3].map(
    (number) =>
      `A long string with the ${number}. It's so long that we don't want it to take up space on the .map line!`
  );

  // good
  [1, 2, 3].map((x) => {
    const y = x + 1;
    return x * y;
  });
  ```

**[⬆ back to top](#table-of-contents)**

## Async Functions

<a name="async--no-return-await"></a>

- [9.1](#async--no-return-await) Async functions always return a value wrapped in a promise. There is no need to wait for that promise to resolve before returning it, except where it is required for error handling. eslint: [`no-return-await`](https://eslint.org/docs/rules/no-return-await)

  ```javascript
  // bad
  async function foo() {
    return await bar();
  }

  // good
  async function foo() {
    return bar();
  }

  // good
  async function foo() {
    try {
      return await bar();
    } catch (error) {
      // ...
    }
  }
  ```

<a name="async--require-await"></a>

- [9.2](#async--require-await) Async functions that do not use the `await` keyword do not need to be async functions. eslint: [`require-await`](https://eslint.org/docs/rules/require-await)

  ```javascript
  // bad
  async function foo() {
    doSomething();
    return true;
  }

  // good
  async function foo() {
    await doSomething();
  }

  // good
  function foo() {
    doSomething();
    return Promise.resolve(true);
  }
  ```

## Classes & Constructors

<a name="constructors--use-class"></a>

- [10.1](#constructors--use-class) Always use `class`. Avoid manipulating `prototype` directly.

  > Why? `class` syntax is more concise and easier to reason about.

  ```javascript
  // bad
  function Queue(contents = []) {
    this.queue = [...contents];
  }
  Queue.prototype.pop = function () {
    const value = this.queue[0];
    this.queue.splice(0, 1);
    return value;
  };

  // good
  class Queue {
    constructor(contents = []) {
      this.queue = [...contents];
    }
    pop() {
      const value = this.queue[0];
      this.queue.splice(0, 1);
      return value;
    }
  }
  ```

<a name="constructors--use-extends"></a>

- [10.2](#constructors--use-extends) Use `extends` for inheritance.

  > Why? It is a built-in way to inherit prototype functionality without breaking `instanceof`.

  ```javascript
  // bad
  const inherits = require('inherits');
  function PeekableQueue(contents) {
    Queue.apply(this, contents);
  }
  inherits(PeekableQueue, Queue);
  PeekableQueue.prototype.peek = function () {
    return this.queue[0];
  };

  // good
  class PeekableQueue extends Queue {
    peek() {
      return this.queue[0];
    }
  }
  ```

<a name="constructors--chaining"></a>

- [10.3](#constructors--chaining) Methods can return `this` to help with method chaining.

  ```javascript
  // bad
  Jedi.prototype.jump = function () {
    this.jumping = true;
    return true;
  };

  Jedi.prototype.setHeight = function (height) {
    this.height = height;
  };

  const luke = new Jedi();
  luke.jump(); // => true
  luke.setHeight(20); // => undefined

  // good
  class Jedi {
    jump() {
      this.jumping = true;
      return this;
    }

    setHeight(height) {
      this.height = height;
      return this;
    }
  }

  const luke = new Jedi();

  luke.jump().setHeight(20);
  ```

<a name="constructors--to-string"></a>

- [10.4](#constructors--to-string) It's okay to write a custom `toString()` method, just make sure it works successfully and causes no side effects.

  ```javascript
  class Jedi {
    constructor(options = {}) {
      this.name = options.name || 'no name';
    }

    getName() {
      return this.name;
    }

    toString() {
      return `Jedi - ${this.getName()}`;
    }
  }
  ```

<a name="constructors--no-useless"></a>

- [10.5](#constructors--no-useless) Classes have a default constructor if one is not specified. An empty constructor function or one that just delegates to a parent class is unnecessary. eslint: [`no-useless-constructor`](https://eslint.org/docs/rules/no-useless-constructor)

  ```javascript
  // bad
  class Jedi {
    constructor() {}

    getName() {
      return this.name;
    }
  }

  // bad
  class Rey extends Jedi {
    constructor(...args) {
      super(...args);
    }
  }

  // good
  class Rey extends Jedi {
    constructor(...args) {
      super(...args);
      this.name = 'Rey';
    }
  }
  ```

<a name="classes--no-duplicate-members"></a>

- [10.6](#classes--no-duplicate-members) Avoid duplicate class members. eslint: [`no-dupe-class-members`](https://eslint.org/docs/rules/no-dupe-class-members)

  > Why? Duplicate class member declarations will silently prefer the last one - having duplicates is almost certainly a bug.

  ```javascript
  // bad
  class Foo {
    bar() {
      return 1;
    }
    bar() {
      return 2;
    }
  }

  // good
  class Foo {
    bar() {
      return 1;
    }
  }

  // good
  class Foo {
    bar() {
      return 2;
    }
  }
  ```

<a name="classes--methods-use-this"></a>

- [10.7](#classes--methods-use-this) Class methods should use `this` or be made into a static method unless an external library or framework requires to use specific non-static methods. Being an instance method should indicate that it behaves differently based on properties of the receiver. eslint: [`class-methods-use-this`](https://eslint.org/docs/rules/class-methods-use-this)

  ```javascript
  // bad
  class Foo {
    bar() {
      console.log('bar');
    }
  }

  // good - this is used
  class Foo {
    bar() {
      console.log(this.bar);
    }
  }

  // good - constructor is exempt
  class Foo {
    constructor() {
      // ...
    }
  }

  // good - static methods aren't expected to use this
  class Foo {
    static bar() {
      console.log('bar');
    }
  }
  ```

**[⬆ back to top](#table-of-contents)**

## Modules

<a name="modules--use-them"></a>

- [11.1](#modules--use-them) Always use modules (`import`/`export`) over a non-standard module system. You can always transpile to your preferred module system.

  > Why? Modules are the future, let's start using the future now.

  ```javascript
  // bad
  const AirbnbStyleGuide = require('./AirbnbStyleGuide');
  module.exports = AirbnbStyleGuide.es6;

  // ok
  import AirbnbStyleGuide from './AirbnbStyleGuide';
  export default AirbnbStyleGuide.es6;

  // best
  import { es6 } from './AirbnbStyleGuide';
  export default es6;
  ```

<a name="modules--no-wildcard"></a>

- [11.2](#modules--no-wildcard) Do not use wildcard imports.

  > Why? This makes sure you have a single default export.

  ```javascript
  // bad
  import * as AirbnbStyleGuide from './AirbnbStyleGuide';

  // good
  import AirbnbStyleGuide from './AirbnbStyleGuide';
  ```

<a name="modules--no-export-from-import"></a>

- [11.3](#modules--no-export-from-import) And do not export directly from an import.

  > Why? Although the one-liner is concise, having one clear way to import and one clear way to export makes things consistent.

  ```javascript
  // bad
  // filename es6.js
  export { es6 as default } from './AirbnbStyleGuide';

  // good
  // filename es6.js
  import { es6 } from './AirbnbStyleGuide';
  export default es6;
  ```

<a name="modules--no-duplicate-imports"></a>

- [11.4](#modules--no-duplicate-imports) Only import from a path in one place.
  eslint: [`no-duplicate-imports`](https://eslint.org/docs/rules/no-duplicate-imports)

  > Why? Having multiple lines that import from the same path can make code harder to maintain.

  ```javascript
  // bad
  import foo from 'foo';
  // … some other imports … //
  import { named1, named2 } from 'foo';

  // good
  import foo, { named1, named2 } from 'foo';

  // good
  import foo, { named1, named2 } from 'foo';
  ```

<a name="modules--no-mutable-exports"></a>

- [11.5](#modules--no-mutable-exports) Do not export mutable bindings.
  eslint: [`import/no-mutable-exports`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-mutable-exports.md)

  > Why? Mutation should be avoided in general, but in particular when exporting mutable bindings. While this technique may be needed for some special cases, in general, only constant references should be exported.

  ```javascript
  // bad
  let foo = 3;
  export { foo };

  // good
  const foo = 3;
  export { foo };
  ```

<a name="modules--prefer-default-export"></a>

- [11.6](#modules--prefer-default-export) In modules with a single export, prefer default export over named export.
  eslint: [`import/prefer-default-export`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/prefer-default-export.md)

  > Why? To encourage more files that only ever export one thing, which is better for readability and maintainability.

  ```javascript
  // bad
  export function foo() {}

  // good
  export default function foo() {}
  ```

<a name="modules--imports-first"></a>

- [11.7](#modules--imports-first) Put all `import`s above non-import statements.
  eslint: [`import/first`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/first.md)

  > Why? Since `import`s are hoisted, keeping them all at the top prevents surprising behaviour.

  ```javascript
  // bad
  import foo from 'foo';
  foo.init();

  import bar from 'bar';

  // good
  import foo from 'foo';
  import bar from 'bar';

  foo.init();
  ```

<a name="modules--multiline-imports-over-newlines"></a>

- [11.8](#modules--multiline-imports-over-newlines) Multiline imports should be indented just like multiline array and object literals.
  eslint: [`object-curly-newline`](https://eslint.org/docs/rules/object-curly-newline)

  > Why? The curly braces follow the same indentation rules as every other curly brace block in the style guide, as do the trailing commas.

  ```javascript
  // good
  import {
    longNameA,
    longNameB,
    longNameC,
    longNameD,
    longNameE,
    longNameF,
    longNameG,
  } from 'path';
  ```

<a name="modules--import-extensions"></a>

- [11.9](#modules--import-extensions) Do not include JavaScript filename extensions
  eslint: [`import/extensions`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/extensions.md)

  > Why? Including extensions inhibits refactoring, and inappropriately hardcodes implementation details of the module you're importing in every consumer.

  ```javascript
  // bad
  import foo from './foo.js';
  import bar from './bar.jsx';
  import baz from './baz/index.jsx';

  // good
  import foo from './foo';
  import bar from './bar';
  import baz from './baz';
  ```

**[⬆ back to top](#table-of-contents)**

## Iterators and Generators

<a name="iterators--avoid"></a>

- [12.1](#iterators--avoid) Don't use iterators. Prefer JavaScript's higher-order functions instead of loops like `for-in` or `for-of`, with the exception of `reduce`.

  > Why? This enforces our immutable rule. Dealing with pure functions that return values is easier to reason about than side effects.
  > Use `map` / `every` / `filter` / `find` / `findIndex` / `some` / ... to iterate over arrays, and `Object.keys` / `Object.values` / `Object.entries` to produce arrays so you can iterate over objects.

  ```javascript
  const numbers = [1, 2, 3, 4, 5];

  // bad
  const evenNumbers = {};
  for (const num of numbers) if (num % 2 === 0) evenNumbers.push(num);

  // good
  const evenNumbers = numbers.filter((num) => num % 2 === 0);

  // bad
  const increasedByOne = [];
  for (let i = 0; i < numbers.length; i++) increasedByOne.push(numbers[i] + 1);

  // good
  const increasedByOne = numbers.map((num) => num + 1);
  ```

<a name="generators--require-yield"></a>

- [12.2](#generators--require-yield) Generators that do not use the `yield` keyword do not need to be generators. eslint: [`require-yield`](https://eslint.org/docs/rules/require-yield)

  ```javascript
  // bad
  function* foo() {
    return 10;
  }

  // good
  function* foo() {
    yield 5;
    return 10;
  }

  // good
  function foo() {
    return 10;
  }
  ```

**[⬆ back to top](#table-of-contents)**

## Properties

<a name="properties--dot"></a>

- [13.1](#properties--dot) Use dot notation when accessing properties. eslint: [`dot-notation`](https://eslint.org/docs/rules/dot-notation.html)

  ```javascript
  const luke = {
    jedi: true,
    age: 28,
  };

  // bad
  const isJedi = luke['jedi'];

  // good
  const isJedi = luke.jedi;
  ```

<a name="properties--bracket"></a>

- [13.2](#properties--bracket) Use bracket notation `[]` when accessing properties with a variable.

  ```javascript
  const luke = {
    jedi: true,
    age: 28,
  };

  function getProp(prop) {
    return luke[prop];
  }

  const isJedi = getProp('jedi');
  ```

**[⬆ back to top](#table-of-contents)**

## Variables

<a name="variables--const"></a>

- [14.1](#variables--const) Always use `const` or `let` to declare variables. Not doing so will result in global variables. We want to avoid polluting the global namespace. Captain Planet warned us of that. eslint: [`no-undef`](https://eslint.org/docs/rules/no-undef) [`prefer-const`](https://eslint.org/docs/rules/prefer-const)

  ```javascript
  // bad
  superPower = new SuperPower();

  // bad
  var superPower = new SuperPower();

  // good
  const superPower = new SuperPower();
  ```

<a name="variables--one-var"></a>

- [14.2](#variables--one-var) Use one `const` or `let` declaration per variable or assignment. eslint: [`one-var`](https://eslint.org/docs/rules/one-var.html)

  > Why? It's easier to add new variable declarations this way, and you never have to worry about swapping out a `;` for a `,` or introducing punctuation-only diffs. You can also step through each declaration with the debugger, instead of jumping through all of them at once.

  ```javascript
  // bad
  const items = getItems(),
    goSportsTeam = true,
    dragonball = 'z';

  // bad
  // (compare to above, and try to spot the mistake)
  const items = getItems(),
    goSportsTeam = true;
  dragonball = 'z';

  // good
  const items = getItems();
  const goSportsTeam = true;
  const dragonball = 'z';
  ```

<a name="variables--define-where-used"></a>

- [14.3](#variables--define-where-used) Assign variables where you need them, but place them in a reasonable place.

  > Why? `let` and `const` are block scoped and not function scoped.

  ```javascript
  // bad - unnecessary function call
  function checkName(hasName) {
    const name = getName();

    if (hasName === 'test') return false;

    if (name === 'test') {
      this.setName('');
      return false;
    }

    return name;
  }

  // good
  function checkName(hasName) {
    if (hasName === 'test') return false;

    const name = getName();

    if (name === 'test') {
      this.setName('');
      return false;
    }

    return name;
  }
  ```

<a name="variables--no-chain-assignment"></a>

- [14.4](#variables--no-chain-assignment) Don't chain variable assignments. eslint: [`no-multi-assign`](https://eslint.org/docs/rules/no-multi-assign)

  > Why? Chaining variable assignments creates implicit global variables.

  ```javascript
  // bad
  function example() {
    // JavaScript interprets this as
    // let a = ( b = ( c = 1 ) );
    // The let keyword only applies to variable a; variables b and c become
    // global variables.
    let a = (b = c = 1);
  }

  example();

  console.log(a); // throws ReferenceError
  console.log(b); // 1
  console.log(c); // 1

  // good
  function example() {
    let a = 1;
    let b = a;
    let c = a;
  }

  example();

  console.log(a); // throws ReferenceError
  console.log(b); // throws ReferenceError
  console.log(c); // throws ReferenceError

  // the same applies for `const`
  ```

<a name="variables--unary-increment-decrement"></a>

- [14.5](#variables--unary-increment-decrement) Avoid using unary increments and decrements (`++`, `--`). eslint [`no-plusplus`](https://eslint.org/docs/rules/no-plusplus)

  > Why? Per the eslint documentation, unary increment and decrement statements are subject to automatic semicolon insertion and can cause silent errors with incrementing or decrementing values within an application. It is also more expressive to mutate your values with statements like `num += 1` instead of `num++` or `num ++`. Disallowing unary increment and decrement statements also prevents you from pre-incrementing/pre-decrementing values unintentionally which can also cause unexpected behaviour.

  ```javascript
  // bad

  const array = [1, 2, 3];
  let num = 1;
  num++;
  --num;

  // good

  const array = [1, 2, 3];
  let num = 1;
  num += 1;
  num -= 1;
  ```

<a name="variables--exponentiation-operator"></a>

- [14.6](#variabes--exponentiation-operator) Use exponentiation operator `**` when calculating exponentiations. eslint: [`prefer-exponentiation-operator`](https://eslint.org/docs/rules/prefer-exponentiation-operator).

  ```javascript
  // bad
  const binary = Math.pow(2, 10);

  // good
  const binary = 2 ** 10;
  ```

<a name="variables--operator-assignment"></a>

- [14.7](#variables--operator-assignment) Use shortand operators. eslint [`operator-assignment`](https://eslint.org/docs/rules/operator-assignment)

  > Why? Per the eslint documentation, unary increment and decrement statements are subject to automatic semicolon insertion and can cause silent errors with incrementing or decrementing values within an application. It is also more expressive to mutate your values with statements like `num += 1` instead of `num++` or `num ++`. Disallowing unary increment and decrement statements also prevents you from pre-incrementing/pre-decrementing values unintentionally which can also cause unexpected behaviour.

  ```javascript
  // bad
  x = x + y;
  x = x - y;
  x = x * y;
  x = x / y;

  // good
  x += y;
  x -= y;
  x *= y;
  x /= y;
  ```

<a name="variables--no-unused-vars"></a>

- [14.8](#variables--no-unused-vars) Disallow unused variables. eslint: [`no-unused-vars`](https://eslint.org/docs/rules/no-unused-vars)

  > Why? Variables that are declared and not used anywhere in the code are most likely an error due to incomplete refactoring. Such variables take up space in the code and can lead to confusion by readers.

  ```javascript
  // bad

  const some_unused_var = 42;

  // Write-only variables are not considered as used.
  let y = 10;
  y = 5;

  // A read for a modification of itself is not considered as used.
  let z = 0;
  z = z + 1;

  // Unused function arguments.
  function getX(x, y) {
    return x;
  }

  // good

  function getXPlusY(x, y) {
    return x + y;
  }

  const x = 1;
  const y = a + 2;

  alert(getXPlusY(x, y));

  // 'type' is ignored even if unused because it has a rest property sibling.
  // This is a form of extracting an object that omits the specified keys.
  const { type, ...coords } = data;
  // 'coords' is now the 'data' object without its 'type' property.
  ```

**[⬆ back to top](#table-of-contents)**

## Comparison Operators & Equality

<a name="comparison--eqeqeq"></a>

- [15.1](#comparison--eqeqeq) Use `===` and `!==` over `==` and `!=`. eslint: [`eqeqeq`](https://eslint.org/docs/rules/eqeqeq.html)

<a name="comparison--switch-blocks"></a>

- [15.2](#comparison--switch-blocks) Use braces to create blocks in `case` and `default` clauses that contain lexical declarations (e.g. `let`, `const`, `function`, and `class`). eslint: [`no-case-declarations`](https://eslint.org/docs/rules/no-case-declarations.html)

  > Why? Lexical declarations are visible in the entire `switch` block but only get initialised when assigned, which only happens when its `case` is reached. This causes problems when multiple `case` clauses attempt to define the same thing.

  ```javascript
  // bad
  switch (foo) {
    case 1:
      let x = 1;
      break;
    case 2:
      const y = 2;
      break;
    case 3:
      function f() {
        // ...
      }
      break;
    default:
      class C {}
  }

  // good
  switch (foo) {
    case 1: {
      let x = 1;
      break;
    }
    case 2: {
      const y = 2;
      break;
    }
    case 3: {
      function f() {
        // ...
      }
      break;
    }
    case 4:
      bar();
      break;
    default: {
      class C {}
    }
  }
  ```

<a name="comparison--no-nested-ternary"></a>

- [15.3](#comparison--no-nested-ternary) Ternaries should not be nested and generally be single line expressions. eslint: [`no-nested-ternary`](https://eslint.org/docs/rules/no-nested-ternary.html)

  ```javascript
  // bad
  const foo = maybe1 > maybe2 ? 'bar' : value1 > value2 ? 'baz' : null;

  // split into 2 separated ternary expressions
  const maybeNull = value1 > value2 ? 'baz' : null;

  // best
  const foo = maybe1 > maybe2 ? 'bar' : maybeNull;
  ```

<a name="comparison--no-unneeded-ternary"></a>

- [15.4](#comparison--no-unneeded-ternary) Avoid unneeded ternary statements. eslint: [`no-unneeded-ternary`](https://eslint.org/docs/rules/no-unneeded-ternary.html)

  ```javascript
  // bad
  const foo = a ? a : b;
  const bar = c ? true : false;
  const baz = c ? false : true;

  // good
  const foo = a || b;
  const bar = Boolean(c);
  const baz = !c;
  ```

<a name="comparison--no-mixed-operators"></a>

- [15.5](#comparison--no-mixed-operators) When mixing operators, enclose them in parentheses. The only exception is the standard arithmetic operators: `+`, `-`, and `**` since their precedence is broadly understood. We recommend enclosing `/` and `*` in parentheses because their precedence can be ambiguous when they are mixed.
  eslint: [`no-mixed-operators`](https://eslint.org/docs/rules/no-mixed-operators.html)

  > Why? This improves readability and clarifies the developer's intention.

  ```javascript
  // good
  const foo = (a && b < 0) || c > 0 || d + 1 === 0;

  // good
  const bar = a ** b - (5 % d);

  // good
  if (a || (b && c)) {
    return d;
  }

  // good
  const bar = a + (b / c) * d;
  ```

**[⬆ back to top](#table-of-contents)**

## Blocks

<a name="blocks--braces"></a>

- [16.1](#blocks--braces) Avoid using braces for single-line statements, except for assignment.

  ```javascript
  // bad
  if (test) {
    return false;
  }

  let a;
  if (test) a = 1;

  // good
  if (test) return false;

  let a;
  if (test) {
    a = 1;
  }
  ```

<a name="blocks--no-else-return"></a>

- [16.2](#blocks--no-else-return) If an `if` block always executes a `return` statement, the subsequent `else` block is unnecessary. A `return` in an `else if` block following an `if` block that contains a `return` can be separated into multiple `if` blocks. eslint: [`no-else-return`](https://eslint.org/docs/rules/no-else-return)

  ```javascript
  // bad
  function foo() {
    if (x) return x;
    else return y;
  }

  // bad
  function cats() {
    if (x) return x;
    else if (y) return y;
  }

  // bad
  function dogs() {
    if (x) return x;
    else if (y) return y;
  }

  // good
  function foo() {
    if (x) return x;
    return y;
  }

  // good
  function cats() {
    if (x) return x;
    if (y) return y;
  }

  // good
  function dogs(x) {
    if (x)
      if (z) return y;
      else return z;
  }
  ```

<a name="blocks--no-lonely-if"></a>

- [16.3](#blocks--no-lonely-if) If an `if` statement is the only statement in an `else` block, use `else if` instead. eslint: [`no-lonely-if`](https://eslint.org/docs/rules/no-lonely-if)

  ```javascript
  // bad
  if (foo) {
    // ...
  } else {
    if (bar) {
      // ...
    }
  }

  // good
  if (foo) {
    // ...
  } else if (bar) {
    // ...
  }
  ```

**[⬆ back to top](#table-of-contents)**

## Control Statements

<a name="control-statements"></a>

- [17.1](#control-statements) In case your control statement (`if`, `while` etc.) gets too long or exceeds the maximum line length, each (grouped) condition could be put into a new line. The logical operator should begin the line.

  > Why? Requiring operators at the beginning of the line keeps the operators aligned and follows a pattern similar to method chaining. This also improves readability by making it easier to visually follow complex logic.

  ```javascript
  // good
  if (foo === 123 && bar === 'abc') thing1();

  // good
  if (
    (foo === 123 || bar === 'abc') &&
    doesItLookGoodWhenItBecomesThatLong() &&
    isThisReallyHappening()
  )
    thing1();

  // good
  if (foo === 123 && bar === 'abc') thing1();
  ```

<a name="control-statements--value-selection"></a>

- [17.2](#control-statements--value-selection) Don't use selection operators in place of control statements.

  ```javascript
  // bad
  !isRunning && startRunning();

  // good
  if (!isRunning) startRunning();
  ```

<a name="control-statements--no-negated-condition"></a>

- [17.3](#control-statements--no-negated-condition) When writing a conditional with an `else` branch, use the _positive_ case. eslint: [`no-negated-condition`](https://eslint.org/docs/rules/no-negated-condition)

  ```javascript
  // bad
  if (!foo) doSomething();
  else doSomethingElse();

  // bad
  if (a !== b) doSomething();
  else doSomethingElse();

  // bad
  const value = !a ? c : b;

  // good
  if (foo) doSomethingElse();
  else doSomething();

  // good
  if (a === b) doSomethingElse();
  else doSomething();

  // good
  const value = a ? b : c;
  ```

<a name="control-statements--yoda"></a>

- [17.4](#control-statements--yoda) When comparing a literal with a variable, better to write the variable first, more readable it is. eslint: [`yoda`](https://eslint.org/docs/rules/yoda)

  ```javascript
  // bad
  if ('blue' === colour) {
    // ...
  }

  // good
  if (colour === 'blue') {
    // ...
  }
  ```

**[⬆ back to top](#table-of-contents)**

## Comments

<a name="comments--documentation"></a>

- [18.1](#comments--documentation) Use `/** ... */` for documentation comments.

  ```javascript
  // bad
  // Returns a new element based on the passed in tag name
  //
  // @param {string} tag
  // @returns {Element} element
  function make(tag) {
    // ...

    return element;
  }

  // bad
  /*
    Returns a new element based on the passed in tag name
    @param {string} tag
    @returns {Element} element
  */
  function make(tag) {
    // ...

    return element;
  }

  // good
  /**
   * Returns a new element based on the passed in tag name
   * @param {string} tag
   * @returns {Element}
   */
  function make(tag) {
    // ...

    return element;
  }
  ```

<a name="comments--singleline"></a>

- [18.2](#comments--singleline) Use `//` for single line comments. Place single line comments on a newline above the subject of the comment. Put an empty line before the comment unless it's on the first line of a block.

  ```javascript
  // bad
  const active = true; // is current tab

  // good
  // is current tab
  const active = true;

  // bad
  function getType() {
    console.log('fetching type...');
    // set the default type to 'no type'
    const type = this.type || 'no type';

    return type;
  }

  // good
  function getType() {
    console.log('fetching type...');

    // set the default type to 'no type'
    const type = this.type || 'no type';

    return type;
  }

  // also good
  function getType() {
    // set the default type to 'no type'
    const type = this.type || 'no type';

    return type;
  }
  ```

<a name="comments--spaces"></a>

- [18.3](#comments--spaces) Start all comments with a space to make it easier to read. eslint: [`spaced-comment`](https://eslint.org/docs/rules/spaced-comment)

  ```javascript
  // bad
  //is current tab
  const active = true;

  // good
  // is current tab
  const active = true;

  // bad
  /**
   *make() returns a new element
   *based on the passed-in tag name
   */
  function make(tag) {
    // ...

    return element;
  }

  // good
  /**
   * make() returns a new element
   * based on the passed-in tag name
   */
  function make(tag) {
    // ...

    return element;
  }
  ```

<a name="comments--action-items"></a>

- [18.4](#comments--action-items) Prefixing your comments with `FIXME` or `TODO` helps other developers quickly understand if you're pointing out a problem that needs to be revisited, or if you're suggesting a solution to the problem that needs to be implemented. These are different than regular comments because they are actionable. Be sure to include your name, so that the original author is easy to identify. The actions are `FIXME: (John) -- need to figure this out` or `TODO: (Hanako) -- need to implement`.

<a name="comments--fixme"></a>

- [18.5](#comments--fixme) Use `// FIXME: (name)` to annotate problems.

  ```javascript
  class Calculator extends Abacus {
    constructor() {
      super();

      // FIXME: (name) shouldn't use a global here
      total = 0;
    }
  }
  ```

<a name="comments--todo"></a>

- [18.6](#comments--todo) Use `// TODO: (name)` to annotate solutions to problems.

  ```javascript
  class Calculator extends Abacus {
    constructor() {
      super();

      // TODO: (name) total should be configurable by an options param
      this.total = 0;
    }
  }
  ```

<a name="comments--no-console"></a>

- [18.7](#comments--no-console) Do not leave console statements in production code.

  > Why? Console.log is very slow, even if the output is not being observed/recorded.

  ```javascript
  // bad
  console.log(foo);
  console.debug(bar);
  console.error(baz);
  ```

**[⬆ back to top](#table-of-contents)**

## Whitespace

<a name="whitespace--spaces"></a>

- [19.1](#whitespace--spaces) Use soft tabs (space character) set to 2 spaces. prettier: [`tab-width`](https://prettier.io/docs/en/options.html#tab-width), [`tabs`](https://prettier.io/docs/en/options.html#tabs)

  ```javascript
  // bad
  function foo() {
  ∙∙∙∙let name;
  }

  // bad
  function bar() {
  ∙let name;
  }

  // bad
  function bar() {
  → let name;
  }

  // good
  function baz() {
  ∙∙let name;
  }
  ```

<a name="comments--print-width"></a>

- [20.2](#whitespace--print-width) Avoid having lines of code that are longer than 100 characters (including whitespace). prettier: [`print-width`](https://prettier.io/docs/en/options.html#print-width)

  > Why? This ensures readability and maintainability.

  ```javascript
  // good
  const foo =
    jsonData &&
    jsonData.foo &&
    jsonData.foo.bar &&
    jsonData.foo.bar.baz &&
    jsonData.foo.bar.baz.quux &&
    jsonData.foo.bar.baz.quux.xyzzy;

  // good
  rp({ method: 'POST', url: 'https://api.zehitomo.com/', data: { name: 'John' } })
    .then(() => {
      console.log('Congratulations!');
    })
    .catch(() => {
      console.log('You have failed this city.');
    });
  ```

**[⬆ back to top](#table-of-contents)**

## Commas

<a name="comments--trailing"></a>

- [20.1](#commas--trailing) Additional trailing comma: **Yup.** prettier: [`trailing-commas`](https://prettier.io/docs/en/options.html#trailing-commas)

  > Why? This leads to cleaner git diffs. Also, transpilers like Babel will remove the additional trailing comma in the transpiled code which means you don't have to worry about the [trailing comma problem](https://github.com/airbnb/javascript/blob/es5-deprecated/es5/README.md#commas) in legacy browsers.

  ```diff
  // bad - git diff without trailing comma
  const hero = {
       firstName: 'Florence',
  -    lastName: 'Nightingale'
  +    lastName: 'Nightingale',
  +    inventorOf: ['coxcomb chart', 'modern nursing']
  };

  // good - git diff with trailing comma
  const hero = {
       firstName: 'Florence',
       lastName: 'Nightingale',
  +    inventorOf: ['coxcomb chart', 'modern nursing'],
  };
  ```

  ```javascript
  // good
  const hero = {
    firstName: 'Dana',
    lastName: 'Scully',
  };
  ```

**[⬆ back to top](#table-of-contents)**

## Semicolons

<a name="semicolons--required"></a>

- [21.1](#semicolons--required) **Yup.** prettier: [`semi`](https://prettier.io/docs/en/options.html#semicolons)

  > Why? When JavaScript encounters a line break without a semicolon, it uses a set of rules called [Automatic Semicolon Insertion](https://tc39.github.io/ecma262/#sec-automatic-semicolon-insertion) to determine whether or not it should regard that line break as the end of a statement, and (as the name implies) place a semicolon into your code before the line break if it thinks so. ASI contains a few eccentric behaviours, though, and your code will break if JavaScript misinterprets your line break. These rules will become more complicated as new features become a part of JavaScript. Explicitly terminating your statements and configuring your linter to catch missing semicolons will help prevent you from encountering issues.

  ```javascript
  // good
  const luke = {};
  const leia = {};
  [luke, leia].forEach((jedi) => {
    jedi.father = 'vader';
  });

  // good
  const reaction = 'No! That's impossible!';
  (async function meanwhileOnTheFalcon() {
    // handle `leia`, `lando`, `chewie`, `r2`, `c3p0`
    // ...
  })();

  // good
  function foo() {
    return 'search your feelings, you know it to be foo';
  }
  ```

  [Read more](https://stackoverflow.com/questions/7365172/semicolon-before-self-invoking-function/7365214#7365214).

**[⬆ back to top](#table-of-contents)**

## Typecasting & Coercion

<a name="coercion--strings"></a>

- [22.1](#coercion--strings) Strings: eslint: [`no-new-wrappers`](https://eslint.org/docs/rules/no-new-wrappers) [`no-implicit-coercion`](https://eslint.org/docs/rules/no-implicit-coercion)

  ```javascript
  // => this.reviewScore = 9;

  // bad
  const totalScore = new String(this.reviewScore); // typeof totalScore is "object" not "string"

  // bad
  const totalScore = this.reviewScore + ''; // invokes this.reviewScore.valueOf()

  // bad
  const totalScore = this.reviewScore.toString(); // isn't guaranteed to return a string

  // good
  const totalScore = String(this.reviewScore);
  ```

<a name="coercion--numbers"></a>

- [22.2](#coercion--numbers) Numbers: Use `Number` for typecasting, `Number.parseInt` always with a radix for parsing integer strings, and `Number.parseFloat` for parsing floating point strings. eslint: [`radix`](https://eslint.org/docs/rules/radix) [`no-new-wrappers`](https://eslint.org/docs/rules/no-new-wrappers) [`no-restricted-globals`](https://eslint.org/docs/rules/no-restricted-properties) [`no-implicit-coercion`](https://eslint.org/docs/rules/no-implicit-coercion)

  ```javascript
  const inputInt = '4';
  const inputFloat = '4.2';

  // bad
  const val = new Number(inputInt);

  // bad
  const val = +inputInt;

  // bad
  const val = inputInt >> 0;

  // bad
  const val = parseInt(inputInt, 10);

  // bad
  const val = Number.parseInt(inputInt);

  // bad
  const val = parseFloat(inputFloat);

  // good
  const val = Number(inputInt);

  // good
  const val = Number.parseInt(inputInt, 10);

  // good
  const val = Number.parseFloat(inputFloat);
  ```

<a name="coercion--comment-exceptions"></a>

- [22.3](#coercion--comment-exceptions) If for whatever reason you are doing something wild and `Number.parseInt` is your bottleneck and need to use bitwise operators for [performance reasons](https://jsperf.com/coercion-vs-casting/3), leave a comment explaining why and what you're doing.

  ```javascript
  // good
  /**
   * Number.parseInt was the reason my code was slow.
   * Bitshifting the String to coerce it to a
   * Number made it a lot faster.
   */
  const val = inputValue >> 0;
  ```

<a name="coercion--bitwise"></a>

- [22.4](#coercion--bitwise) **Note:** Be careful when using bitwise operations. Numbers are represented as [64-bit values](https://es5.github.io/#x4.3.19), but bitwise operations always return a 32-bit integer ([source](https://es5.github.io/#x11.7)). Bitwise can lead to unexpected behaviour for integer values larger than 32 bits. [Discussion](https://github.com/airbnb/javascript/issues/109). Largest signed 32-bit Int is `2_147_483_647`:

  ```javascript
  2147483647 >> 0; // => 2147483647
  2147483648 >> 0; // => -2147483648
  2147483649 >> 0; // => -2147483647
  ```

<a name="coercion--booleans"></a>

- [22.5](#coercion--booleans) Booleans: eslint: [`no-new-wrappers`](https://eslint.org/docs/rules/no-new-wrappers) [`no-implicit-coercion`](https://eslint.org/docs/rules/no-implicit-coercion)

  ```javascript
  const age = 0;

  // bad
  const hasAge = new Boolean(age);

  // bad
  const hasAge = !!age;

  // good
  const hasAge = Boolean(age);
  ```

**[⬆ back to top](#table-of-contents)**

## Naming Conventions

<a name="naming--descriptive"></a>

- [23.1](#naming--descriptive) Avoid single letter names. Be descriptive with your naming. eslint: [`id-length`](https://eslint.org/docs/rules/id-length)

  ```javascript
  // bad
  function q() {
    // ...
  }

  // bad
  try {
    // ...
  } catch (e) {
    // ...
  }

  // good
  function query() {
    // ...
  }

  // bad
  try {
    // ...
  } catch (error) {
    // ...
  }
  ```

<a name="naming--camelCase"></a>

- [23.2](#naming--camelCase) Use camelCase when naming objects, functions, and instances. eslint: [`camelcase`](https://eslint.org/docs/rules/camelcase.html)

  ```javascript
  // bad
  const OBJEcttsssss = {};
  const this_is_my_object = {};
  function c() {}

  // good
  const thisIsMyObject = {};
  function thisIsMyFunction() {}
  ```

<a name="naming--PascalCase"></a>

- [23.3](#naming--PascalCase) Use PascalCase only when naming constructors or classes. eslint: [`new-cap`](https://eslint.org/docs/rules/new-cap.html)

  ```javascript
  // bad
  function user(options) {
    this.name = options.name;
  }

  const bad = new user({
    name: 'nope',
  });

  // good
  class User {
    constructor(options) {
      this.name = options.name;
    }
  }

  const good = new User({
    name: 'yup',
  });
  ```

<a name="naming--no-underscore-dangle"></a>

- [23.4](#naming--no-underscore-dangle) Do not use trailing or leading underscores, except for `_id`. eslint: [`no-underscore-dangle`](https://eslint.org/docs/rules/no-underscore-dangle.html)

  > Why? JavaScript does not have the concept of privacy in terms of properties or methods. Although a leading underscore is a common convention to mean “private”, in fact, these properties are fully public, and as such, are part of your public API contract. This convention might lead developers to wrongly think that a change won't count as breaking, or that tests aren't needed. tl;dr: if you want something to be “private”, it must not be observably present.

  ```javascript
  // bad
  this.__firstName__ = 'Panda';
  this.firstName_ = 'Panda';
  this._firstName = 'Panda';

  // good
  this.firstName = 'Panda';

  // good, in environments where WeakMaps are available
  // see https://kangax.github.io/compat-table/es6/#test-WeakMap
  const firstNames = new WeakMap();
  firstNames.set(this, 'Panda');
  ```

<a name="naming--self-this"></a>

- [23.5](#naming--self-this) Don't save references to `this`. Use arrow functions or [Function#bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).

  ```javascript
  // bad
  function foo() {
    const self = this;
    return function () {
      console.log(self);
    };
  }

  // bad
  function foo() {
    const that = this;
    return function () {
      console.log(that);
    };
  }

  // good
  function foo() {
    return () => {
      console.log(this);
    };
  }
  ```

<a name="naming--filename-matches-export"></a>

- [23.6](#naming--filename-matches-export) A base filename should exactly match the name of its default export.

  ```javascript
  // file 1 contents
  class CheckBox {
    // ...
  }
  export default CheckBox;

  // file 2 contents
  export default function fortyTwo() {
    return 42;
  }

  // file 3 contents
  export default function insideDirectory() {}

  // in some other file
  // bad
  import CheckBox from './checkBox'; // PascalCase import/export, camelCase filename
  import FortyTwo from './FortyTwo'; // PascalCase import/filename, camelCase export
  import InsideDirectory from './InsideDirectory'; // PascalCase import/filename, camelCase export

  // bad
  import CheckBox from './check_box'; // PascalCase import/export, snake_case filename
  import forty_two from './forty_two'; // snake_case import/filename, camelCase export
  import inside_directory from './inside_directory'; // snake_case import, camelCase export
  import index from './inside_directory/index'; // requiring the index file explicitly
  import insideDirectory from './insideDirectory/index'; // requiring the index file explicitly

  // good
  import CheckBox from './CheckBox'; // PascalCase export/import/filename
  import fortyTwo from './fortyTwo'; // camelCase export/import/filename
  import insideDirectory from './insideDirectory'; // camelCase export/import/directory name/implicit "index"
  // ^ supports both insideDirectory.js and insideDirectory/index.js
  ```

<a name="naming--camelCase-default-export"></a>

- [23.7](#naming--camelCase-default-export) Use camelCase when you export-default a function. Your filename should be identical to your function's name.

  ```javascript
  function makeStyleGuide() {
    // ...
  }

  export default makeStyleGuide;
  ```

<a name="naming--PascalCase-singleton"></a>

- [23.8](#naming--PascalCase-singleton) Use PascalCase when you export a constructor / class / singleton / function library / bare object.

  ```javascript
  const StyleGuide = {
    es6: {},
  };

  export default StyleGuide;
  ```

<a name="naming--uppercase"></a>

- [23.9](#naming--uppercase) You should uppercase a constant if it is declared with a literal.

  > Why? This is an additional tool to assist in situations where the programmer would be unsure if a variable might ever change. UPPERCASE_VARIABLES are letting the programmer know that they can trust the variable (and its properties) not to change.

  - What about all `const` variables? - This is unnecessary, so uppercasing should not be used for constants within a file. It should be used for exported constants however.
  - What about exported objects? - Uppercase at the top level of export (e.g. `EXPORTED_OBJECT.key`) and maintain that all nested properties do not change.

    ```javascript
    // bad
    const THING = getThing();

    // bad
    let REASSIGNABLE_VARIABLE = 'do not use let with uppercase variables';

    // bad
    const apiKey = 'SOMEKEY';

    // bad - unnecessarily uppercases key while adding no semantic value
    const MAPPING = { KEY: 'value' };

    // good
    const API_KEY = 'SOMEKEY';

    // good
    const MAPPING = { key: 'value' };
    ```

<a name="naming--no-magic-numbers"></a>

- [23.10](#naming--no-magic-numbers) Don't use magic numbers. Give magic numbers a meaningful name. eslint: [`no-magic-numbers`](https://eslint.org/docs/rules/no-magic-numbers)

  ```javascript
  // bad
  const price = 100 + 100 * 0.1;

  // bad
  const devs = ['alex', 'brian', 'charles'];
  const dev = devs[2];

  // good
  const NET_PRICE = 100;
  const TAX_RATE = 0.1;
  const price = NET_PRICE + NET_PRICE * TAX_RATE;

  // good
  const devs = ['alex', 'brian', 'charles'];
  const dev = devs[dev.length - 1];
  ```

<a name="naming--external-dependency-import"></a>

- [23.11](#naming--external-dependency-import) When importing an external dependency, use the naming convention of that dependency to name the import.

  ```javascript
  // bad
  const httpStatus = require('http-status'); // https://www.npmjs.com/package/http-status
  const request = require('request-promise-native'); // https://www.npmjs.com/package/request-promise-native

  // good
  const status = require('http-status');
  const rp = require('request-promise-native');
  ```

**[⬆ back to top](#table-of-contents)**

## Accessors

<a name="accessors--not-required"></a>

- [24.1](#accessors--not-required) Accessor functions for properties are not required.

<a name="accessors--consistent"></a>

- [24.2](#accessors--consistent) It's okay to create `get()` and `set()` functions, but be consistent.

  ```javascript
  class Jedi {
    constructor(options = {}) {
      const lightsaber = options.lightsaber || 'blue';
      this.set('lightsaber', lightsaber);
    }

    set(key, val) {
      this[key] = val;
    }

    get(key) {
      return this[key];
    }
  }
  ```

**[⬆ back to top](#table-of-contents)**

## Lodash

- [25.1](#lodash--prefer-native) Do not use lodash methods where native JavaScript methods are available. eslint: [`no-restricted-properties`](https://eslint.org/docs/rules/no-restricted-properties)

  > Why? Native JavaScript methods are heavily optimised and lead to better performance. Also, the less we depend on external code, the better.

  ```javascript
  // bad
  const doubles = _.map([1, 2, 3], (n) => n * 2);
  const evens = _.filter([1, 2, 3], (n) => n % 2 === 0);
  const values = _.values({ a: 1, b: 2, c: 3 });

  // good
  const doubles = [1, 2, 3].map((n) => n * 2);
  const evens = [1, 2, 3].filter((n) => n % 2 === 0);
  const values = Object.values({ a: 1, b: 2, c: 3 });
  ```

- [25.2](#lodash--prefer-chain) Use `_.chain` for chaining lodash methods, not the root `_` function.

  > Why? `chain` communicates the meaning more clearly.

  ```javascript
  const users = [
    { _id: 1, name: 'a' },
    { _id: 2, name: 'b' },
    { _id: 3, name: 'c' },
  ];

  // bad
  _(users).keyBy('_id').mapValues('name').value(); // => { 1: "a", 2: "b", 3: "c" }

  // good
  _.chain(users).keyBy('_id').mapValues('name').value(); // -> { 1: "a", 2: "b", 3: "c" }
  ```

- [25.3](#lodash--get) When using `_.get` or `_.has`, for the `path` argument only include properties that are not known to be defined. Use nullish coalescing where supported instead of `_.get`.

  > Why? Using `_.get` or `?.` indiscriminately will suppress errors where a value that we expect to be defined is not.

  ```javascript
  /** @type {{ profile: { notifications?: { newMessage?: boolean; } } }} */
  const user = await getUser();

  // worse
  const newMessage =
    user && user.profile && user.profile.notifications && user.profile.notifications.newMessage;

  // bad
  const newMessage = _.get(user, 'profile.notifications.newMessage');
  const newMessage = user?.profile?.notifications?.newMessage;

  // good
  const newMessage = _.get(user.profile.notifications, 'newMessage');

  // better (where supported)
  const newMessage = user.profile.notifications?.newMessage;
  ```

## Standard Library

The [Standard Library](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects)
contains utilities that are functionally broken but remain for legacy reasons.

<a name="standard-library--is-nan"></a>

- [26.1](#standard-library--no-is-nan) Use `Number.isNaN` instead of global `isNaN`.
  eslint: [`no-restricted-globals`](https://eslint.org/docs/rules/no-restricted-globals)

  > Why? The global `isNaN` coerces non-numbers to numbers, returning true for anything that coerces to NaN.
  > If this behaviour is desired, make it explicit.

  ```javascript
  // bad
  isNaN('1.2'); // => false
  isNaN('1.2.3'); // => true

  // good
  Number.isNaN('1.2.3'); // => false
  Number.isNaN(Number('1.2.3')); // => true
  ```

<a name="standard-library--is-finite"></a>

- [26.2](#standard-library--no-isfinite) Use `Number.isFinite` instead of global `isFinite`.
  eslint: [`no-restricted-globals`](https://eslint.org/docs/rules/no-restricted-globals)

  > Why? The global `isFinite` coerces non-numbers to numbers, returning true for anything that coerces to a finite number.
  > If this behaviour is desired, make it explicit.

  ```javascript
  // bad
  isFinite('2e3'); // => true

  // good
  Number.isFinite('2e3'); // => false
  Number.isFinite(parseInt('2e3', 10)); // => true
  ```

**[⬆ back to top](#table-of-contents)**

## Testing

<a name="testing"></a>

- [27.1](#testing)

  - Whichever testing framework you use, you should be writing tests!
  - Strive to write many small pure functions, and minimize where mutations occur.
  - 100% test coverage is a good goal to strive for, even if it's not always practical to reach it.
  - Whenever you fix a bug, _write a regression test_. A bug fixed without a regression test is almost certainly going to break again in the future.

- [27.2](#testing--whitespace) When writing a test, denote the setup, execution, and validation phases with whitespace. There should only be two empty lines in a typical test.

  ```javascript
  afterEach(() => User.remove({}));

  it("should return the user's favourite food", async () => {
    await User.insertOne({ _id: 'user-1', favouriteFood: 'pizza' }); // set up

    const actual = await getFavouriteFood('user-1'); // execute

    expect(actual).to.equal('pizza'); // validate
  });
  ```

**[⬆ back to top](#table-of-contents)**

## Performance

- [On Layout & Web Performance](https://www.kellegous.com/j/2013/01/26/layout-performance/)
- [String vs Array Concat](https://jsperf.com/string-vs-array-concat/2)
- [Try/Catch Cost In a Loop](https://jsperf.com/try-catch-in-loop-cost/12)
- [Bang Function](https://jsperf.com/bang-function)
- [jQuery Find vs Context, Selector](https://jsperf.com/jquery-find-vs-context-sel/164)
- [innerHTML vs textContent for script text](https://jsperf.com/innerhtml-vs-textcontent-for-script-text)
- [Long String Concatenation](https://jsperf.com/ya-string-concat/38)
- [Are JavaScript functions like `map()`, `reduce()`, and `filter()` optimized for traversing arrays?](https://www.quora.com/JavaScript-programming-language-Are-Javascript-functions-like-map-reduce-and-filter-already-optimized-for-traversing-array/answer/Quildreen-Motta)

**[⬆ back to top](#table-of-contents)**

## Resources

### Learning ES6+

- [Latest ECMA spec](https://tc39.github.io/ecma262/)
- [ExploringJS](http://exploringjs.com/)
- [ES6 Compatibility Table](https://kangax.github.io/compat-table/es6/)
- [Comprehensive Overview of ES6 Features](http://es6-features.org/)

### Read This

- [Standard ECMA-262](http://www.ecma-international.org/ecma-262/6.0/index.html)

### Other Style Guides

- [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html)
- [Google JavaScript Style Guide (Old)](https://google.github.io/styleguide/javascriptguide.xml)
- [jQuery Core Style Guidelines](https://contribute.jquery.org/style-guide/js/)
- [Principles of Writing Consistent, Idiomatic JavaScript](https://github.com/rwaldron/idiomatic.js)
- [StandardJS](https://standardjs.com)

### Other Styles

- [Naming this in nested functions](https://gist.github.com/cjohansen/4135065) - Christian Johansen
- [Conditional Callbacks](https://github.com/airbnb/javascript/issues/52) - Ross Allen
- [Popular JavaScript Coding Conventions on GitHub](http://sideeffect.kr/popularconvention/#javascript) - JeongHoon Byun
- [Multiple var statements in JavaScript, not superfluous](http://benalman.com/news/2012/05/multiple-var-statements-javascript/) - Ben Alman

### Further Reading

- [Understanding JavaScript Closures](https://javascriptweblog.wordpress.com/2010/10/25/understanding-javascript-closures/) - Angus Croll
- [Basic JavaScript for the impatient programmer](http://www.2ality.com/2013/06/basic-javascript.html) - Dr. Axel Rauschmayer
- [You Might Not Need jQuery](http://youmightnotneedjquery.com/) - Zack Bloom & Adam Schwartz
- [ES6 Features](https://github.com/lukehoban/es6features) - Luke Hoban
- [Frontend Guidelines](https://github.com/bendc/frontend-guidelines) - Benjamin De Cock

### Books

- [JavaScript: The Good Parts](https://www.amazon.com/JavaScript-Good-Parts-Douglas-Crockford/dp/0596517742) - Douglas Crockford
- [JavaScript Patterns](https://www.amazon.com/JavaScript-Patterns-Stoyan-Stefanov/dp/0596806752) - Stoyan Stefanov
- [Pro JavaScript Design Patterns](https://www.amazon.com/JavaScript-Design-Patterns-Recipes-Problem-Solution/dp/159059908X) - Ross Harmes and Dustin Diaz
- [High Performance Web Sites: Essential Knowledge for Front-End Engineers](https://www.amazon.com/High-Performance-Web-Sites-Essential/dp/0596529309) - Steve Souders
- [Maintainable JavaScript](https://www.amazon.com/Maintainable-JavaScript-Nicholas-C-Zakas/dp/1449327680) - Nicholas C. Zakas
- [JavaScript Web Applications](https://www.amazon.com/JavaScript-Web-Applications-Alex-MacCaw/dp/144930351X) - Alex MacCaw
- [Pro JavaScript Techniques](https://www.amazon.com/Pro-JavaScript-Techniques-John-Resig/dp/1590597273) - John Resig
- [Smashing Node.js: JavaScript Everywhere](https://www.amazon.com/Smashing-Node-js-JavaScript-Everywhere-Magazine/dp/1119962595) - Guillermo Rauch
- [Secrets of the JavaScript Ninja](https://www.amazon.com/Secrets-JavaScript-Ninja-John-Resig/dp/193398869X) - John Resig and Bear Bibeault
- [Human JavaScript](http://humanjavascript.com/) - Henrik Joreteg
- [Superhero.js](http://superherojs.com/) - Kim Joar Bekkelund, Mads Mobæk, & Olav Bjorkoy
- [JSBooks](http://jsbooks.revolunet.com/) - Julien Bouquillon
- [Third Party JavaScript](https://www.manning.com/books/third-party-javascript) - Ben Vinegar and Anton Kovalyov
- [Effective JavaScript: 68 Specific Ways to Harness the Power of JavaScript](http://amzn.com/0321812182) - David Herman
- [Eloquent JavaScript](http://eloquentjavascript.net/) - Marijn Haverbeke
- [You Don't Know JS: ES6 & Beyond](http://shop.oreilly.com/product/0636920033769.do) - Kyle Simpson

### Blogs

- [JavaScript Weekly](http://javascriptweekly.com/)
- [JavaScript, JavaScript...](https://javascriptweblog.wordpress.com/)
- [Bocoup Weblog](https://bocoup.com/weblog)
- [Adequately Good](http://www.adequatelygood.com/)
- [NCZOnline](https://www.nczonline.net/)
- [Perfection Kills](http://perfectionkills.com/)
- [Ben Alman](http://benalman.com/)
- [Dmitry Baranovskiy](http://dmitry.baranovskiy.com/)
- [nettuts](http://code.tutsplus.com/?s=javascript)

### Podcasts

- [JavaScript Air](https://javascriptair.com/)
- [JavaScript Jabber](https://devchat.tv/js-jabber/)

**[⬆ back to top](#table-of-contents)**
