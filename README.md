# Check
[![Build Status](https://travis-ci.org/martijndeh/lego.svg?branch=master)](https://travis-ci.org/martijndeh/check)
[![Coverage Status](https://coveralls.io/repos/github/martijndeh/check/badge.svg?branch=master)](https://coveralls.io/github/martijndeh/check?branch=master)

A type checker for JavaScript inspired by Meteor's check.

```
npm install type-check-system --save
```

## Usage

Check if `value` is a string.
```js
let value = 'This is a string.';
check(value, String);
```

Check if `value` is a list of strings.
```js
let value = ['a', 'b', 'c'];
check(value, [String]);
```

Check if `value` is a string, or null.
```js
let value = 'string';
check(value, String, null);
```

Check if `value` is an object with key `id` with type string.
```js
let value = {
	id: '0af390f0-abb6-4ef6-b9af-6287e6aab172'
};
check(value, {id: String});
```

Please have a look at the tests to see more examples.

## Limitations

This library does not expose any `Match`-like functions, like Meteor's check library. Instead, this library only uses a check based on patterns to keep it's api simple. If you want `Match` features, have a look at [meteor-check](https://www.npmjs.com/package/meteor-check) instead.
