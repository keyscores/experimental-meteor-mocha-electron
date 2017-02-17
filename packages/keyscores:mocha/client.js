import { mocha } from './core/client'
import { Modules }  from './lib/modules'
import { RunnerOptions } from './lib/collection';

// Run the client tests. Meteor calls the `runTests` function exported by
// the driver package on the client.
// mocha.setup({
//   reporter: 'spec' //Modules.mochaOptions.reporter
// })

function mochaRun(){
  mocha.setup({
    reporter: 'spec' //Modules.mochaOptions.reporter
  })

  mocha.run((failCount) => {
    var testStateTemp = { failing: failCount }
    window.localStorage.testState = JSON.stringify(testStateTemp)
    // window.testsDone

  })

}
function runTests () {
  console.log('client tests running')

  Meteor.call("getOptions", function(error, result){
    if(error){
      console.log("error", error);
    }
    if(result){
      console.log('result', result );
      mochaRun()
    }
  });

  // mochaRun()




}

export { runTests }
