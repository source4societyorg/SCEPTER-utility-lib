
export const isEmpty = (value) =>
    typeof value === 'undefined' ||
    value === null ||
    value === '' ||
    (typeof value === 'object' && Object.getOwnPropertyNames(value).length < 1 && value.constructor.name === 'Object') ||
    Number.isNaN(value) ||
    (value.length === 0 && typeof value !== 'function');

export const isNotEmpty = (value) => !isEmpty(value);
export const getRandomInt = (injectedMin, injectedMax, injectedMath) => {
  const Mathematics = valueOrDefault(injectedMath, Math);
  let min = injectedMin;
  let max = injectedMax;
  min = Mathematics.ceil(min); max = Mathematics.floor(max); return Mathematics.floor(Mathematics.random() * (max - min)) + min;
};
export const valueOrDefault = (value, defaultValue) => isNotEmpty(value) ? value : defaultValue;
export const ssValueOrDefault = (value, defaultValue) => isNotEmpty(value) ? value : defaultValue();
export const ifTrueElseDefault = (statement, value, defaultValue) => statement ? valueOrDefault(value, defaultValue) : defaultValue;
export const ssIfTrueElseDefault = (statement, value, defaultValue) => statement ? ssValueOrDefault(value(), defaultValue) : defaultValue();
export const notEmptyAt = (targetObject, subProperties) => (isNotEmpty(getInOrDefault(targetObject, subProperties)));
export const emptyAt = (targetObject, subProperties) => !notEmptyAt(targetObject, subProperties);
export const ucFirst = (string) => (string.charAt(0).toUpperCase() + string.slice(1));
export const validateApiResult = (injectedResult) => {
  let result = injectedResult;
  if (typeof result === 'string') {
    result = JSON.parse(result);
  }

  if (emptyAt(result, ['status']) || result.status !== true) {
    const error = getInOrDefault(result, ['errors', 'message'], getInOrDefault(result, ['errorMessage'], getInOrDefault(result, ['message'], getInOrDefault(result, ['errors'], result))));
    throw new Error(error);
  }
  return result;
};
export const keyGenerator = (length) => {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let retVal = '';
  for (let i = 0, n = charset.length; i < length; i += 1) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
};

export const getInOrDefault = (targetObject, subProperties, defaultValue) => {
  let value;
  if (isEmpty(targetObject)) {
    return defaultValue;
  }

  value = targetObject;
  for (let index = 0; index < subProperties.length; index += 1) {
    if (isEmpty(value[subProperties[index]])) {
      return defaultValue;
    }
    value = value[subProperties[index]];
  }
  return valueOrDefault(value, defaultValue);
};

export const immutableToJS = (immutableObject) => {
  let mutableObject;
  if (isNotEmpty(immutableObject)) {
    mutableObject = immutableObject.toJS();
  }
  return mutableObject;
};

export const standardCallbackHandler = (err, data, onErrorCallback, onSuccessCallback) => {
  if (isEmpty(err)) {
    onSuccessCallback(data);
  } else {
    onErrorCallback(err);
  }
};

export const findOne = (haystack, array) => array.some((v) => haystack.indexOf(v) >= 0);
export const jsonParseOrDefault = (value, defaultValue) => isNotEmpty(value) ? JSON.parse(value) : defaultValue;
export const eitherOf = (value1, value2) => value1 || value2;
export const ssEitherOf = (value1, value2) => value1 || value2();
export const conjunctionOf = (value1, value2) => value1 && value2;
export const ssConjunctionOf = (value1, value2) => value1 && value2();
export const trueIfEqual = (value1, value2) => value1 === value2;
export const nullOp = () => null;
