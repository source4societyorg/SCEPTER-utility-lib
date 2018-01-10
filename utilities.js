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
  }
}

module.exports = utilities
