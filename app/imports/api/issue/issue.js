import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const Issues = new Mongo.Collection('Issues');

/** Create a schema to constrain the structure of documents associated with this collection. */
const IssueSchema = new SimpleSchema({
  name: String,
  description: String,
  owner: String,
  createdAt: Date,
  location: String,
  status: {
    type: String,
    allowedValues: ['Not Started', 'In Progress', 'Completed'],
    defaultValue: 'Not Started',
  },
  votes: {
    type: SimpleSchema.Integer,
    defaultValue: 0,
  }
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Issues.attachSchema(IssueSchema);

/** Make the collection and schema available to other code. */
export { Issues, IssueSchema };
