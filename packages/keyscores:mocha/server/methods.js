import { Meteor } from 'meteor/meteor';
import '../lib/modules'

Meteor.methods({
  'getOptions'() {//
    console.log('getoptions called');
    return Modules.mochaOptions
  },
});
