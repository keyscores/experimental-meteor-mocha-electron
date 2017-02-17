Package.describe({
  name: 'keyscores:mocha-browser',
  summary: 'Run all tests with electron and nightmare',
  git: 'https://github.com/keyscores/experimental-meteor-mocha-electron',
  version: '0.0.1',
  testOnly: true
})

// Npm.depends({
//   mocha: '3.2.0'
// });

Package.onUse(function (api) {
  api.versionsFrom('1.3')

  api.use([
    // 'practicalmeteor:mocha-core@1.0.0',
    'ecmascript'
  ])

  api.mainModule('client.js', 'client')
  api.mainModule('server.js', 'server')
})
