import { mocha } from 'meteor/practicalmeteor:mocha-core'

mocha.setup({ reporter: 'tap' })

// mochaLogs = {}
// Run the client tests. Meteor calls the `runTests` function exported by
// the driver package on the client.
function runTests () {
  console.log('client tests running')

  mocha.run((failCount) => {
    var testStateTemp = { failing: failCount }
    window.localStorage.testState = JSON.stringify(testStateTemp)
  })
}

export { runTests }
