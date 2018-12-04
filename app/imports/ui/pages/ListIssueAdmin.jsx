import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Table, Container, Loader, Header } from 'semantic-ui-react';
import IssueRow from '/imports/ui/components/IssueRow';
import { Issues } from '/imports/api/issue/issue'
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { sortBy } from 'underscore';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListIssueAdmin extends React.Component {
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  constructor(props) {
    super(props);
    this.state = {issues : this.props.issues, currentColumn : "" };
    this.handleSort = this.handleSort.bind(this);
  }

  handleSort = sortKey => {
    const issues = (this.state.issues.length !== 0) ? this.state.issues : this.props.issues;
    const newIssues = sortBy(issues, sortKey);
    let newColumn = "";

    if(this.state.currentColumn === sortKey) {
      newIssues.reverse();
    } else {
      newColumn = sortKey;
    }

    this.setState({issues: newIssues, currentColumn : newColumn});
  };

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {

    const issues = (this.state.issues.length !== 0) ? this.state.issues : this.props.issues;
    console.log(issues);
    return (
        <Container>
          <Header as="h2" textAlign="center">List Issue</Header>
          <Table celled selectable sortable >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell onClick={() => this.handleSort('name')}>Issue</Table.HeaderCell>
              <Table.HeaderCell onClick={() => this.handleSort('createdAt')}>Created At</Table.HeaderCell>
              <Table.HeaderCell onClick={() => this.handleSort('owner')}>Created By</Table.HeaderCell>
              <Table.HeaderCell onClick={() => this.handleSort('location')}>Location</Table.HeaderCell>
              <Table.HeaderCell onClick={() => this.handleSort('status')}>Status</Table.HeaderCell>
              <Table.HeaderCell onClick={() => this.handleSort('votes')}>Votes</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {issues.map((issue) => <IssueRow key={issue._id} issue={issue}/>)}
          </Table.Body>
        </Table>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ListIssueAdmin.propTypes = {
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
})(ListIssueAdmin);
