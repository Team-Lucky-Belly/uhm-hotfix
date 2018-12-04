import { Meteor } from 'meteor/meteor';
import { Comments } from '../../api/comment/comment.js';

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Comments', function publish() {
  if (this.userId) {
    return Comments.find({ });
  }
  return this.ready();
});
