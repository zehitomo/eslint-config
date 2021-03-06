# Zehitomo React/JSX Style Guide

> A human-first approach to React and JSX

## Table of Contents

1. [Basic Rules](#basic-rules)
1. [Class vs `React.createClass` vs stateless](#class-vs-reactcreateclass-vs-stateless)
1. [Mixins](#mixins)
1. [Naming](#naming)
1. [Declaration](#declaration)
1. [Props](#props)
1. [Refs](#refs)
1. [Methods](#methods)
1. [Ordering](#ordering)

## Basic Rules

- Only include one React component per file.
- Use TSX whenever possible.
- Always use JSX syntax.
- Do not use `React.createElement` unless you’re initializing the app from a file that is not JSX.

## Class vs `React.createClass` vs stateless

- If you have internal state and/or refs, prefer `class extends React.Component` over `React.createClass`. eslint: [`react/prefer-es6-class`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-es6-class.md) [`react/prefer-stateless-function`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-stateless-function.md)

  ```tsx
  // bad
  const Listing = React.createClass({
    // ...
    render() {
      return <div>{this.state.hello}</div>;
    },
  });

  // good
  class Listing extends React.Component {
    // ...
    render() {
      return <div>{this.state.hello}</div>;
    }
  }
  ```

  And if you don’t have state or refs, prefer arrow functions over classes:

  ```tsx
  // bad
  class Listing extends React.Component {
    render() {
      const { hello } = this.props;

      return <div>{hello}</div>;
    }
  }

  // good
  const Listing = ({ hello }) => <div>{hello}</div>;
  ```

## Mixins

- [Do not use mixins](https://facebook.github.io/react/blog/2016/07/13/mixins-considered-harmful.html).

  > Why? Mixins introduce implicit dependencies, cause name clashes, and cause snowballing complexity. Most use cases for mixins can be accomplished in better ways via components, higher-order components, or utility modules.

## Naming

- **Extensions**: Use `.tsx` or `.jsx` extension for React components. eslint: [`react/jsx-filename-extension`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md)
- **Filename**: Use PascalCase for filenames. E.g., `ReservationCard.tsx`.
- **Reference Naming**: Use PascalCase for React components and camelCase for their instances. eslint: [`react/jsx-pascal-case`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-pascal-case.md)

  ```tsx
  // bad
  import reservationCard from './ReservationCard';

  // good
  import ReservationCard from './ReservationCard';

  // bad
  const ReservationItem = <ReservationCard />;

  // good
  const reservationItem = <ReservationCard />;
  ```

- **Component Naming**: Use the filename as the component name. For example, `ReservationCard.tsx` should have a reference name of `ReservationCard`. However, for root components of a directory, use `index.tsx` as the filename and use the directory name as the component name:

  ```tsx
  // bad
  import Footer from './Footer/Footer';

  // bad
  import Footer from './Footer/index';

  // good
  import Footer from './Footer';
  ```

- **Higher-order Component Naming**: Use a composite of the higher-order component’s name and the passed-in component’s name as the `displayName` on the generated component. For example, the higher-order component `withFoo()`, when passed a component `Bar` should produce a component with a `displayName` of `withFoo(Bar)`.

  > Why? A component’s `displayName` may be used by developer tools or in error messages, and having a value that clearly expresses this relationship helps people understand what is happening.

  ```tsx
  // bad
  export default function withFoo(WrappedComponent) {
    return function WithFoo(props) {
      return <WrappedComponent {...props} foo />;
    };
  }

  // good
  export default function withFoo(WrappedComponent) {
    function WithFoo(props) {
      return <WrappedComponent {...props} foo />;
    }

    const wrappedComponentName =
      WrappedComponent.displayName || WrappedComponent.name || 'Component';

    WithFoo.displayName = `withFoo(${wrappedComponentName})`;
    return WithFoo;
  }
  ```

- **Props Naming**: Avoid using DOM component prop names for different purposes.

  > Why? People expect props like `style` and `className` to mean one specific thing. Varying this API for a subset of your app makes the code less readable and less maintainable, and may cause bugs.

  ```tsx
  // bad
  <MyComponent style="fancy" />

  // bad
  <MyComponent className="fancy" />

  // good
  <MyComponent variant="fancy" />
  ```

## Declaration

- Do not use `displayName` for naming components. Instead, name the component by reference.

  ```tsx
  // bad
  export default React.createClass({
    displayName: 'ReservationCard',
    // stuff goes here
  });

  // good
  export default class ReservationCard extends React.Component {}
  ```

## Props

- Always use camelCase for prop names, or PascalCase if the prop value is a React component.

  ```tsx
  // bad
  <Foo
    UserName="hello"
    phone_number={12345678}
  />

  // good
  <Foo
    userName="hello"
    phoneNumber={12345678}
    Component={SomeComponent}
  />
  ```

- Use object destructuring when accessing and using state or props. eslint: [`react/destructuring-assignment`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/destructuring-assignment.md)

  > Why? Destructuring saves you from repetitive access of an object. Repeating object access creates more repetitive code, requires more reading, and creates more opportunities for mistakes. Destructuring also provides a single site of definition of the object structure that is used in the block, rather than requiring reading the entire block to determine what is used.

  ```tsx
  // bad
  const MyComponent = (props) => {
    return <div id={props.id} />;
  };

  // bad
  class Foo extends Component {
    render() {
      return <div>{this.context.foo}</div>;
    }
  }

  // good
  const MyComponent = ({ id }) => <div id={id} />;

  // good
  const MyComponent = (props, context) => {
    const { id } = props;

    return <div id={id} />;
  };

  // good
  class Foo extends Component {
    render() {
      const { id } = this.props;
      const { title } = this.context;

      return <div id={id}>{title}</div>;
    }
  }
  ```

- Show the value of the prop when it is explicitly `true`. eslint: [`react/jsx-boolean-value`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-boolean-value.md)

  > Why? It's clearer to explicitly write the value of the prop than to remember that passing no value results in `true` being passed.

  ```tsx

  // bad
  <Foo hidden />

  // good
  <Foo hidden={true} />
  ```

- Always include an `alt` prop on `<img>` tags. If the image is presentational, `alt` can be an empty string or the `<img>` must have `role="presentation"`. eslint: [`jsx-a11y/alt-text`](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/alt-text.md)

  ```tsx
  // bad
  <img src="hello.jpg" />

  // good
  <img src="hello.jpg" alt="Me waving hello" />

  // good
  <img src="hello.jpg" alt="" />

  // good
  <img src="hello.jpg" role="presentation" />
  ```

- Do not use words like "image", "photo", or "picture" in `<img>` `alt` props. eslint: [`jsx-a11y/img-redundant-alt`](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/img-redundant-alt.md)

  > Why? Screenreaders already announce `img` elements as images, so there is no need to include this information in the alt text.

  ```tsx
  // bad
  <img src="hello.jpg" alt="Picture of me waving hello" />

  // good
  <img src="hello.jpg" alt="Me waving hello" />
  ```

- Use only valid, non-abstract [ARIA roles](https://www.w3.org/TR/wai-aria/#usage_intro). eslint: [`jsx-a11y/aria-role`](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/aria-role.md)

  ```tsx
  // bad - not an ARIA role
  <div role="datepicker" />

  // bad - abstract ARIA role
  <div role="range" />

  // good
  <div role="button" />
  ```

- Do not use `accessKey` on elements. eslint: [`jsx-a11y/no-access-key`](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-access-key.md)

  > Why? Inconsistencies between keyboard shortcuts and keyboard commands used by people using screenreaders and keyboards complicate accessibility.

  ```tsx
  // bad
  <div accessKey="h" />

  // good
  <div />
  ```

- Avoid using an array index as `key` prop, prefer a stable ID. eslint: [`react/no-array-index-key`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-array-index-key.md)

  > Why? Not using a stable ID [is an anti-pattern](https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318) because it can negatively impact performance and cause issues with component state. We don’t recommend using indexes for keys if the order of items may change.

  ```tsx
  // bad
  {
    todos.map((todo, index) => <Todo {...todo} key={index} />);
  }

  // good
  {
    todos.map((todo) => <Todo {...todo} key={todo.id} />);
  }
  ```

- Always define explicit defaultProps for all non-required props.

  > Why? propTypes are a form of documentation, and providing defaultProps means the reader of your code doesn’t have to assume as much. In addition, it can mean that your code can omit certain type checks.

  ```jsx
  // bad
  const SFC = ({ foo, bar, children }) => (
    <div>
      {foo}
      {bar}
      {children}
    </div>
  );

  SFC.propTypes = {
    foo: PropTypes.number.isRequired,
    bar: PropTypes.string,
    children: PropTypes.node,
  };

  // good
  const SFC = ({ foo, bar, children }) => (
    <div>
      {foo}
      {bar}
      {children}
    </div>
  );

  SFC.propTypes = {
    foo: PropTypes.number.isRequired,
    bar: PropTypes.string,
    children: PropTypes.node,
  };
  SFC.defaultProps = { bar: '', children: null };
  ```

  ```tsx
  interface Props {
    foo: number;
    bar?: string;
    children?: ReactNode;
  }

  // bad
  const SFC: React.FC<Props> = ({ foo, bar, children }) => (
    <div>
      {foo}
      {bar}
      {children}
    </div>
  );

  // good
  const SFC: React.FC<Props> = ({ foo, bar = '', children = null }) => (
    <div>
      {foo}
      {bar}
      {children}
    </div>
  );
  SFC.defaultProps = { bar: '', children: null };
  ```

- Use spread props sparingly.

  > Why? Otherwise you’re more likely to pass unnecessary props down to components.

  Exceptions:

- HOCs that proxy down props and hoist propTypes

  ```tsx
  function HOC(WrappedComponent) {
    return class Proxy extends React.Component {
      Proxy.propTypes = {
        text: PropTypes.string,
        isLoading: PropTypes.bool
      };

      render() {
        return <WrappedComponent {...this.props} />
      }
    }
  }
  ```

- Spreading objects with known, explicit props. This can be particularly useful when testing React components with Mocha’s beforeEach construct.

  ```tsx
  export default function Foo {
    const props = {
      text: '',
      isPublished: false
    }

    return (<div {...props} />);
  }
  ```

  Notes for use:
  Filter out unnecessary props when possible. Also, use [prop-types-exact](https://www.npmjs.com/package/prop-types-exact) to help prevent bugs.

  ```tsx
  // bad
  render() {
    const { irrelevantProp, ...relevantProps } = this.props;
    return <WrappedComponent {...this.props} />
  }

  // good
  render() {
    const { irrelevantProp, ...relevantProps } = this.props;
    return <WrappedComponent {...relevantProps} />
  }
  ```

- Props should be defined with an interface called `Props` and exported as component name followed by the Props keyword.

  ```tsx
  // bad
  export interface Props {
    // stuff goes here
  }

  const Button: FC<Props> = ({ onClick }) => {
    // stuff goes here
  };

  export default Button;

  // good
  interface Props {
    // stuff goes here
  }

  const Button: FC<Props> = ({ onClick }) => {
    // stuff goes here
  };

  export default Button;
  export type { Props as ButtonProps };
  ```

- If the component uses props from a HOC (e.g. `react-i18next`), a new type should be declared. This way the original props can be exported without the HOC props.

  ```tsx
  // bad
  export interface Props extends WithTranslation {
    // stuff goes here
  }

  const Button: FC<Props> = ({ t }) => {
    // stuff goes here
  };

  export default Button;
  export type { Props as ButtonProps };

  // good
  interface Props {
    // stuff goes here
  }

  type PropsWithHoc = Props & WithTranslation;

  const Button: FC<PropsWithHoc> = ({ t }) => {
    // stuff goes here
  };

  export default Button;
  export type { Props as ButtonProps };
  ```

- Event handler props should use `on` as prefix followed by the event name.

  > Why? Using a pattern for event handler prop names makes it easier to know the role of the prop. This way pattern matching can be used in Storybook to automatically catch [actions](https://storybook.js.org/docs/react/essentials/actions).

  ```tsx
  // bad
  <MyComponent handleChange={this.handleChange} />

  // bad
  <MyComponent submit={this.handleSubmit} />

  // good
  <MyComponent onChange={this.handleChange} />

  // good
  <MyComponent onSubmit={this.handleSubmit} />
  ```

## Refs

- Always use ref callbacks. eslint: [`react/no-string-refs`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-string-refs.md)

  ```tsx
  // bad
  <Foo ref="myRef" />

  // good
  <Foo ref={(ref) => { this.myRef = ref; }} />
  ```

## Methods

- Use arrow functions to close over local variables. It is handy when you need to pass additional data to an event handler. Although, make sure they [do not massively hurt performance](https://www.bignerdranch.com/blog/choosing-the-best-approach-for-react-event-handlers/), in particular when passed to custom components that might be PureComponents, because they will trigger a possibly needless rerender every time.

  ```tsx
  const ItemList = ({ items }) => (
    <ul>
      {items.map((item, index) => (
        <Item
          key={item.key}
          onClick={(event) => {
            doSomethingWith(event, item.name, index);
          }}
        />
      ))}
    </ul>
  );
  ```

- Bind event handlers for the render method in the constructor. eslint: [`react/jsx-no-bind`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md)

  > Why? A bind call in the render path creates a brand new function on every single render. Do not use arrow functions in class fields, because it makes them [challenging to test and debug, and can negatively impact performance](https://medium.com/@charpeni/arrow-functions-in-class-properties-might-not-be-as-great-as-we-think-3b3551c440b1), and because conceptually, class fields are for data, not logic.

  ```tsx
  // bad
  class extends React.Component {
    onClickDiv() {
      // do stuff
    }

    render() {
      return <div onClick={this.onClickDiv.bind(this)} />;
    }
  }

  // very bad
  class extends React.Component {
    onClickDiv() {
      // do stuff
    }

    render() {
      return <div onClick={(...args) => this.onClickDiv(...args)} />;
    }
  }

  // good
  class extends React.Component {
    constructor(props) {
      super(props);

      this.onClickDiv = this.onClickDiv.bind(this);
    }

    onClickDiv() {
      // do stuff
    }

    render() {
      return <div onClick={this.onClickDiv} />;
    }
  }
  ```

- Do not use underscore prefix for internal methods of a React component.

  > Why? Underscore prefixes are sometimes used as a convention in other languages to denote privacy. But, unlike those languages, there is no native support for privacy in JavaScript, everything is public. Regardless of your intentions, adding underscore prefixes to your properties does not actually make them private, and any property (underscore-prefixed or not) should be treated as being public.

  ```tsx
  // bad
  class extends React.Component {
    _onClickSubmit() {
      // do stuff
    },

    // other stuff
  };

  // good
  class extends React.Component {
    onClickSubmit() {
      // do stuff
    }

    // other stuff
  }
  ```

- Be sure to return a value in your `render` methods. eslint: [`react/require-render-return`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/require-render-return.md)

  ```tsx
  // bad
  render() {
    (<div />);
  }

  // good
  render() {
    return (<div />);
  }
  ```

## Ordering

- Ordering for `class extends React.Component`:

  1. optional `static` methods
  1. `constructor`
  1. `getChildContext`
  1. `UNSAFE_componentWillMount`
  1. `componentDidMount`
  1. `UNSAFE_componentWillReceiveProps`
  1. `shouldComponentUpdate`
  1. `componentWillUpdate`
  1. `componentDidUpdate`
  1. `componentWillUnmount`
  1. _event handlers starting with 'handle'_ like `handleSubmit()` or `handleChangeDescription()`
  1. _event handlers starting with 'on'_ like `onClickSubmit()` or `onChangeDescription()`
  1. _getter methods for `render`_ like `getSelectReason()` or `getFooterContent()`
  1. _optional render methods_ like `renderNavigation()` or `renderProfilePicture()`
  1. `render`

**[⬆ back to top](#table-of-contents)**
