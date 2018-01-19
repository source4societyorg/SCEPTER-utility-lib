const utilities = {
  isEmpty: (value) => (typeof value === 'undefined' || value === null || value === '' || value.length === 0 || (typeof value === 'object' && Object.keys(value).length < 1) || value === 'NaN'),
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
  }
}

module.exports = utilities
