// import { mochaInstance } from 'meteor/practicalmeteor:mocha-core'
import { mochaInstance } from './core/server'
import './lib/modules'
import './lib/collection'
import './server/methods'

const Nightmare = require('nightmare')
const debug = require('debug')('meteor-mocha:test:server')

Meteor.call("getOptions", function(err, res){
  console.log('getOPtions', res );
})


var serverTest = function (cb) {
  mochaInstance.reporter(Modules.mochaOptions.reporter)
  mochaInstance.grep(Modules.mochaOptions.grep)
  mochaInstance.options.invert = Modules.mochaOptions.grepInvert

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

  // process.on('exit', () => {
  //   if (nightmare) {
  //     nightmare.end();
  //   }
  // });//

  nightmare
  .on('console', function (type, msg) {
    console.log(msg)//
  })
  .on('did-finish-load', function () {
    debug('page loaded')
  })
  .goto('http://localhost:3000')
  .wait(function () {
    return window.testsDone
  })
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
    debug('nightmare error:', error)
  })
}

// Before Meteor calls the `start` function, app tests will be parsed and loaded by Mocha
function start () {
  RunnerOptions.remove({})

  var state = { type: 'mocha' }
  state.options = {
    grep : process.env.MOCHA_GREP,
    grepInvert: grepInvert,
    reporter: process.env.MOCHA_REPORTER || 'tap',
  }
  RunnerOptions.insert(state)
  console.log('RunnerOptions server', RunnerOptions.find().fetch() );
//
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
