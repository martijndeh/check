export default function CheckError(message, key = null) {
	this.name = 'CheckError';
	this.key = key;
    this.message = message;
    this.stack = (new Error()).stack;
}
CheckError.prototype = new Error();
