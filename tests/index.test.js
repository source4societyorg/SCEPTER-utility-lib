const { fromJS } = require('immutable')
const Utils = require('../src/index')
const SCEPTERUtils = new Utils()

test('SCEPTERUtils.isEmpty is true when the value is empty string, empty object, empty array, undefined, null or NaN but not when false, function or instantiated class. SCEPTERUtils.isNotEmpty is the opposite', () => {
  const mockEmptyString = ''
  const mockEmptyObject = {}
  const mockEmptyArray = []
  const mockNull = null
  const mockNaN = Number('notanumber')
  const mockUndefined = undefined
  const mockString = 'mockString'
  const mockObject = { hasProperties: 'mockObject' }
  const MockClass = class MockClassObject { constructor () { return 'mockClass' } }
  const MockClassInsantiated = new MockClass()
  const mockArray = ['mockArray']
  const mockZero = 0
  const mockNumber = 1
  const mockFunction = () => ({})
  expect(SCEPTERUtils.isEmpty(mockEmptyString)).toBeTruthy()
  expect(SCEPTERUtils.isEmpty(mockEmptyObject)).toBeTruthy()
  expect(SCEPTERUtils.isEmpty(mockEmptyArray)).toBeTruthy()
  expect(SCEPTERUtils.isEmpty(mockUndefined)).toBeTruthy()
  expect(SCEPTERUtils.isEmpty(mockNull)).toBeTruthy()
  expect(SCEPTERUtils.isEmpty(mockNaN)).toBeTruthy()
  expect(SCEPTERUtils.isEmpty(false)).toBeFalsy()
  expect(SCEPTERUtils.isEmpty(true)).toBeFalsy()
  expect(SCEPTERUtils.isEmpty(mockString)).toBeFalsy()
  expect(SCEPTERUtils.isEmpty(mockObject)).toBeFalsy()
  expect(SCEPTERUtils.isEmpty(MockClass)).toBeFalsy()
  expect(SCEPTERUtils.isEmpty(MockClassInsantiated)).toBeFalsy()
  expect(SCEPTERUtils.isEmpty(mockArray)).toBeFalsy()
  expect(SCEPTERUtils.isEmpty(mockNumber)).toBeFalsy()
  expect(SCEPTERUtils.isEmpty(mockZero)).toBeFalsy()
  expect(SCEPTERUtils.isEmpty(mockFunction)).toBeFalsy()
  expect(SCEPTERUtils.isNotEmpty(mockEmptyString)).toBeFalsy()
  expect(SCEPTERUtils.isNotEmpty(mockEmptyObject)).toBeFalsy()
  expect(SCEPTERUtils.isNotEmpty(mockEmptyArray)).toBeFalsy()
  expect(SCEPTERUtils.isNotEmpty(mockUndefined)).toBeFalsy()
  expect(SCEPTERUtils.isNotEmpty(mockNull)).toBeFalsy()
  expect(SCEPTERUtils.isNotEmpty(mockNaN)).toBeFalsy()
  expect(SCEPTERUtils.isNotEmpty(false)).toBeTruthy()
  expect(SCEPTERUtils.isNotEmpty(true)).toBeTruthy()
  expect(SCEPTERUtils.isNotEmpty(mockString)).toBeTruthy()
  expect(SCEPTERUtils.isNotEmpty(mockObject)).toBeTruthy()
  expect(SCEPTERUtils.isNotEmpty(MockClass)).toBeTruthy()
  expect(SCEPTERUtils.isNotEmpty(MockClassInsantiated)).toBeTruthy()
  expect(SCEPTERUtils.isNotEmpty(mockArray)).toBeTruthy()
  expect(SCEPTERUtils.isNotEmpty(mockNumber)).toBeTruthy()
  expect(SCEPTERUtils.isNotEmpty(mockZero)).toBeTruthy()
  expect(SCEPTERUtils.isNotEmpty(mockFunction)).toBeTruthy()
})

test('SCEPTERUtils.getRandomInt selects a random integer, floors the result, and scales it to be within min inclusive, max exclusive', () => {
  const mockMin = 1
  const mockMax = 100
  const mockRandomResult = 5
  const mockFloor = (value) => {
    if (value !== mockMax && value !== mockRandomResult * (mockMax - mockMin)) {
      throw new Error('Invalid parameter in floor')
    }
    if (value === mockMax) {
      return mockMax
    }
    return mockRandomResult * (mockMax - mockMin)
  }
  const mockCeil = (value) => {
    expect(value).toEqual(mockMin)
    return mockMin
  }
  const mockRandom = () => mockRandomResult
  const mockMath = {
    floor: mockFloor,
    ceil: mockCeil,
    random: mockRandom
  }
  expect(SCEPTERUtils.getRandomInt(mockMin, mockMax, mockMath)).toEqual((mockRandomResult * (mockMax - mockMin)) + mockMin)
})

test('SCEPTERUtils.valueOrDefault will return the variables value if it exists, or else return the default', () => {
  const mockEmptyValue = ''
  const mockDefaultValue = 'mockdefaultvalue'
  const mockValue = 'mockValue'
  expect(SCEPTERUtils.valueOrDefault(mockEmptyValue, mockDefaultValue)).toEqual(mockDefaultValue)
  expect(SCEPTERUtils.valueOrDefault(mockValue, mockDefaultValue)).toEqual(mockValue)
})

test('SCEPTERUtils.ssValueOrDefault will return the variables value if it exists, or else return the default, but both must be functions', () => {
  const mockEmptyValue = ''
  const mockDefaultValue = () => 'mockdefaultvalue'
  const mockValue = () => 'mockValue'
  expect(SCEPTERUtils.ssValueOrDefault(mockEmptyValue, mockDefaultValue)).toEqual(mockDefaultValue())
  expect(SCEPTERUtils.ssValueOrDefault(mockValue, mockDefaultValue)).toEqual(mockValue)
})

test('SCEPTERUtils.ifTrueElseDefault returns the second parameter if the first is true, and the third if not', () => {
  const mockValue = 'mockValue'
  const mockDefaultValue = 'mockDefaultValue'
  expect(SCEPTERUtils.ifTrueElseDefault(false, mockValue, mockDefaultValue)).toEqual(mockDefaultValue)
  expect(SCEPTERUtils.ifTrueElseDefault(true, mockValue, mockDefaultValue)).toEqual(mockValue)
})

test('SCEPTERUtils.ssIfTrueElseDefault returns the second parameter if the first is true, and the third if not, but the second and third must be a function', () => {
  const mockValue = () => 'mockValue'
  const mockDefaultValue = () => 'mockDefaultValue'
  expect(SCEPTERUtils.ssIfTrueElseDefault(false, mockValue, mockDefaultValue)).toEqual(mockDefaultValue())
  expect(SCEPTERUtils.ssIfTrueElseDefault(true, mockValue, mockDefaultValue)).toEqual(mockValue())
})

test('SCEPTERUtils.notEmptyAt will return true if object is not empty at the nexted property point, false if it is. SCEPTERUtils.emptyAt will do the opposite', () => {
  const mockObject = {
    mockProperty1: {
      mockProperty2: {
        mockEmptyProperty: null,
        mockValidProperty: 'mockValidProperty'
      }
    }
  }

  expect(SCEPTERUtils.notEmptyAt(mockObject, ['mockProperty1', 'mockProperty2', 'mockEmptyProperty'])).toBeFalsy()
  expect(SCEPTERUtils.notEmptyAt(mockObject, ['mockProperty1', 'mockProperty2', 'mockValidProperty'])).toBeTruthy()
  expect(SCEPTERUtils.emptyAt(mockObject, ['mockProperty1', 'mockProperty2', 'mockEmptyProperty'])).toBeTruthy()
  expect(SCEPTERUtils.emptyAt(mockObject, ['mockProperty1', 'mockProperty2', 'mockValidProperty'])).toBeFalsy()
})

test('SCEPTERUtils.ucFirst will transform the first letter of a string to uppercase', () => {
  const mockLowercaseString = 'lowercase'
  const mockTitlecaseString = 'Lowercase'
  expect(SCEPTERUtils.ucFirst(mockLowercaseString)).toEqual(mockTitlecaseString)
})

test('SCEPTERUtils.validateApiResult will check if api result has a status of true and if not try to throw the error message.', () => {
  const mockResultStatusFalse = {
    status: false,
    error: 'mockError'
  }
  const mockResultStatusEmpty = {
    error: 'mockError'
  }
  const mockResultStatusInvalid = {
    status: 'mockInvalidStatus',
    error: 'mockError'
  }
  const mockValidResult = {
    status: true,
    result: { hasProperties: 'mockResult' }
  }

  const mockValidResultAsString = JSON.stringify(mockValidResult)
  expect(() => SCEPTERUtils.validateApiResult(mockResultStatusFalse)).toThrow()
  expect(() => SCEPTERUtils.validateApiResult(mockResultStatusEmpty)).toThrow()
  expect(() => SCEPTERUtils.validateApiResult(mockResultStatusInvalid)).toThrow()
  expect(SCEPTERUtils.validateApiResult(mockValidResultAsString)).toEqual(mockValidResult)
})

test('keyGenerator will generate a random string of the specified length', () => {
  const keyGenerator = SCEPTERUtils.keyGenerator
  const length = SCEPTERUtils.getRandomInt(1, 10)
  const keyResult = keyGenerator(length)
  expect(keyResult).toHaveLength(length)
  const secondKeyResult = keyGenerator(length)
  expect(keyResult !== secondKeyResult).toBeTruthy()
  const secondLength = SCEPTERUtils.getRandomInt(11, 15)
  const thirdKeyResult = keyGenerator(secondLength)
  expect(thirdKeyResult).toHaveLength(secondLength)
  expect(thirdKeyResult !== keyResult).toBeTruthy()
})

test('SCEPTERUtils.getInOrDefault will get the value of the property in the given depth or return the default if empty', () => {
  const mockDefault = 'mockDefault'
  const mockValue = 'mockValue'
  const mockObject = {
    subProperty: {
      validSubProperty: mockValue,
      emptySubProperty: null
    }
  }
  const mockEmptyObject = null
  const mockEmptySubProperty = ['subProperty', 'emptySubProperty']
  const mockValidSubProperty = ['subProperty', 'validSubProperty']
  expect(SCEPTERUtils.getInOrDefault(mockObject, mockEmptySubProperty, mockDefault)).toEqual(mockDefault)
  expect(SCEPTERUtils.getInOrDefault(mockObject, mockValidSubProperty, mockDefault)).toEqual(mockValue)
  expect(SCEPTERUtils.getInOrDefault(mockEmptyObject, mockValidSubProperty, mockDefault)).toEqual(mockDefault)
})

test('SCEPTERUtils.immutableToJS will convert an immutable object to a standard JSON if it is not empty, otherwise it returns undefined', () => {
  const mockObject = { hasProperties: 'mockObject' }
  const mockImmutableObject = fromJS(mockObject)
  const mockEmptyObject = null
  expect(SCEPTERUtils.immutableToJS(mockImmutableObject)).toEqual(mockObject)
  expect(SCEPTERUtils.immutableToJS(mockEmptyObject)).toBeUndefined()
})

test('SCEPTERUtils.standardCallbackHandler calls the error callback if err is not empty, otherwise it calls the success callback', (done) => {
  const mockErr = { hasProperties: 'mockErr' }
  const mockData = { hasProperties: 'mockData' }
  const mockErrorCallback = (err) => {
    expect(err).toEqual(mockErr)
    done()
  }
  const mockSuccessCallback = () => {
    throw new Error('Not supposed to call success callback when err is not empty')
  }
  SCEPTERUtils.standardCallbackHandler(mockErr, mockData, mockErrorCallback, mockSuccessCallback)
})

test('SCEPTERUtils.standardCallbackHandler calls the success callback if err is empty', (done) => {
  const mockNullErr = null
  const mockData = { hasProperties: 'mockData' }
  const mockErrorCallback = (err) => {
    expect(err).toBeNull()
    throw new Error('Not supposed to call error callback when err is empty')
  }
  const mockSuccessCallback = (data) => {
    expect(data).toEqual(mockData)
    done()
  }

  SCEPTERUtils.standardCallbackHandler(mockNullErr, mockData, mockErrorCallback, mockSuccessCallback)
})

test('SCEPTERUtils.findOneFunction ', () => {
  const mockHaystack = ['TEST1', 'TEST2', 'TEST3']
  const mockArray = ['TEST2']
  const mockMissArray = ['TEST4']
  expect(SCEPTERUtils.findOne(mockHaystack, mockArray)).toBeTruthy()
  expect(SCEPTERUtils.findOne(mockHaystack, mockMissArray)).toBeFalsy()
})

test('SCEPTERUtils.jsonParseOrDefault will return the JSON.Parse of a value if it is not empty, otherwise it returns the default value provided', () => {
  const mockJsonObject = { hasProperties: 'mockJsonObject' }
  const mockJsonString = JSON.stringify(mockJsonObject)
  const mockEmptyString = null
  const mockDefault = 'mockDefault'
  expect(SCEPTERUtils.jsonParseOrDefault(mockJsonString, mockDefault)).toEqual(mockJsonObject)
  expect(SCEPTERUtils.jsonParseOrDefault(mockEmptyString, mockDefault)).toEqual(mockDefault)
})

test('SCEPTERUtils.eitherOf will return true if one or the other value is true, otherwise it will return false', () => {
  const trueValue1 = true
  const trueValue2 = true
  const falseValue1 = false
  const falseValue2 = false
  expect(SCEPTERUtils.eitherOf(trueValue1, trueValue2)).toBeTruthy()
  expect(SCEPTERUtils.eitherOf(trueValue1, falseValue2)).toBeTruthy()
  expect(SCEPTERUtils.eitherOf(falseValue1, trueValue2)).toBeTruthy()
  expect(SCEPTERUtils.eitherOf(falseValue1, falseValue2)).toBeFalsy()
})

test('SCEPTERUtils.ssEitherOf will return true if one or the other value is true, otherwise it will return false, but second argument must be function', () => {
  const trueValue1 = true
  const trueValue2 = () => true
  const falseValue1 = false
  const falseValue2 = () => false
  expect(SCEPTERUtils.ssEitherOf(trueValue1, trueValue2)).toBeTruthy()
  expect(SCEPTERUtils.ssEitherOf(trueValue1, falseValue2)).toBeTruthy()
  expect(SCEPTERUtils.ssEitherOf(falseValue1, trueValue2)).toBeTruthy()
  expect(SCEPTERUtils.ssEitherOf(falseValue1, falseValue2)).toBeFalsy()
})

test('SCEPTERUtils.conjunctionOf will return true if both values are true, otherwise will return false', () => {
  const trueValue1 = true
  const trueValue2 = true
  const falseValue1 = false
  const falseValue2 = false
  expect(SCEPTERUtils.conjunctionOf(trueValue1, trueValue2)).toBeTruthy()
  expect(SCEPTERUtils.conjunctionOf(trueValue1, falseValue2)).toBeFalsy()
  expect(SCEPTERUtils.conjunctionOf(falseValue1, falseValue2)).toBeFalsy()
  expect(SCEPTERUtils.conjunctionOf(falseValue1, trueValue2)).toBeFalsy()
})

test('SCEPTERUtils.ssConjunctionOf will return true if both values are true, otherwise will return false but the second value must be a function', () => {
  const trueValue1 = true
  const trueValue2 = () => true
  const falseValue1 = false
  const falseValue2 = () => false
  expect(SCEPTERUtils.ssConjunctionOf(trueValue1, trueValue2)).toBeTruthy()
  expect(SCEPTERUtils.ssConjunctionOf(trueValue1, falseValue2)).toBeFalsy()
  expect(SCEPTERUtils.ssConjunctionOf(falseValue1, falseValue2)).toBeFalsy()
  expect(SCEPTERUtils.ssConjunctionOf(falseValue1, trueValue2)).toBeFalsy()
})

test('SCEPTERUtils.trueIfEqual will return true if value1 === value2 or else false', () => {
  const mockValue1 = 1
  const mockValue2 = 1
  const mockValue3 = 2
  expect(SCEPTERUtils.trueIfEqual(mockValue1, mockValue2)).toBeTruthy()
  expect(SCEPTERUtils.trueIfEqual(mockValue1, mockValue3)).toBeFalsy()
})

test('SCEPTERUtils.nullOp returns null', () => {
  expect(SCEPTERUtils.nullOp()).toBeNull()
})
