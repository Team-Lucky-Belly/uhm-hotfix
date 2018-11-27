import React from 'react';
import { Item, Segment, Icon, Grid, Label} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Issue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}

    this.onUpVote = this.onUpVote.bind(this);
    this.onDownVote = this.onDownVote.bind(this);
  }

  onUpVote() {
    this.props.issue.votes++;
  }

  onDownVote() {
    this.props.issue.votes--;
  }



  render() {

    let statusStyle;

    if(this.props.issue.status === 'Not Started') {
      statusStyle = 'red'
    } else if (this.props.issue.status === 'In Progress') {
      statusStyle = 'blue'
    } else if (this.props.issue.status === 'Completed') {
      statusStyle = 'green'
    }

    return (

        <Segment vertical>
          <div style={{paddingBottom: '5px'}}>
          <Grid>
            <Grid.Column width={1} textAlign='center'>
              <Icon name='angle up' onClick={this.onUpVote}/>
              <p style={{ margin: '0px'}}>{this.props.issue.votes}</p>
              <Icon name='angle down' onClick={this.onDownVote} />

            </Grid.Column>
            <Grid.Column width={15}>
            <Item>
            <Item.Content>
              <Item.Header as='h4'>{this.props.issue.name}</Item.Header>
              <Item.Description>{this.props.issue.description}</Item.Description>
              <Item.Meta style={{ marginTop: '5px'}}>
                <Label as='a' color={statusStyle} style={{float: 'left' }} size='tiny' className='status'>{this.props.issue.status}</Label>
                <Label as='a'color='white' style={{float: 'left' }} size='tiny' className='status'><Icon name='comments'/>Comments</Label>
                <Label as='a' color='white' style={{float: 'left' }} size='tiny' className='status'><Icon name='share'/>Share</Label>
                <Label as='a' color='white' style={{float: 'left' }} size='tiny' className='status'><Icon name='favorite'/>Track</Label>
                <Label as='a' color='white' style={{float: 'left' }} size='tiny' className='status'><Icon name='flag'/>Report</Label>
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
