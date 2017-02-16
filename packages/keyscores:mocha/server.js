import { mochaInstance } from 'meteor/practicalmeteor:mocha-core'
const Nightmare = require('nightmare')
const debug = require('debug')('meteor-mocha:test:server')

mochaInstance.reporter('spec')

Meteor.methods({
  nightmareTest: function () {
    console.log('running nightmare test')
    var nightmare = Nightmare({ show: false })

    nightmare
    .on('console', function (type, msg) {
      console.log('client logs: ', msg)
    })
    .on('did-finish-load', function () {
      debug('page loaded')
    })
    .goto('http://localhost:3000')
    .evaluate(function () {
      //  client context
      //  mocha.run() // could call the client mocha from here
      return document.location.href
    })
    .end()
    .then(function (result) {
      debug('success: ', result)
      // process.send('in child process ' + result)
    })
    .catch(function (error) {
      console.error('error:', error)
    })
  }
})

// Before Meteor calls the `start` function, app tests will be parsed and loaded by Mocha
function start () {
  // console.log('hello')
  Meteor.call('nightmareTest')
  // server tests
  mochaInstance.run()
}

export { start }
