const check = require('..');
const assert = require('assert');

describe('types', function() {
	it('undefined', function() {
		check(undefined, undefined);
		check([undefined], [undefined]);

		assert.throws(() => check([1, 2, 3], [undefined]), TypeError);
		assert.throws(() => check([undefined, 2, 3], [undefined]), TypeError);
		assert.throws(() => check(1, undefined), TypeError);
		assert.throws(() => check('test', undefined), TypeError);
		assert.throws(() => check(/$/i, undefined), TypeError);
		assert.throws(() => check(null, undefined), TypeError);
		assert.throws(() => check(0, undefined), TypeError);
		assert.throws(() => check(false, undefined), TypeError);
		assert.throws(() => check(Object, undefined), TypeError);
		assert.throws(() => check({}, undefined), TypeError);
		assert.throws(() => check(function() {}, undefined), TypeError);
		assert.throws(() => check({id: 123}, undefined), TypeError);
		assert.throws(() => check(new Error(), undefined), TypeError);
	});

	it('null', function() {
		check(null, null);
		check([null], [null]);

		assert.throws(() => check([null, 1, 2], [null]), TypeError);
		assert.throws(() => check([1, 2, 3], [null]), TypeError);
		assert.throws(() => check(undefined, null), TypeError);
		assert.throws(() => check(1, null), TypeError);
		assert.throws(() => check('test', null), TypeError);
		assert.throws(() => check(/$/i, null), TypeError);
		assert.throws(() => check(0, null), TypeError);
		assert.throws(() => check(false, null), TypeError);
		assert.throws(() => check(Object, null), TypeError);
		assert.throws(() => check({}, null), TypeError);
		assert.throws(() => check(function() {}, null), TypeError);
		assert.throws(() => check({id: 123}, null), TypeError);
		assert.throws(() => check(new Error(), null), TypeError);
	});

	it('String', function() {
		check('check', String);
		check('check', String, null);
		check(null, String, null);
		check('', String);
		check(['test', 'test2', 'test3'], [String]);

		assert.throws(() => check(['test', 1], [String]), TypeError);
		assert.throws(() => check([1, 2], [String]), TypeError);
		assert.throws(() => check(undefined, String), TypeError);
		assert.throws(() => check(null, Number), TypeError);
		assert.throws(() => check(1, String), TypeError);
		assert.throws(() => check(/$/i, String), TypeError);
		assert.throws(() => check(0, String), TypeError);
		assert.throws(() => check(false, String), TypeError);
		assert.throws(() => check(Object, String), TypeError);
		assert.throws(() => check({}, String), TypeError);
		assert.throws(() => check(function() {}, String), TypeError);
		assert.throws(() => check({id: 123}, String), TypeError);
		assert.throws(() => check(new Error(), String), TypeError);
	});

	it('String or Number', function() {
		check('check', String, Number);
		check('check', Number, String);
		check(123, String, Number);
		check(123, Number, String);

		assert.throws(() => check(['test', 1], [String]), TypeError);
		assert.throws(() => check([1, 2], [String]), TypeError);

		assert.throws(() => check(undefined, String, Number), TypeError);
		assert.throws(() => check(null, String, Number), TypeError);
		assert.throws(() => check(/$/i, String, Number), TypeError);
		assert.throws(() => check(false, String, Number), TypeError);
		assert.throws(() => check(Object, String, Number), TypeError);
		assert.throws(() => check({}, String, Number), TypeError);
		assert.throws(() => check(function() {}, String, Number), TypeError);
		assert.throws(() => check({id: 123}, String, Number), TypeError);
		assert.throws(() => check(new Error(), String, Number), TypeError);
	});

	it('Number', function() {
		check(1, Number);
		check(-1, Number);
		check(0xFFFF, Number);
		check([1, 2, 3], [Number]);

		assert.throws(() => check([1, 2, 'test'], [Number]), TypeError);
		assert.throws(() => check(['a', 'b', 'c'], [Number]), TypeError);
		assert.throws(() => check(undefined, Number), TypeError);
		assert.throws(() => check(null, Number), TypeError);
		assert.throws(() => check('test', Number), TypeError);
		assert.throws(() => check(/$/i, Number), TypeError);
		assert.throws(() => check(false, Number), TypeError);
		assert.throws(() => check(Object, Number), TypeError);
		assert.throws(() => check({}, Number), TypeError);
		assert.throws(() => check(function() {}, Number), TypeError);
		assert.throws(() => check({id: 123}, Number), TypeError);
		assert.throws(() => check(new Error(), Number), TypeError);
	});

	it('Boolean', function() {
		check(true, Boolean);
		check(false, Boolean);
		check([false, true], [Boolean]);

		assert.throws(() => check(undefined, Boolean), TypeError);
		assert.throws(() => check(null, Boolean), TypeError);
		assert.throws(() => check('test', Boolean), TypeError);
		assert.throws(() => check(/$/i, Boolean), TypeError);
		assert.throws(() => check(0, Boolean), TypeError);
		assert.throws(() => check(1, Boolean), TypeError);
		assert.throws(() => check(Object, Boolean), TypeError);
		assert.throws(() => check({}, Boolean), TypeError);
		assert.throws(() => check(function() {}, Boolean), TypeError);
		assert.throws(() => check({id: 123}, Boolean), TypeError);
		assert.throws(() => check(new Error(), Boolean), TypeError);
	});

	it('RegExp', function() {
		check('test', /^test$/);
		check(/$/i, RegExp);
		check([/$/i], [RegExp]);

		assert.throws(() => check(undefined, /^test$/), TypeError);
		assert.throws(() => check(null, /^test$/), TypeError);
		assert.throws(() => check('test2', /^test$/), TypeError);
		assert.throws(() => check(/$/i, /^test$/), TypeError);
		assert.throws(() => check(0, /^test$/), TypeError);
		assert.throws(() => check(1, /^test$/), TypeError);
		assert.throws(() => check(Object, /^test$/), TypeError);
		assert.throws(() => check({}, /^test$/), TypeError);
		assert.throws(() => check(function() {}, /^test$/), TypeError);
		assert.throws(() => check({id: 123}, /^test$/), TypeError);
		assert.throws(() => check(new Error(), /^test$/), TypeError);
		assert.throws(() => check('fail', /^test$/), TypeError);
	});

	it('Object', function() {
		check({}, Object);
		check(new Error(), Object);
		check({id: 123}, Object);
		check([{id: 123}], [Object]);
		check(/$/i, Object);

		assert.throws(() => check(undefined, Object), TypeError);
		assert.throws(() => check(null, Object), TypeError);
		assert.throws(() => check('test', Object), TypeError);
		assert.throws(() => check(0, Object), TypeError);
		assert.throws(() => check(1, Object), TypeError);
		assert.throws(() => check(function() {}, Object), TypeError);
		assert.throws(() => check('fail', Object), TypeError);
	});

	it('Object keys', function() {
		check({id: 'test'}, {id: String});
		check({id: 'test', name: 'test'}, {id: String});
		check({id: 'test', tests: []}, {id: String, tests: Array});
		check([{id: 'test'}], [{id: String}]);

		assert.throws(() => check({id: 123}, {id: String}), TypeError);
		assert.throws(() => check({test: 123}, {id: String}), TypeError);
		assert.throws(() => check(undefined, {id: String}), TypeError);
		assert.throws(() => check(null, {id: String}), TypeError);
		assert.throws(() => check('test', {id: String}), TypeError);
		assert.throws(() => check(/$/i, {id: String}), TypeError);
		assert.throws(() => check(0, {id: String}), TypeError);
		assert.throws(() => check(1, {id: String}), TypeError);
		assert.throws(() => check(function() {}, {id: String}), TypeError);
		assert.throws(() => check('fail', {id: String}), TypeError);
	});

	it('Array', function() {
		check([], Array);
		check([1, 2, 3], Array);
		check([[1, 2, 3]], [Array]);

		assert.throws(() => check(undefined, Array), TypeError);
		assert.throws(() => check(null, Array), TypeError);
		assert.throws(() => check('test', Array), TypeError);
		assert.throws(() => check(/$/i, Array), TypeError);
		assert.throws(() => check(0, Array), TypeError);
		assert.throws(() => check(1, Array), TypeError);
		assert.throws(() => check(function() {}, Array), TypeError);
		assert.throws(() => check('fail', Array), TypeError);
		assert.throws(() => check({}, Array), TypeError);
		assert.throws(() => check({id: 123}, Array), TypeError);
	});
});
