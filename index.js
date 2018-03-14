
const isEmptyFunction = (value) => (
  typeof value === 'undefined' ||
  value === null ||
  value === '' ||
  (typeof value === 'object' && Object.getOwnPropertyNames(value).length < 1) ||
  Number.isNaN(value) ||
  (value.length === 0 && typeof value !== 'function')
)
const isNotEmptyFunction = (value) => !isEmptyFunction(value)
const getRandomIntFunction = (min, max, injectedMath) => {
  const Mathematics = valueOrDefaultFunction(injectedMath, Math)
  min = Mathematics.ceil(min); max = Mathematics.floor(max); return Mathematics.floor(Mathematics.random() * (max - min)) + min
}
const valueOrDefaultFunction = (value, defaultValue) => isNotEmptyFunction(value) ? value : defaultValue
const ifTrueElseDefaultFunction = (statement, value, defaultValue) => statement ? valueOrDefaultFunction(value, defaultValue) : defaultValue
const notEmptyAtFunction = (targetObject, subProperties) => (isNotEmptyFunction(getInOrDefaultFunction(targetObject, subProperties)))
const emptyAtFunction = (targetObject, subProperties) => !notEmptyAtFunction(targetObject, subProperties)
const ucFirstFunction = (string) => (string.charAt(0).toUpperCase() + string.slice(1))
const validateApiResultFunction = (result) => {
  if (typeof result === 'string') {
    result = JSON.parse(result)
  }

  if (emptyAtFunction(result, ['status']) || result.status !== true) {
    const error = getInOrDefaultFunction(result, ['errors', 'message'], getInOrDefaultFunction(result, ['errorMessage'], getInOrDefaultFunction(result, ['message'], getInOrDefaultFunction(result, ['errors'], result))))
    throw new Error(error)
  }
  return result
}
const keyGeneratorFunction = (length) => {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let retVal = ''
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n))
  }
  return retVal
}

const getInOrDefaultFunction = (targetObject, subProperties, defaultValue) => {
  let value
  if (isEmptyFunction(targetObject)) {
    return defaultValue
  }

  value = targetObject
  for (let index = 0; index < subProperties.length; index++) {
    if (isEmptyFunction(value[subProperties[index]])) {
      return defaultValue
    } else {
      value = value[subProperties[index]]
    }
  }
  return valueOrDefaultFunction(value, defaultValue)
}

const immutableToJSFunction = (immutableObject) => {
  let mutableObject
  if (isNotEmptyFunction(immutableObject)) {
    mutableObject = immutableObject.toJS()
  }
  return mutableObject
}

const standardCallbackHandlerFunction = (err, data, onErrorCallback, onSuccessCallback) => {
  if (isEmptyFunction(err)) {
    onSuccessCallback(data)
  } else {
    onErrorCallback(err)
  }
}

const findOneFunction = (haystack, array) => array.some((v) => haystack.indexOf(v) >= 0)

module.exports.isEmpty = isEmptyFunction
module.exports.isNotEmpty = isNotEmptyFunction
module.exports.getRandomInt = getRandomIntFunction
module.exports.valueOrDefault = valueOrDefaultFunction
module.exports.ifTrueElseDefault = ifTrueElseDefaultFunction
module.exports.notEmptyAt = notEmptyAtFunction
module.exports.emptyAt = emptyAtFunction
module.exports.ucFirst = ucFirstFunction
module.exports.validateApiResult = validateApiResultFunction
module.exports.keyGenerator = keyGeneratorFunction
module.exports.getInOrDefault = getInOrDefaultFunction
module.exports.immutableToJS = immutableToJSFunction
module.exports.standardCallbackHandler = standardCallbackHandlerFunction
module.exports.findOne = findOneFunction
