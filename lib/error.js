'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CheckError;
function CheckError(message) {
  var key = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

  this.name = 'CheckError';
  this.key = key;
  this.message = message;
  this.stack = new Error().stack;
}
CheckError.prototype = new Error();