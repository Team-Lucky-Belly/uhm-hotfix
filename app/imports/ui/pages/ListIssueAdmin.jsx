import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Table, Container, Loader, Header } from 'semantic-ui-react';
import IssueRow from '/imports/ui/components/IssueRow';
import { Issues } from '/imports/api/issue/issue'
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListIssue extends React.Component {
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {

    return (
        <Container>
          <Header as="h2" textAlign="center">List Issue</Header>
          <Table celled selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Issue</Table.HeaderCell>
              <Table.HeaderCell>Created At</Table.HeaderCell>
              <Table.HeaderCell>Created By</Table.HeaderCell>
              <Table.HeaderCell>Location</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Votes</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.issues.map((issue) => <IssueRow key={issue._id} issue={issue}/>)}
          </Table.Body>
        </Table>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ListIssue.propTypes = {
  issues: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('IssuesAdmin');
  return {
    issues: Issues.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ListIssue);
