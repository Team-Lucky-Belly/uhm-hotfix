import React from 'react';
import { Divider, Feed, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';



/** contentRenders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class IssueRow extends React.Component {

  render() {

    const issue = this.props.issue;

    return (
        <div>
        <Feed.Event>
          <Header>{issue.name}</Header>
          <Feed.Content>
            <Feed.Summary date={issue.createdAt.toLocaleString()} user={issue.owner} />
            <Feed.Extra text>
              <br/>
              {issue.description}
            </Feed.Extra>
          </Feed.Content>
        </Feed.Event>
          <Divider/>
        </div>
    );
  }
}

/** Require a document to be passed to this component. */
IssueRow.propTypes = {
  issue: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(IssueRow);
