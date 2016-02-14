function check(value, ...patterns) {
	let _check = function(value, pattern) {
		if(typeof pattern === 'undefined') {
			return (typeof value === 'undefined');
		}
		else if(pattern === null) {
			return (value === null);
		}
		else if(pattern === String) {
			return (typeof value === 'string');
		}
		else if(pattern === Array) {
			return Array.isArray(value);
		}
		else if(pattern === Number) {
			return (typeof value === 'number');
		}
		else if(pattern === Boolean) {
			return (typeof value === 'boolean');
		}
		else if(pattern === Function) {
			return (typeof value === 'function');
		}
		else if(pattern instanceof RegExp) {
			return (pattern.test(value) === true);
		}
		else if(pattern === Object) {
			return (value !== null) && (typeof value === 'object');
		}
		else if(typeof pattern === 'object') {
			return Object.keys(pattern).every((key) => _check(value[key], pattern[key]));
		}
		else {
			return (value instanceof pattern);
		}
	};

	let valid = patterns.some((pattern) => {
		if(Array.isArray(pattern)) {
			return Array.isArray(value) && value.every((subvalue) => _check(subvalue, pattern[0]));
		}
		else {
			return _check(value, pattern);
		}
	});

	if(!valid) {
		throw new TypeError(`Value ${value} is not of type ${patterns}.`);
	}
}

exports = module.exports = check;
