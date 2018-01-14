const utilities = {
  isEmpty: (value) => (typeof value === 'undefined' || value === null || value === '' || (typeof value === 'object' &&  Object.getOwnPropertyNames(value).length < 1) || value === 'NaN' || value.length === 0 ),
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
  keyGenerator: (length) => {  
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }
}

module.exports = utilities
