'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.default = check;

var _error = require('./error.js');

var _error2 = _interopRequireDefault(_error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function check(value) {
	var _check = function _check(value, pattern) {
		var keys = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];

		if (typeof pattern === 'undefined') {
			return typeof value === 'undefined';
		} else if (pattern === null) {
			return value === null;
		} else if (pattern === String) {
			return typeof value === 'string';
		} else if (pattern === Array) {
			return Array.isArray(value);
		} else if (pattern === Number) {
			return typeof value === 'number';
		} else if (pattern === Boolean) {
			return typeof value === 'boolean';
		} else if (pattern === Function) {
			return typeof value === 'function';
		} else if (pattern instanceof RegExp) {
			return pattern.test(value) === true;
		} else if (pattern === Object) {
			return value !== null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object';
		} else if ((typeof pattern === 'undefined' ? 'undefined' : _typeof(pattern)) === 'object') {
			return _check(value, Object) && Object.keys(pattern).every(function (key) {
				var nextKeys = [].concat(_toConsumableArray(keys), [key]);
				var isValid = _check(value[key], pattern[key], nextKeys);

				if (!isValid) {
					throw new _error2.default('Value ' + JSON.stringify(value[key]) + ' is not of type ' + JSON.stringify(pattern[key]), nextKeys.join('.'));
				}

				return isValid;
			});
		}

		return value instanceof pattern;
	};

	for (var _len = arguments.length, patterns = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
		patterns[_key - 1] = arguments[_key];
	}

	if (patterns.length === 0) {
		throw new Error('No patterns to check.');
	} else {
		var isValid = patterns.some(function (pattern) {
			if (Array.isArray(pattern)) {
				return Array.isArray(value) && value.every(function (subvalue) {
					return _check(subvalue, pattern[0]);
				});
			} else {
				return _check(value, pattern);
			}
		});

		if (!isValid) {
			throw new _error2.default('Value ' + JSON.stringify(value) + ' is not of type ' + patterns.map(function (pattern) {
				return JSON.stringify(pattern);
			}).join(', ') + '.');
		}
	}
}