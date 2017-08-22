'use strict';

import check from '../src/index.js';
import assert from 'assert';

describe('error pattern types', function() {
	it('String', function() {
		assert.throws(() => check(null, String), (error) => {
			return (error.message === 'Value null is not of type String.');
		});
	});

	it('[String]', function() {
		assert.throws(() => check('strValue', [String]), (error) => {
			return (error.message === 'Value "strValue" is not of type [String].');
		});
	});
});
