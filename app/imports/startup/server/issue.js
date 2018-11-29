import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Issues } from '../../api/issue/issue.js';


/* we can use this later to populate issues with dummy data */

function addIssues(issue) {
  console.log(`  Adding: ${issue.name} (${issue.owner})`);
  Issues.insert(issue);
}


if (Issues.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(issue => addIssues(issue));
  }
}



/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Issues', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Issues.find({});
  }
  return this.ready();
});

/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
Meteor.publish('IssuesAdmin', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Issues.find();
  }
  return this.ready();
});


