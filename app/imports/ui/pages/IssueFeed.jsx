import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Header } from 'semantic-ui-react';
import IssueFeedEvent from '/imports/ui/components/IssueFeedEvent';
import { Issues } from '/imports/api/issue/issue'
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class IssueFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {issues : this.props.issues, currentColumn : "" };
  }



  issues = [
    {
      name: 'Bob',
      description: 'Bathroom door in POST is broken',
      owner: 'bobsaget@foo.com',
      createdAt: 'Mon Dec 21 2018 04:29:00 HST',
      status: 'Not started',
    },
    {
      name: 'Megan',
      description: 'Dorms are on fire',
      owner: 'mgan@foo.com',
      createdAt: 'Wed Oct 13 2018 07:01:00 HST',
      status: 'In Progress',
    },
    {
      name: 'Greg',
      description: 'HOLMES elevator is broken',
      owner: 'greg21@foo.com',
      createdAt: 'Fri Nov 01 2018 09:43:00 HST',
      status: 'Completed',
    },
  ];

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {

    const issues = (this.state.issues.length !== 0) ? this.state.issues : this.props.issues;
    return (
        <Container>
          {issues.map((issue) => <IssueFeedEvent key={issue._id} issue={issue}/>)}
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
IssueFeed.propTypes = {
  issues: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Issues');
  return {
    issues: Issues.find({}).fetch(),
    ready: subscription.ready(),
  };
})(IssueFeed);
