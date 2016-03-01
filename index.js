if(process.env.NODE_COV_CHECK) {
	exports = module.exports = require('./lib-cov/index.js');
}
else {
	exports = module.exports = require('./lib/index.js');
}
