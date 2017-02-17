import { mochaInstance } from 'meteor/practicalmeteor:mocha-core'
const Nightmare = require('nightmare')
const debug = require('debug')('meteor-mocha:test:server')

mochaInstance.reporter('tap')


var serverTest = function (cb) {
  console.log('Server Tests Running')

  mochaInstance.run(function (failureCount) {
    var serverTestState = { failing: failureCount, passing: true  }
    if ( failureCount > 0 ){
      serverTestState.passing = false
    }
    cb(serverTestState)
  })
}

var nightmareTest = function (cb) {
  console.log('Client tests running')
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
    // console.log( JSON.stringify(window.localStorage) );
    var clientTestState = JSON.parse(window.localStorage.testState)
    if (clientTestState.failing && clientTestState.failing > 0) {
      console.log('evaluate - Tests failing')
      clientTestState.passing = false
    } else {
      console.log('evaluate - Tests passing')
      clientTestState.passing = true
    }
    return clientTestState//document//
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
  var testState = []
  // console.log('hello')
  nightmareTest(function (clientTestState) {
    testState.push(clientTestState.passing)
    if (clientTestState.passing) {
      console.log('Client Tests Passing')
    } else {
      console.log('Client Tests Failing')
    }
    serverTest(function (serverTestState) {
      testState.push(serverTestState.passing)
      if (clientTestState.passing) {
        console.log('Client Tests Passing')
      } else {
        console.log('Client Tests Failing')
      }

      if (testState.indexOf(false) === -1) {
        console.log('PASS')
        // process.exit(0)
      } else {
        console.log('FAIL')
        // process.exit(1)
      }
    })
  })
  // server tests
}

export { start }
