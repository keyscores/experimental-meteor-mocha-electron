/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

// import { Meteor } from 'meteor/meteor';
// import StubCollections from 'meteor/hwillson:stub-collections';

import { Meteor } from 'meteor/meteor';
import { Factory } from 'meteor/dburles:factory';
import { Random } from 'meteor/random';
import { chai } from 'meteor/practicalmeteor:chai';
import StubCollections from 'meteor/hwillson:stub-collections';
import { Template } from 'meteor/templating';
import { _ } from 'meteor/underscore';
import { $ } from 'meteor/jquery';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { sinon } from 'meteor/practicalmeteor:sinon';


describe('Client Test', function () {
  // const listId = Random.id();
  //
  // beforeEach(function () {
  //   StubCollections.stub([Todos, Lists]);
  //   Template.registerHelper('_', key => key);
  //   sinon.stub(FlowRouter, 'getParam', () => listId);
  //   sinon.stub(Meteor, 'subscribe', () => ({
  //     subscriptionId: 0,
  //     ready: () => true,
  //   }));
  // });
  //
  // afterEach(function () {
  //   StubCollections.restore();
  //   Template.deregisterHelper('_');
  //   FlowRouter.getParam.restore();
  //   Meteor.subscribe.restore();
  // });

  it('renders correctly with simple data', function () {
    return 1 === 1
  });
});
