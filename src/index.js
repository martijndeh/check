import CheckError from './error.js';

export default function check(value, ...patterns) {
	const _check = function(value, pattern, keys = []) {
		if (typeof pattern === 'undefined') {
			return (typeof value === 'undefined');
		}
		else if (pattern === null) {
			return (value === null);
		}
		else if (pattern === String) {
			return (typeof value === 'string');
		}
		else if (pattern === Array) {
			return Array.isArray(value);
		}
		else if (pattern === Number) {
			return (typeof value === 'number');
		}
		else if (pattern === Boolean) {
			return (typeof value === 'boolean');
		}
		else if (pattern === Function) {
			return (typeof value === 'function');
		}
		else if (pattern instanceof RegExp) {
			return (pattern.test(value) === true);
		}
		else if (pattern === Object) {
			return (value !== null) && (typeof value === 'object');
		}
		else if (typeof pattern === 'object') {
			return _check(value, Object) && Object.keys(pattern).every((key) => {
				const nextKeys = [...keys, key];
				const isValid = _check(value[key], pattern[key], nextKeys);

				if (!isValid) {
					throw new CheckError(`Value ${JSON.stringify(value[key])} is not of type ${JSON.stringify(pattern[key])}`, nextKeys.join('.'));
				}

				return isValid;
			});
		}

		return (value instanceof pattern);
	};

	if (patterns.length === 0) {
		throw new Error('No patterns to check.');
	}
	else {
		const isValid = patterns.some((pattern) => {
			if(Array.isArray(pattern)) {
				return Array.isArray(value) && value.every((subvalue) => _check(subvalue, pattern[0]));
			}
			else {
				return _check(value, pattern);
			}
		});

		if (!isValid) {
			throw new CheckError(`Value ${JSON.stringify(value)} is not of type ${patterns.map((pattern) => JSON.stringify(pattern)).join(', ')}.`);
		}
	}
}
