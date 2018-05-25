import { fromJS } from 'immutable';
import {
  isEmpty,
  isNotEmpty,
  getRandomInt,
  valueOrDefault,
  ifTrueElseDefault,
  notEmptyAt,
  emptyAt,
  ucFirst, validateApiResult,
  keyGenerator,
  immutableToJS,
  getInOrDefault,
  standardCallbackHandler,
  findOne,
  jsonParseOrDefault,
  ssValueOrDefault,
  ssIfTrueElseDefault,
  eitherOf,
  ssEitherOf,
  conjunctionOf,
  ssConjunctionOf,
  trueIfEqual,
  nullOp,
} from '../src/index';

test('isEmpty is true when the value is empty string, empty object, empty array, undefined, null or NaN but not when false, function or instantiated class. isNotEmpty is the opposite', () => {
  const mockEmptyString = '';
  const mockEmptyObject = {};
  const mockEmptyArray = [];
  const mockNull = null;
  const mockNaN = Number('notanumber');
  const mockUndefined = undefined;
  const mockString = 'mockString';
  const mockObject = { hasProperties: 'mockObject' };
  const MockClass = class MockClassObject { constructor() { return 'mockClass'; } };
  const MockClassInsantiated = new MockClass();
  const mockArray = ['mockArray'];
  const mockZero = 0;
  const mockNumber = 1;
  const mockFunction = () => ({});
  expect(isEmpty(mockEmptyString)).toBeTruthy();
  expect(isEmpty(mockEmptyObject)).toBeTruthy();
  expect(isEmpty(mockEmptyArray)).toBeTruthy();
  expect(isEmpty(mockUndefined)).toBeTruthy();
  expect(isEmpty(mockNull)).toBeTruthy();
  expect(isEmpty(mockNaN)).toBeTruthy();
  expect(isEmpty(false)).toBeFalsy();
  expect(isEmpty(true)).toBeFalsy();
  expect(isEmpty(mockString)).toBeFalsy();
  expect(isEmpty(mockObject)).toBeFalsy();
  expect(isEmpty(MockClass)).toBeFalsy();
  expect(isEmpty(MockClassInsantiated)).toBeFalsy();
  expect(isEmpty(mockArray)).toBeFalsy();
  expect(isEmpty(mockNumber)).toBeFalsy();
  expect(isEmpty(mockZero)).toBeFalsy();
  expect(isEmpty(mockFunction)).toBeFalsy();
  expect(isNotEmpty(mockEmptyString)).toBeFalsy();
  expect(isNotEmpty(mockEmptyObject)).toBeFalsy();
  expect(isNotEmpty(mockEmptyArray)).toBeFalsy();
  expect(isNotEmpty(mockUndefined)).toBeFalsy();
  expect(isNotEmpty(mockNull)).toBeFalsy();
  expect(isNotEmpty(mockNaN)).toBeFalsy();
  expect(isNotEmpty(false)).toBeTruthy();
  expect(isNotEmpty(true)).toBeTruthy();
  expect(isNotEmpty(mockString)).toBeTruthy();
  expect(isNotEmpty(mockObject)).toBeTruthy();
  expect(isNotEmpty(MockClass)).toBeTruthy();
  expect(isNotEmpty(MockClassInsantiated)).toBeTruthy();
  expect(isNotEmpty(mockArray)).toBeTruthy();
  expect(isNotEmpty(mockNumber)).toBeTruthy();
  expect(isNotEmpty(mockZero)).toBeTruthy();
  expect(isNotEmpty(mockFunction)).toBeTruthy();
});

test('getRandomInt selects a random integer, floors the result, and scales it to be within min inclusive, max exclusive', () => {
  const mockMin = 1;
  const mockMax = 100;
  const mockRandomResult = 5;
  const mockFloor = (value) => {
    if (value !== mockMax && value !== mockRandomResult * (mockMax - mockMin)) {
      throw new Error('Invalid parameter in floor');
    }
    if (value === mockMax) {
      return mockMax;
    }
    return mockRandomResult * (mockMax - mockMin);
  };
  const mockCeil = (value) => {
    expect(value).toEqual(mockMin);
    return mockMin;
  };
  const mockRandom = () => mockRandomResult;
  const mockMath = {
    floor: mockFloor,
    ceil: mockCeil,
    random: mockRandom,
  };
  expect(getRandomInt(mockMin, mockMax, mockMath)).toEqual((mockRandomResult * (mockMax - mockMin)) + mockMin);
});

test('valueOrDefault will return the variables value if it exists, or else return the default', () => {
  const mockEmptyValue = '';
  const mockDefaultValue = 'mockdefaultvalue';
  const mockValue = 'mockValue';
  expect(valueOrDefault(mockEmptyValue, mockDefaultValue)).toEqual(mockDefaultValue);
  expect(valueOrDefault(mockValue, mockDefaultValue)).toEqual(mockValue);
});

test('ssValueOrDefault will return the variables value if it exists, or else return the default, but both must be functions', () => {
  const mockEmptyValue = '';
  const mockDefaultValue = () => 'mockdefaultvalue';
  const mockValue = () => 'mockValue';
  expect(ssValueOrDefault(mockEmptyValue, mockDefaultValue)).toEqual(mockDefaultValue());
  expect(ssValueOrDefault(mockValue, mockDefaultValue)).toEqual(mockValue);
});

test('ifTrueElseDefault returns the second parameter if the first is true, and the third if not', () => {
  const mockValue = 'mockValue';
  const mockDefaultValue = 'mockDefaultValue';
  expect(ifTrueElseDefault(false, mockValue, mockDefaultValue)).toEqual(mockDefaultValue);
  expect(ifTrueElseDefault(true, mockValue, mockDefaultValue)).toEqual(mockValue);
});

test('ssIfTrueElseDefault returns the second parameter if the first is true, and the third if not, but the second and third must be a function', () => {
  const mockValue = () => 'mockValue';
  const mockDefaultValue = () => 'mockDefaultValue';
  expect(ssIfTrueElseDefault(false, mockValue, mockDefaultValue)).toEqual(mockDefaultValue());
  expect(ssIfTrueElseDefault(true, mockValue, mockDefaultValue)).toEqual(mockValue());
});


test('notEmptyAt will return true if object is not empty at the nexted property point, false if it is. emptyAt will do the opposite', () => {
  const mockObject = {
    mockProperty1: {
      mockProperty2: {
        mockEmptyProperty: null,
        mockValidProperty: 'mockValidProperty',
      },
    },
  };

  expect(notEmptyAt(mockObject, ['mockProperty1', 'mockProperty2', 'mockEmptyProperty'])).toBeFalsy();
  expect(notEmptyAt(mockObject, ['mockProperty1', 'mockProperty2', 'mockValidProperty'])).toBeTruthy();
  expect(emptyAt(mockObject, ['mockProperty1', 'mockProperty2', 'mockEmptyProperty'])).toBeTruthy();
  expect(emptyAt(mockObject, ['mockProperty1', 'mockProperty2', 'mockValidProperty'])).toBeFalsy();
});

test('ucFirst will transform the first letter of a string to uppercase', () => {
  const mockLowercaseString = 'lowercase';
  const mockTitlecaseString = 'Lowercase';
  expect(ucFirst(mockLowercaseString)).toEqual(mockTitlecaseString);
});

test('validateApiResult will check if api result has a status of true and if not try to throw the error message.', () => {
  const mockResultStatusFalse = {
    status: false,
    error: 'mockError',
  };
  const mockResultStatusEmpty = {
    error: 'mockError',
  };
  const mockResultStatusInvalid = {
    status: 'mockInvalidStatus',
    error: 'mockError',
  };
  const mockValidResult = {
    status: true,
    result: { hasProperties: 'mockResult' },
  };
  const mockValidResultAsString = JSON.stringify(mockValidResult);
  expect(() => validateApiResult(mockResultStatusFalse)).toThrow();
  expect(() => validateApiResult(mockResultStatusEmpty)).toThrow();
  expect(() => validateApiResult(mockResultStatusInvalid)).toThrow();
  expect(validateApiResult(mockValidResultAsString)).toEqual(mockValidResult);
});

test('keyGenerator will generate a random string of the specified length', () => {
  const length = getRandomInt(1, 10);
  const keyResult = keyGenerator(length);
  expect(keyResult).toHaveLength(length);
  const secondKeyResult = keyGenerator(length);
  expect(keyResult !== secondKeyResult).toBeTruthy();
  const secondLength = getRandomInt(11, 15);
  const thirdKeyResult = keyGenerator(secondLength);
  expect(thirdKeyResult).toHaveLength(secondLength);
  expect(thirdKeyResult !== keyResult).toBeTruthy();
});

test('getInOrDefault will get the value of the property in the given depth or return the default if empty', () => {
  const mockDefault = 'mockDefault';
  const mockValue = 'mockValue';
  const mockObject = {
    subProperty: {
      validSubProperty: mockValue,
      emptySubProperty: null,
    },
  };
  const mockEmptyObject = null;
  const mockEmptySubProperty = ['subProperty', 'emptySubProperty'];
  const mockValidSubProperty = ['subProperty', 'validSubProperty'];
  expect(getInOrDefault(mockObject, mockEmptySubProperty, mockDefault)).toEqual(mockDefault);
  expect(getInOrDefault(mockObject, mockValidSubProperty, mockDefault)).toEqual(mockValue);
  expect(getInOrDefault(mockEmptyObject, mockValidSubProperty, mockDefault)).toEqual(mockDefault);
});

test('immutableToJS will convert an immutable object to a standard JSON if it is not empty, otherwise it returns undefined', () => {
  const mockObject = { hasProperties: 'mockObject' };
  const mockImmutableObject = fromJS(mockObject);
  const mockEmptyObject = null;
  expect(immutableToJS(mockImmutableObject)).toEqual(mockObject);
  expect(immutableToJS(mockEmptyObject)).toBeUndefined();
});

test('standardCallbackHandler calls the error callback if err is not empty, otherwise it calls the success callback', (done) => {
  const mockErr = { hasProperties: 'mockErr' };
  const mockData = { hasProperties: 'mockData' };
  const mockErrorCallback = (err) => {
    expect(err).toEqual(mockErr);
    done();
  };
  const mockSuccessCallback = () => {
    throw new Error('Not supposed to call success callback when err is not empty');
  };
  standardCallbackHandler(mockErr, mockData, mockErrorCallback, mockSuccessCallback);
});

test('standardCallbackHandler calls the success callback if err is empty', (done) => {
  const mockNullErr = null;
  const mockData = { hasProperties: 'mockData' };
  const mockErrorCallback = (err) => {
    expect(err).toBeNull();
    throw new Error('Not supposed to call error callback when err is empty');
  };
  const mockSuccessCallback = (data) => {
    expect(data).toEqual(mockData);
    done();
  };
  standardCallbackHandler(mockNullErr, mockData, mockErrorCallback, mockSuccessCallback);
});

test('findOneFunction ', () => {
  const mockHaystack = ['TEST1', 'TEST2', 'TEST3'];
  const mockArray = ['TEST2'];
  const mockMissArray = ['TEST4'];
  expect(findOne(mockHaystack, mockArray)).toBeTruthy();
  expect(findOne(mockHaystack, mockMissArray)).toBeFalsy();
});

test('jsonParseOrDefault will return the JSON.Parse of a value if it is not empty, otherwise it returns the default value provided', () => {
  const mockJsonObject = { hasProperties: 'mockJsonObject' };
  const mockJsonString = JSON.stringify(mockJsonObject);
  const mockEmptyString = null;
  const mockDefault = 'mockDefault';
  expect(jsonParseOrDefault(mockJsonString, mockDefault)).toEqual(mockJsonObject);
  expect(jsonParseOrDefault(mockEmptyString, mockDefault)).toEqual(mockDefault);
});

test('eitherOf will return true if one or the other value is true, otherwise it will return false', () => {
  const trueValue1 = true;
  const trueValue2 = true;
  const falseValue1 = false;
  const falseValue2 = false;
  expect(eitherOf(trueValue1, trueValue2)).toBeTruthy();
  expect(eitherOf(trueValue1, falseValue2)).toBeTruthy();
  expect(eitherOf(falseValue1, trueValue2)).toBeTruthy();
  expect(eitherOf(falseValue1, falseValue2)).toBeFalsy();
});

test('ssEitherOf will return true if one or the other value is true, otherwise it will return false, but second argument must be function', () => {
  const trueValue1 = true;
  const trueValue2 = () => true;
  const falseValue1 = false;
  const falseValue2 = () => false;
  expect(ssEitherOf(trueValue1, trueValue2)).toBeTruthy();
  expect(ssEitherOf(trueValue1, falseValue2)).toBeTruthy();
  expect(ssEitherOf(falseValue1, trueValue2)).toBeTruthy();
  expect(ssEitherOf(falseValue1, falseValue2)).toBeFalsy();
});

test('conjunctionOf will return true if both values are true, otherwise will return false', () => {
  const trueValue1 = true;
  const trueValue2 = true;
  const falseValue1 = false;
  const falseValue2 = false;
  expect(conjunctionOf(trueValue1, trueValue2)).toBeTruthy();
  expect(conjunctionOf(trueValue1, falseValue2)).toBeFalsy();
  expect(conjunctionOf(falseValue1, falseValue2)).toBeFalsy();
  expect(conjunctionOf(falseValue1, trueValue2)).toBeFalsy();
});

test('ssConjunctionOf will return true if both values are true, otherwise will return false but the second value must be a function', () => {
  const trueValue1 = true;
  const trueValue2 = () => true;
  const falseValue1 = false;
  const falseValue2 = () => false;
  expect(ssConjunctionOf(trueValue1, trueValue2)).toBeTruthy();
  expect(ssConjunctionOf(trueValue1, falseValue2)).toBeFalsy();
  expect(ssConjunctionOf(falseValue1, falseValue2)).toBeFalsy();
  expect(ssConjunctionOf(falseValue1, trueValue2)).toBeFalsy();
});

test('trueIfEqual will return true if value1 === value2 or else false', () => {
  const mockValue1 = 1;
  const mockValue2 = 1;
  const mockValue3 = 2;
  expect(trueIfEqual(mockValue1, mockValue2)).toBeTruthy();
  expect(trueIfEqual(mockValue1, mockValue3)).toBeFalsy();
});

test('nullOp returns null', () => {
  expect(nullOp()).toBeNull();
});
