import React from 'react';
import { Divider, Feed, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';



/** contentRenders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Comment extends React.Component {

  render() {

    const comment = this.props.comment;
    return (
        <div>
        <br/>
          <Feed.Event>
            <Feed.Content>
              <Feed.Summary date={comment.createdAt.toLocaleString()} user={comment.owner} />
              <Feed.Extra text>
                <br/>
                {comment.comment}
              </Feed.Extra>
            </Feed.Content>
          </Feed.Event>
          <Divider/>
        </div>
    );
  }
}

/** Require a document to be passed to this component. */
Comment.propTypes = {
  comment: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Comment);
