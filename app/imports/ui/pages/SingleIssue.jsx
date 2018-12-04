import React from 'react';
import { Issues, IssueSchema } from '/imports/api/issue/issue';
import { Comments, CommentSchema} from '../../api/comment/comment';
import { Grid, Segment, Header, Loader, Container, Form, Feed, TextArea, Button} from 'semantic-ui-react';
import SingleIssueContent from '/imports/ui/components/SingleIssueContent';
import CommentForm from '/imports/ui/components/CommentForm';
import Comment from '/imports/ui/components/Comment';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { sortBy } from 'underscore';


class SingleIssue extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }
  renderPage() {
    return (
          <Container>
            <br/>
          <Grid container centered>
            <div className="two column centered row">
            <Grid.Column>
              <Feed size='large'>
                <SingleIssueContent issue={this.props.issue}/>
              </Feed>
              <CommentForm issueId={this.props.issue._id} owner = {this.props.issue.owner}/>
              {this.props.comments.map((comment) => <Comment key={comment._id} comment={comment}/>)}
            </Grid.Column>
            </div>
          </Grid>
          <div style={{ height: '50px' }}/>
          </Container>
    );
  }
}

/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
SingleIssue.propTypes = {
  issue: PropTypes.object,
  comments: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const issuesSub = Meteor.subscribe('Issues');
  const commentsSub = Meteor.subscribe('Comments');
  const comments = sortBy(Comments.find({issueId : documentId}).fetch(), 'createdAt').reverse();
  return {
    issue: Issues.findOne(documentId),
    comments : comments,
    ready: (issuesSub.ready() && commentsSub.ready()),
  };
})(SingleIssue);
