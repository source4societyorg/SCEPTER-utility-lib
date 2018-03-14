test('isEmpty is true when the value is empty string, empty object, empty array, undefined, null or NaN but not when false or function. isNotEmpty is the opposite', () => {
  const mockEmptyString = ''
  const mockEmptyObject = {}
  const mockEmptyArray = []
  const mockNull = null
  const mockNaN = Number('notanumber')
  const mockUndefined = undefined
  const mockString = 'mockString'
  const mockObject = { hasProperties: 'mockObject' }
  const mockArray = ['mockArray']
  const mockZero = 0
  const mockNumber = 1
  const mockFunction = () => ({})
  const isEmpty = require('../index').isEmpty
  const isNotEmpty = require('../index').isNotEmpty
  expect(isEmpty(mockEmptyString)).toBeTruthy()
  expect(isEmpty(mockEmptyObject)).toBeTruthy()
  expect(isEmpty(mockEmptyArray)).toBeTruthy()
  expect(isEmpty(mockUndefined)).toBeTruthy()
  expect(isEmpty(mockNull)).toBeTruthy()
  expect(isEmpty(mockNaN)).toBeTruthy()
  expect(isEmpty(false)).toBeFalsy()
  expect(isEmpty(true)).toBeFalsy()
  expect(isEmpty(mockString)).toBeFalsy()
  expect(isEmpty(mockObject)).toBeFalsy()
  expect(isEmpty(mockArray)).toBeFalsy()
  expect(isEmpty(mockNumber)).toBeFalsy()
  expect(isEmpty(mockZero)).toBeFalsy()
  expect(isEmpty(mockFunction)).toBeFalsy()
  expect(isNotEmpty(mockEmptyString)).toBeFalsy()
  expect(isNotEmpty(mockEmptyObject)).toBeFalsy()
  expect(isNotEmpty(mockEmptyArray)).toBeFalsy()
  expect(isNotEmpty(mockUndefined)).toBeFalsy()
  expect(isNotEmpty(mockNull)).toBeFalsy()
  expect(isNotEmpty(mockNaN)).toBeFalsy()
  expect(isNotEmpty(false)).toBeTruthy()
  expect(isNotEmpty(true)).toBeTruthy()
  expect(isNotEmpty(mockString)).toBeTruthy()
  expect(isNotEmpty(mockObject)).toBeTruthy()
  expect(isNotEmpty(mockArray)).toBeTruthy()
  expect(isNotEmpty(mockNumber)).toBeTruthy()
  expect(isNotEmpty(mockZero)).toBeTruthy()
  expect(isNotEmpty(mockFunction)).toBeTruthy()
})

test('getRandomInt selects a random integer, floors the result, and scales it to be within min inclusive, max exclusive', () => {
  const getRandomInt = require('../index').getRandomInt
  const mockMin = 1
  const mockMax = 100
  const mockRandomResult = 5
  const mockFloor = (value) => {
    if (value !== mockMax && value !== mockRandomResult * (mockMax - mockMin)) {
      throw new Error('Invalid parameter in floor')
    }
    if (value === mockMax) {
      return mockMax
    } else {
      return mockRandomResult * (mockMax - mockMin)
    }
  }
  const mockCeil = (value) => {
    expect(value).toEqual(mockMin)
    return mockMin
  }
  const mockRandom = () => {
    return mockRandomResult
  }
  const mockMath = {
    floor: mockFloor,
    ceil: mockCeil,
    random: mockRandom
  }
  expect(getRandomInt(mockMin, mockMax, mockMath)).toEqual((mockRandomResult * (mockMax - mockMin)) + mockMin)
})

test('valueOrDefault will return the variables value if it exists, or else return the default', () => {
  const mockEmptyValue = ''
  const mockDefaultValue = 'mockdefaultvalue'
  const mockValue = 'mockValue'
  const valueOrDefault = require('../index').valueOrDefault
  expect(valueOrDefault(mockEmptyValue, mockDefaultValue)).toEqual(mockDefaultValue)
  expect(valueOrDefault(mockValue, mockDefaultValue)).toEqual(mockValue)
})

test('ifTrueElseDefault returns the second parameter if the first is true, and the third if not', () => {
  const mockValue = 'mockValue'
  const mockDefaultValue = 'mockDefaultValue'
  const ifTrueElseDefault = require('../index').ifTrueElseDefault
  expect(ifTrueElseDefault(false, mockValue, mockDefaultValue)).toEqual(mockDefaultValue)
  expect(ifTrueElseDefault(true, mockValue, mockDefaultValue)).toEqual(mockValue)
})

test('notEmptyAt will return true if object is not empty at the nexted property point, false if it is. emptyAt will do the opposite', () => {
  const mockObject = {
    mockProperty1: {
      mockProperty2: {
        mockEmptyProperty: null,
        mockValidProperty: 'mockValidProperty'
      }
    }
  }
  const notEmptyAt = require('../index').notEmptyAt
  const emptyAt = require('../index').emptyAt
  expect(notEmptyAt(mockObject, ['mockProperty1', 'mockProperty2', 'mockEmptyProperty'])).toBeFalsy()
  expect(notEmptyAt(mockObject, ['mockProperty1', 'mockProperty2', 'mockValidProperty'])).toBeTruthy()
  expect(emptyAt(mockObject, ['mockProperty1', 'mockProperty2', 'mockEmptyProperty'])).toBeTruthy()
  expect(emptyAt(mockObject, ['mockProperty1', 'mockProperty2', 'mockValidProperty'])).toBeFalsy()
})

test('ucFirst will transform the first letter of a string to uppercase', () => {
  const mockLowercaseString = 'lowercase'
  const mockTitlecaseString = 'Lowercase'
  const ucFirst = require('../index').ucFirst
  expect(ucFirst(mockLowercaseString)).toEqual(mockTitlecaseString)
})

test('validateApiResult will check if api result has a status of true and if not try to throw the error message.', () => {
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
  const validateApiResult = require('../index').validateApiResult
  expect(() => validateApiResult(mockResultStatusFalse)).toThrow()
  expect(() => validateApiResult(mockResultStatusEmpty)).toThrow()
  expect(() => validateApiResult(mockResultStatusInvalid)).toThrow()
  expect(validateApiResult(mockValidResultAsString)).toEqual(mockValidResult)
})

test('keyGenerator will generate a random string of the specified length', () => {
  const getRandomInt = require('../index').getRandomInt
  const keyGenerator = require('../index').keyGenerator
  const length = getRandomInt(1, 10)
  const keyResult = keyGenerator(length)
  expect(keyResult).toHaveLength(length)
  const secondKeyResult = keyGenerator(length)
  expect(keyResult !== secondKeyResult).toBeTruthy()
  const secondLength = getRandomInt(11, 15)
  const thirdKeyResult = keyGenerator(secondLength)
  expect(thirdKeyResult).toHaveLength(secondLength)
  expect(thirdKeyResult !== keyResult).toBeTruthy()
})

test('getInOrDefault will get the value of the property in the given depth or return the default if empty', () => {
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
  const getInOrDefault = require('../index').getInOrDefault
  expect(getInOrDefault(mockObject, mockEmptySubProperty, mockDefault)).toEqual(mockDefault)
  expect(getInOrDefault(mockObject, mockValidSubProperty, mockDefault)).toEqual(mockValue)
  expect(getInOrDefault(mockEmptyObject, mockValidSubProperty, mockDefault)).toEqual(mockDefault)
})

test('immutableToJS will convert an immutable object to a standard JSON if it is not empty, otherwise it returns undefined', () => {
  const fromJS = require('immutable').fromJS
  const mockObject = { hasProperties: 'mockObject' }
  const mockImmutableObject = fromJS(mockObject)
  const mockEmptyObject = null
  const immutableToJS = require('../index').immutableToJS
  expect(immutableToJS(mockImmutableObject)).toEqual(mockObject)
  expect(immutableToJS(mockEmptyObject)).toBeUndefined()
})

test('standardCallbackHandler calls the error callback if err is not empty, otherwise it calls the success callback', (done) => {
  const mockErr = { hasProperties: 'mockErr' }
  const mockData = { hasProperties: 'mockData' }
  const mockErrorCallback = (err) => {
    expect(err).toEqual(mockErr)
    done()
  }
  const mockSuccessCallback = (data) => {
    throw new Error('Not supposed to call success callback when err is not empty')
  }
  const standardCallbackHandler = require('../index').standardCallbackHandler
  standardCallbackHandler(mockErr, mockData, mockErrorCallback, mockSuccessCallback)
})

test('standardCallbackHandler calls the success callback if err is empty', (done) => {
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
  const standardCallbackHandler = require('../index').standardCallbackHandler
  standardCallbackHandler(mockNullErr, mockData, mockErrorCallback, mockSuccessCallback)
})

test('findOneFunction ', () => {
  const mockHaystack = [ 'TEST1', 'TEST2', 'TEST3' ]
  const mockArray = ['TEST2']
  const mockMissArray = ['TEST4']
  const findOne = require('../index').findOne
  expect(findOne(mockHaystack, mockArray)).toBeTruthy()
  expect(findOne(mockHaystack, mockMissArray)).toBeFalsy()
})
