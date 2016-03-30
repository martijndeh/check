'use strict';

import check from '../src/index.js';
import assert from 'assert';

describe('keys', function() {
	it('Nested objects', function() {
		assert.throws(() => check({ some: { }}, {
			some: {
				field: String,
			},
		}), (error) => {
			return (error.key === 'some.field');
		});
	});
});
