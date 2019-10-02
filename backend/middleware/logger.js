const moment = require('moment')

// FIXME make logger avtive in dev environment

module.exports = function (options) {
  return function (req, res, next) {
    console.log(`${moment().format("D/M/YYYY, h:mm:ss")} ${req.method} ${req.protocol}://${req.hostname}${req.originalUrl} `)
    next()
  }
}