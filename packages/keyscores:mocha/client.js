import { mocha } from 'meteor/practicalmeteor:mocha-core';
mocha.setup({ reporter: 'spec' });

// Run the client tests. Meteor calls the `runTests` function exported by
// the driver package on the client.
function runTests() {
  mocha.run()
}

export { runTests };
