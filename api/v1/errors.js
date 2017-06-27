var inherits = require('util').inherits;

function ApiError() {

}

ApiError.prototype.name = 'ApiError';

inherits(ApiError, Error);

exports.ApiError = ApiError;

