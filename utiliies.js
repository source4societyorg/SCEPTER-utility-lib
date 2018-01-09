const utilities = {
  isEmpty: (value) => (typeof value === 'undefined' || value === null || value === '' || value.length === 0 || value === {} || value === 'NaN')
}

module.exports = utilities
