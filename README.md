# SCEPTER-utility-lib
[![scepter-logo](http://res.cloudinary.com/source-4-society/image/upload/v1514622047/scepter_hzpcqt.png)](https://github.com/source4societyorg/SCEPTER-core)

[![js-standard-style](https://cdn.rawgit.com/standard/standard/master/badge.svg)](http://standardjs.com)

[![Build Status](https://travis-ci.org/source4societyorg/SCEPTER-utility-lib.svg?branch=master)](https://travis-ci.org/source4societyorg/SCEPTER-utility-lib.svg?branch=master)

[![codecov](https://codecov.io/gh/source4societyorg/SCEPTER-utility-lib/branch/master/graph/badge.svg)](https://codecov.io/gh/source4societyorg/SCEPTER-utility-lib)

A library of useful javascript utility functions

## Usage

Add this library to your project via `npm` or `yarn` with the command:

    npm install -S @source4society/scepter-utility-lib
or
    yarn add @source4society/scepter-utility-lib

Then in your code, you can reference the individual utility functions. For example, to export the `isEmpty` function:

    const isEmpty = require('@source4society/scepter-utility-lib').isEmpty

## Functions

### isEmpty / isNotEmpty

use this to determine if a given variable is "empty". "Emptiness" is defined as an undefined value, null, NaN, {}, [], or ''. A value such as boolean `false` is not counted as empty. `isNotEmpty` is simply the `not` of `isEmpty`

### getRandomInt

Specify a `min` (inclusive) and `max` (exclusive) to get back a random number based on the platform (or injected) `Math.random()` function between min/max

### valueOrDefault

If the value is empty, return default, otherwise return the value. Very useful for avoiding ternary's for better line coverage when setting default values

### ifTrueElseDefault

If the first argument evaluates to true, return the second argument, otherwise return the third. Very useful for avoiding branching logic but beware - you cannot short circuit the arguments like you can with a normal ternary

### emptyAt / notEmptyAt

Like `isEmpty` and `isNotEmpty` but will traverse an objects properties to see if the property chain exists/has an empty value. The first argument is the object, the second argument is an array of subproperties to search in the order of nesting.

### ucFirst

Useful utility to transform a word to title case (first letter becomes uppercase). Pass in a string and get back a string

### validateApiResult

SCEPTER API results always return with a `status: true` property when successful, and `status: false` when something goes wrong. This will attempt to throw the error in the response if status is anything other than true. It will also parse from a string if the given result is in string form.

### keyGenerator

Generates a random character string of `length` length, useful for creating API keys or jwt encoding keys.

### getInOrDefault

This is useful for getting values from nester properties within objects, and returning a default value if the property does not exist or is empty. The first argument is the object to search, the second is an array of properties in nesting order, the third is the default value to return if the property does not exist or is empty

### immutableToJS

Convert an immutable object to its JS form if the object is not empty, otherwise return undefined. Simply takes the immutableJS object as an argument

### standardCallback

Use this to split the results of a standard callback into two separate function calls. The first argument is the error object, the second is the success (data) object. If the error object is not empty, then the error callback is called with the error data, otherwise the success callback is called with the success data
