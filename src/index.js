class SCEPTERUtils {
  isEmpty (value) {
    return typeof value === 'undefined' ||
    value === null ||
    value === '' ||
    (typeof value === 'object' && Object.getOwnPropertyNames(value).length < 1 && value.constructor.name === 'Object') ||
    Number.isNaN(value) ||
    (value.length === 0 && typeof value !== 'function')
  }

  isNotEmpty (value) {
    return !this.isEmpty(value)
  }

  getRandomInt (injectedMin, injectedMax, injectedMath) {
    const Mathematics = this.valueOrDefault(injectedMath, Math)
    let min = injectedMin
    let max = injectedMax
    min = Mathematics.ceil(min); max = Mathematics.floor(max)
    return Mathematics.floor(Mathematics.random() * (max - min)) + min
  };

  valueOrDefault (value, defaultValue) {
    return this.isNotEmpty(value) ? value : defaultValue
  }

  ssValueOrDefault (value, defaultValue) {
    return this.isNotEmpty(value) ? value : defaultValue()
  }

  ifTrueElseDefault (statement, value, defaultValue) {
    return statement ? this.valueOrDefault(value, defaultValue) : defaultValue
  }

  ssIfTrueElseDefault (statement, value, defaultValue) {
    return statement ? this.ssValueOrDefault(value(), defaultValue) : defaultValue()
  }

  notEmptyAt (targetObject, subProperties) {
    return (this.isNotEmpty(this.getInOrDefault(targetObject, subProperties)))
  }

  emptyAt (targetObject, subProperties) {
    return !this.notEmptyAt(targetObject, subProperties)
  }

  ucFirst (string) {
    return (string.charAt(0).toUpperCase() + string.slice(1))
  }

  validateApiResult (injectedResult) {
    let result = injectedResult
    if (typeof result === 'string') {
      result = JSON.parse(result)
    }

    if (this.emptyAt(result, ['status']) || result.status !== true) {
      const error = this.getInOrDefault(result, ['errors', 'message'], this.getInOrDefault(result, ['errorMessage'], this.getInOrDefault(result, ['message'], this.getInOrDefault(result, ['errors'], result))))
      throw new Error(error)
    }
    return result
  };

  keyGenerator (length) {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let retVal = ''
    for (let i = 0, n = charset.length; i < length; i += 1) {
      retVal += charset.charAt(Math.floor(Math.random() * n))
    }
    return retVal
  };

  getInOrDefault (targetObject, subProperties, defaultValue) {
    let value
    if (this.isEmpty(targetObject)) {
      return defaultValue
    }

    value = targetObject
    for (let index = 0; index < subProperties.length; index += 1) {
      if (this.isEmpty(value[subProperties[index]])) {
        return defaultValue
      }
      value = value[subProperties[index]]
    }
    return this.valueOrDefault(value, defaultValue)
  };

  immutableToJS (immutableObject) {
    let mutableObject
    if (this.isNotEmpty(immutableObject)) {
      mutableObject = immutableObject.toJS()
    }
    return mutableObject
  };

  standardCallbackHandler (err, data, onErrorCallback, onSuccessCallback) {
    if (this.isEmpty(err)) {
      onSuccessCallback(data)
    } else {
      onErrorCallback(err)
    }
  };

  findOne (haystack, array) {
    return array.some((v) => haystack.indexOf(v) >= 0)
  }

  jsonParseOrDefault (value, defaultValue) {
    return this.isNotEmpty(value) ? JSON.parse(value) : defaultValue
  }

  eitherOf (value1, value2) {
    return value1 || value2
  }

  ssEitherOf (value1, value2) {
    return value1 || value2()
  }

  conjunctionOf (value1, value2) {
    return value1 && value2
  }

  ssConjunctionOf (value1, value2) {
    return value1 && value2()
  }

  trueIfEqual (value1, value2) {
    return value1 === value2
  }

  nullOp () {
    return null
  }
}

module.exports = SCEPTERUtils
