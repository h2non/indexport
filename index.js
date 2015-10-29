var fs = require('fs')

module.exports = function indexport (dir) {
  if (typeof dir !== 'string') {
    throw new TypeError('first argument must be a string')
  }

  return fs.readdirSync(dir)
  .filter(function (file) { return /\.js$/i.test(file) })
  .filter(function (file) { return file !== 'index.js' })
  .reduce(function (hash, file) {
    hash[normalize(file)] = require(dir + '/' + file)
    return hash
  }, {})
}

function normalize (str) {
  return str.replace(/^([A-Z])|\s(\w)/g, function (match, p1, p2, offset) {
    return p2 ? p2.toUpperCase() : p1.toLowerCase()
  }).replace(/\.js$/, '')
}
