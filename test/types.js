'use strict';

import check from '../src/index.js';
import assert from 'assert';
import CheckError from '../src/error.js';

describe('types', function() {
	it('undefined', function() {
		check(undefined, undefined);
		check([undefined], [undefined]);

		assert.throws(() => check([1, 2, 3], [undefined]), CheckError);
		assert.throws(() => check([undefined, 2, 3], [undefined]), CheckError);
		assert.throws(() => check(1, undefined), CheckError);
		assert.throws(() => check('test', undefined), CheckError);
		assert.throws(() => check(/$/i, undefined), CheckError);
		assert.throws(() => check(null, undefined), CheckError);
		assert.throws(() => check(0, undefined), CheckError);
		assert.throws(() => check(false, undefined), CheckError);
		assert.throws(() => check(Object, undefined), CheckError);
		assert.throws(() => check({}, undefined), CheckError);
		assert.throws(() => check(function() {}, undefined), CheckError);
		assert.throws(() => check({id: 123}, undefined), CheckError);
		assert.throws(() => check(new Error(), undefined), CheckError);
	});

	it('null', function() {
		check(null, null);
		check([null], [null]);

		assert.throws(() => check([null, 1, 2], [null]), CheckError);
		assert.throws(() => check([1, 2, 3], [null]), CheckError);
		assert.throws(() => check(undefined, null), CheckError);
		assert.throws(() => check(1, null), CheckError);
		assert.throws(() => check('test', null), CheckError);
		assert.throws(() => check(/$/i, null), CheckError);
		assert.throws(() => check(0, null), CheckError);
		assert.throws(() => check(false, null), CheckError);
		assert.throws(() => check(Object, null), CheckError);
		assert.throws(() => check({}, null), CheckError);
		assert.throws(() => check(function() {}, null), CheckError);
		assert.throws(() => check({id: 123}, null), CheckError);
		assert.throws(() => check(new Error(), null), CheckError);
	});

	it('String', function() {
		check('check', String);
		check('check', String, null);
		check(null, String, null);
		check('', String);
		check(['test', 'test2', 'test3'], [String]);

		assert.throws(() => check(['test', 1], [String]), CheckError);
		assert.throws(() => check([1, 2], [String]), CheckError);
		assert.throws(() => check(undefined, String), CheckError);
		assert.throws(() => check(null, Number), CheckError);
		assert.throws(() => check(1, String), CheckError);
		assert.throws(() => check(/$/i, String), CheckError);
		assert.throws(() => check(0, String), CheckError);
		assert.throws(() => check(false, String), CheckError);
		assert.throws(() => check(Object, String), CheckError);
		assert.throws(() => check({}, String), CheckError);
		assert.throws(() => check(function() {}, String), CheckError);
		assert.throws(() => check({id: 123}, String), CheckError);
		assert.throws(() => check(new Error(), String), CheckError);
	});

	it('String or Number', function() {
		check('check', String, Number);
		check('check', Number, String);
		check(123, String, Number);
		check(123, Number, String);

		assert.throws(() => check(['test', 1], [String]), CheckError);
		assert.throws(() => check([1, 2], [String]), CheckError);

		assert.throws(() => check(undefined, String, Number), CheckError);
		assert.throws(() => check(null, String, Number), CheckError);
		assert.throws(() => check(/$/i, String, Number), CheckError);
		assert.throws(() => check(false, String, Number), CheckError);
		assert.throws(() => check(Object, String, Number), CheckError);
		assert.throws(() => check({}, String, Number), CheckError);
		assert.throws(() => check(function() {}, String, Number), CheckError);
		assert.throws(() => check({id: 123}, String, Number), CheckError);
		assert.throws(() => check(new Error(), String, Number), CheckError);
	});

	it('Number', function() {
		check(1, Number);
		check(-1, Number);
		check(0xFFFF, Number);
		check([1, 2, 3], [Number]);

		assert.throws(() => check([1, 2, 'test'], [Number]), CheckError);
		assert.throws(() => check(['a', 'b', 'c'], [Number]), CheckError);
		assert.throws(() => check(undefined, Number), CheckError);
		assert.throws(() => check(null, Number), CheckError);
		assert.throws(() => check('test', Number), CheckError);
		assert.throws(() => check(/$/i, Number), CheckError);
		assert.throws(() => check(false, Number), CheckError);
		assert.throws(() => check(Object, Number), CheckError);
		assert.throws(() => check({}, Number), CheckError);
		assert.throws(() => check(function() {}, Number), CheckError);
		assert.throws(() => check({id: 123}, Number), CheckError);
		assert.throws(() => check(new Error(), Number), CheckError);
	});

	it('Boolean', function() {
		check(true, Boolean);
		check(false, Boolean);
		check([false, true], [Boolean]);

		assert.throws(() => check(undefined, Boolean), CheckError);
		assert.throws(() => check(null, Boolean), CheckError);
		assert.throws(() => check('test', Boolean), CheckError);
		assert.throws(() => check(/$/i, Boolean), CheckError);
		assert.throws(() => check(0, Boolean), CheckError);
		assert.throws(() => check(1, Boolean), CheckError);
		assert.throws(() => check(Object, Boolean), CheckError);
		assert.throws(() => check({}, Boolean), CheckError);
		assert.throws(() => check(function() {}, Boolean), CheckError);
		assert.throws(() => check({id: 123}, Boolean), CheckError);
		assert.throws(() => check(new Error(), Boolean), CheckError);
	});

	it('RegExp', function() {
		check('test', /^test$/);
		check(/$/i, RegExp);
		check([/$/i], [RegExp]);

		assert.throws(() => check(undefined, /^test$/), CheckError);
		assert.throws(() => check(null, /^test$/), CheckError);
		assert.throws(() => check('test2', /^test$/), CheckError);
		assert.throws(() => check(/$/i, /^test$/), CheckError);
		assert.throws(() => check(0, /^test$/), CheckError);
		assert.throws(() => check(1, /^test$/), CheckError);
		assert.throws(() => check(Object, /^test$/), CheckError);
		assert.throws(() => check({}, /^test$/), CheckError);
		assert.throws(() => check(function() {}, /^test$/), CheckError);
		assert.throws(() => check({id: 123}, /^test$/), CheckError);
		assert.throws(() => check(new Error(), /^test$/), CheckError);
		assert.throws(() => check('fail', /^test$/), CheckError);
	});

	it('Object', function() {
		check({}, Object);
		check(new Error(), Object);
		check({id: 123}, Object);
		check([{id: 123}], [Object]);
		check(/$/i, Object);

		assert.throws(() => check(undefined, Object), CheckError);
		assert.throws(() => check(null, Object), CheckError);
		assert.throws(() => check('test', Object), CheckError);
		assert.throws(() => check(0, Object), CheckError);
		assert.throws(() => check(1, Object), CheckError);
		assert.throws(() => check(function() {}, Object), CheckError);
		assert.throws(() => check('fail', Object), CheckError);
	});

	it('Object keys', function() {
		check({id: 'test'}, {id: String});
		check({id: 'test', name: 'test'}, {id: String});
		check({id: 'test', tests: []}, {id: String, tests: Array});
		check([{id: 'test'}], [{id: String}]);

		assert.throws(() => check({id: 123}, {id: String}), CheckError);
		assert.throws(() => check({test: 123}, {id: String}), CheckError);
		assert.throws(() => check(undefined, {id: String}), CheckError);
		assert.throws(() => check(null, {id: String}), CheckError);
		assert.throws(() => check('test', {id: String}), CheckError);
		assert.throws(() => check(/$/i, {id: String}), CheckError);
		assert.throws(() => check(0, {id: String}), CheckError);
		assert.throws(() => check(1, {id: String}), CheckError);
		assert.throws(() => check(function() {}, {id: String}), CheckError);
		assert.throws(() => check('fail', {id: String}), CheckError);
	});

	it('Array', function() {
		check([], Array);
		check([1, 2, 3], Array);
		check([[1, 2, 3]], [Array]);

		assert.throws(() => check(undefined, Array), CheckError);
		assert.throws(() => check(null, Array), CheckError);
		assert.throws(() => check('test', Array), CheckError);
		assert.throws(() => check(/$/i, Array), CheckError);
		assert.throws(() => check(0, Array), CheckError);
		assert.throws(() => check(1, Array), CheckError);
		assert.throws(() => check(function() {}, Array), CheckError);
		assert.throws(() => check('fail', Array), CheckError);
		assert.throws(() => check({}, Array), CheckError);
		assert.throws(() => check({id: 123}, Array), CheckError);
	});

	it('Function', function() {
		check(function() {}, Function);
		check([function() {}], [Function]);

		assert.throws(() => check(undefined, Function), CheckError);
		assert.throws(() => check(null, Function), CheckError);
		assert.throws(() => check('test', Function), CheckError);
		assert.throws(() => check(/$/i, Function), CheckError);
		assert.throws(() => check(0, Function), CheckError);
		assert.throws(() => check(1, Function), CheckError);
		assert.throws(() => check('fail', Function), CheckError);
		assert.throws(() => check({}, Function), CheckError);
		assert.throws(() => check({id: 123}, Function), CheckError);
	});

	it('Nested objects', function() {
		let data = {
			sys: {
				id: 'test',
				version: 1
			},
			fields: [],
			name: 'Name',
			description: 'Description'
		};
		check(data, {
			sys: {
				id: String,
				version: Number
			},
			fields: Array,
			name: String,
			description: String
		});

		assert.throws(() => check(null, {
			sys: {
				id: String,
				version: Number
			},
			fields: Array,
			name: String,
			description: String
		}), CheckError);
	});

	it('No patterns', function() {
		var value = 123;
		assert.throws(() => check(value), Error);
	});
});
