import React from 'react';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class IssueAdmin extends React.Component {
  render() {
    return (
        <Card>
          <Card.Content>
            <Card.Header>{this.props.issue.name}</Card.Header>
            <Card.Meta>{this.props.issue.createdAt}</Card.Meta>
            <Card.Description>
              {this.props.issue.description}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Card.Description>
              {this.props.issue.status}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            {this.props.issue.owner}
          </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
IssueAdmin.propTypes = {
  issue: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(IssueAdmin);
