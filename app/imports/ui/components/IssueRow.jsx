import React from 'react';
import { Table, Link } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class IssueRow extends React.Component {
  render() {
    return (
        <Table.Row>
          <Table.Cell>
            {this.props.issue.name}
          </Table.Cell>
          <Table.Cell>{this.props.issue.createdAt.toLocaleDateString()}</Table.Cell>
          <Table.Cell>{this.props.issue.owner}</Table.Cell>
          <Table.Cell>{this.props.issue.location}</Table.Cell>
          <Table.Cell>{this.props.issue.status}</Table.Cell>
          <Table.Cell>{this.props.issue.votes}</Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
IssueRow.propTypes = {
  issue: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default IssueRow;
