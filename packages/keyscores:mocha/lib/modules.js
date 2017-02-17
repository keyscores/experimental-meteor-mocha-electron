Modules = {}

// Modules.runnerOptions = {
//   client : TESTtrue,
//   server : true,
//
//
// }
var grepInvertgrepInvert
if ( process.env.MOCHA_INVERT == 'false' || 0 ){
  grepInvert = false
}else{
  grepInvert = true
}

Modules.mochaOptions = {
  grep : process.env.MOCHA_GREP,
  grepInvert: grepInvert,
  reporter: process.env.MOCHA_REPORTER || 'tap',
}

export { Modules };
