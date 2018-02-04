const utilities = {
  isEmpty: (value) => (typeof value === 'undefined' || value === null || value === '' || (typeof value === 'object' &&  Object.getOwnPropertyNames(value).length < 1) || value === 'NaN' || value.length === 0 ),
  isNotEmpty: (value) => !utilities.isEmpty(value),
	getRandomInt: (min, max) => { min = Math.ceil(min); max = Math.floor(max); return Math.floor(Math.random() * (max - min)) + min; },
  valueOrDefault: (value, defaultValue) => value || defaultValue,
  ifTrueElseDefault: (statement, value, defaultValue) => statement ? utilities.valueOrDefault(value, defaultValue) : defaultValue,
  notEmptyAt: (targetObject, subProperties) => (utilities.isNotEmpty(utilities.getInOrDefault(targetObject, subProperties))),
  emptyAt: (targetObject, subProperties) => !utilities.notEmptyAt(targetObject, subProperties),
  ucFirst: (string) => ( string.charAt(0).toUpperCase() + string.slice(1) ),
  makeSequenceCallback: (generator, finalCallback) => (err, data) => utilities.isNotEmpty(err) ? finalCallback(utilities.valueOrDefault(err.message,err)) : generator.next(data),
  initiateSequence: (sequence, callback) => { 
    let sequenceCallback = utilities.makeSequenceCallback(sequence, callback)
    sequence.next()
    sequence.next(sequenceCallback) 
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

    if (utilities.emptyAt(result, ['status']) || result.status === false) {
      const error = utilities.getInOrDefault(result, ['errors', 'message'], utilities.getInOrDefault(result,['errorMessage'], utilities.getInOrDefault(result, ['message'], utilities.getInOrDefault(result, ['errors'], result ))))
      throw new Error(error);
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
  getInOrDefault: (targetObject, subProperties, defaultValue) => {
    let value = undefined
    if (utilities.isEmpty(targetObject)) {
      return defaultValue
    }
    
    value = targetObject
    for( let index = 0; index < subProperties.length; index++ ) {
      if (utilities.isEmpty(value[subProperties[index]])) {
        return defaultValue
      } else {
        value = value[subProperties[index]]
      }
    }    
    return utilities.valueOrDefault(value, defaultValue)
  }
}

module.exports = utilities
