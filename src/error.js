function CheckError(message) {
	this.name = 'CheckError';
    this.message = message;
    this.stack = (new Error()).stack;
}
CheckError.prototype = new Error();

exports = module.exports = CheckError;
