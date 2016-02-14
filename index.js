if(process.env.NODE_COV) {
	exports = module.exports = require('./lib-cov/index.js');
}
else {
	exports = module.exports = require('./lib/index.js');
}
