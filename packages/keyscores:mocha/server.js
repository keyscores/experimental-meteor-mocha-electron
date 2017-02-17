// import { mochaInstance } from 'meteor/practicalmeteor:mocha-core'
import { mochaInstance } from './core/server'

const Nightmare = require('nightmare')
const debug = require('debug')('meteor-mocha:test:server')

mochaInstance.reporter('tap')
mochaInstance.grep('Server')
mochaInstance.invert = true //('Server')



var serverTest = function (cb) {
  console.log('Server Tests Running')

  mochaInstance.run(function (failureCount) {
    var serverTestState = { failing: failureCount, passing: true }
    if (failureCount > 0) {
      serverTestState.passing = false
    }
    cb(serverTestState)
  })
}

var clientTest = function (cb) {
  console.log('Client tests running')
  var nightmare = Nightmare({ show: false })

  nightmare
  .on('console', function (type, msg) {
    console.log(msg)
  })
  .on('did-finish-load', function () {
    debug('page loaded')
  })
  .goto('http://localhost:3000')
  .evaluate(function () {
    //  client context
    //  mocha.run() // could call the client mocha from here
    var clientTestState = JSON.parse(window.localStorage.testState)
    if (clientTestState.failing && clientTestState.failing > 0) {
      // console.log('evaluate - Tests failing')
      clientTestState.passing = false
    } else {
      // console.log('evaluate - Tests passing')
      clientTestState.passing = true
    }
    return clientTestState
  })
  .end()
  .then(function (result) {
    debug('nightmare result: ', result)
    cb(result)
    // process.send('in child process ' + result)
  })
  .catch(function (error) {
    console.error('error:', error)
  })
}

// Before Meteor calls the `start` function, app tests will be parsed and loaded by Mocha
function start () {
  // console.log('hello')
  clientTest(function (clientTestState) {
    if (clientTestState.passing) {
      console.log('Client Tests Passing')
    } else {
      console.log('Client Tests Failing')
    }
    serverTest(function (serverTestState) {
      if (serverTestState.passing) {
        console.log('Server Tests Passing')
      } else {
        console.log('Server Tests Failing')
      }

      process.stdout.write('\x1b[35m') // debuging why no color in stdout

      if (clientTestState.passing && serverTestState.passing) {
        console.log('PASS')
        // process.exit(0)
      } else {
        console.log('FAIL')

        // process.exit(1)
      }
    })
  })
}

export { start }
