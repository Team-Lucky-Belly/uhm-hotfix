import React from 'react';
import { Item, Segment, Icon, Grid, Label, Button} from 'semantic-ui-react';
import { Issues, IssueSchema } from '/imports/api/issue/issue';

import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Issue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      upvotePressed: false,
      downvotePressed: false,
    };

    this.onUpVote = this.onUpVote.bind(this);
    this.onDownVote = this.onDownVote.bind(this);
  }

  onUpVote() {
    let votes;
    !this.state.upvotePressed ? votes = this.props.issue.votes + 1 : votes = this.props.issue.votes - 1;
    Issues.update(this.props.issue._id, { $set: { votes } });
    this.setState((state) => {
      return { upvotePressed: !state.upvotePressed,  }
    });
  }

  onDownVote() {
    let votes;
    this.state.downvotePressed ? votes = this.props.issue.votes + 1 : votes = this.props.issue.votes - 1;
    Issues.update(this.props.issue._id, {$set: {votes } });
    this.setState((state) => {
      return { downvotePressed: !state.downvotePressed }
    });
  }

  render() {

    let statusStyle;
    let upvoteColor;
    let downvoteColor;

    if(this.props.issue.status === 'Not Started') {
      statusStyle = 'red'
    } else if (this.props.issue.status === 'In Progress') {
      statusStyle = 'blue'
    } else if (this.props.issue.status === 'Completed') {
      statusStyle = 'green'
    }

    if(this.state.upvotePressed) {
     upvoteColor = 'orange';
    } else {
      upvoteColor = 'black';
    }

    if(this.state.downvotePressed) {
      downvoteColor = 'blue';
    } else {
      downvoteColor = 'black';
    }

    return (

        <Segment vertical>
          <div style={{paddingBottom: '5px'}}>
          <Grid>
            <Grid.Column width={1} textAlign='center'>
              <Button icon className='upvoteBtn' onClick={this.onUpVote}><Icon size='large' color={upvoteColor} name='angle up'/></Button>
              <p style={{ margin: '0px'}}>{this.props.issue.votes}</p>
              <Button icon className='downvoteBtn' onClick={this.onDownVote}><Icon size='large' color={downvoteColor} name='angle down' /></Button>

            </Grid.Column>
            <Grid.Column width={15}>
            <Item>
            <Item.Content>
              <Item.Header as='h4'>{this.props.issue.name}</Item.Header>
              <Item.Description>{this.props.issue.description}</Item.Description>
              <Item.Meta style={{ marginTop: '5px'}}>
                <Label as='a' color={statusStyle} style={{float: 'left' }} size='tiny' className='status'>{this.props.issue.status}</Label>
                <Label as='a' style={{float: 'left' }} size='tiny' className='status'><Icon name='comments'/>Comments</Label>
                <Label as='a' style={{float: 'left' }} size='tiny' className='status'><Icon name='share'/>Share</Label>
                <Label as='a' style={{float: 'left' }} size='tiny' className='status'><Icon name='favorite'/>Track</Label>
                <Label as='a' style={{float: 'left' }} size='tiny' className='status'><Icon name='flag'/>Report</Label>
              </Item.Meta>
              <Item.Extra><span  style={{float: 'right', color: 'grey' }} className='createdAt'>{this.props.issue.createdAt.toLocaleString()}</span></Item.Extra>
            </Item.Content>

            </Item>
            </Grid.Column>
          </Grid>
          </div>
        </Segment>

    );
  }
}

/** Require a document to be passed to this component. */
Issue.propTypes = {
  issue: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Issue);
