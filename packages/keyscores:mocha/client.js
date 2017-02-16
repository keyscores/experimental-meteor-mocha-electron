import { mocha } from 'meteor/practicalmeteor:mocha-core'

mocha.setup({ reporter: 'spec' })

// Run the client tests. Meteor calls the `runTests` function exported by
// the driver package on the client.
function runTests () {
  console.log('client tests running')

  mocha.run((failures) => {
    console.log('failures', failures)
  })
}

export { runTests }
