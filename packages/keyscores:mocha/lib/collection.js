import { Mongo } from 'meteor/mongo'

RunnerOptions = new Mongo.Collection("runnerOptions");

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('runnerOptions', function tasksPublication() {
    return RunnerOptions.find();
  });
}

export { RunnerOptions }
