import React from 'react';
import { Item, Segment, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Issue extends React.Component {
  render() {
    return (

        <Segment vertical>
          <div style={{paddingBottom: '5px'}}>
          <Item>
            <Item.Image float='left'>
              <Icon name='angle up'/> {this.props.issue.votes}
            </Item.Image>

            <Item.Content>
              <Item.Header as='h4'>{this.props.issue.name}</Item.Header>
              <Item.Meta>Description</Item.Meta>
              <Item.Description>{this.props.issue.description}</Item.Description>
              <Item.Meta><span className='status'>{this.props.issue.status}</span></Item.Meta>
              <Item.Extra><span  style={{float: 'right', color: 'grey' }} className='createdAt'>{this.props.issue.createdAt.toString()}</span></Item.Extra>
            </Item.Content>
          </Item>
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
