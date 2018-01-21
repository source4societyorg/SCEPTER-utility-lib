const utilities = {
  isEmpty: (value) => (typeof value === 'undefined' || value === null || value === '' || (typeof value === 'object' &&  Object.getOwnPropertyNames(value).length < 1) || value === 'NaN' || value.length === 0 ),
  isNotEmpty: (value) => !isEmpty(value),
  standardErrorHandler: (callback, service) => (err) => {
    let response = service.prepareErrorResponse(err)
    callback(null, response)
  },
  standardSuccessHandler: (callback, service) => (responseData) => {
    let response = service.prepareSuccessResponse(responseData)
    callback(null, response)
  },
  standardCallbackHandler: (err, data, onErrorCallback, onSuccessCallback) => {
    if (utilities.isEmpty(err)) {
      onSuccessCallback(data)
    } else {
      onErrorCallback(err)
    }
  },
  validateApiResult: (result) => {
    if(typeof result === 'string') {
        result = JSON.parse(result);
    } 

    if (utilities.isEmpty(result) || utilities.isEmpty(result.status) || result.status === false) {
      throw new Error(result.errors.message);
    }
    return result
  },
  keyGenerator: (length) => {  
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  },
	getRandomInt: (min, max) => {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
	}
}

module.exports = utilities
