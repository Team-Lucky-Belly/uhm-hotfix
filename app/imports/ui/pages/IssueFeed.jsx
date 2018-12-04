import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Menu, Dropdown} from 'semantic-ui-react';
import IssueFeedEvent from '/imports/ui/components/IssueFeedEvent';
import { Issues } from '/imports/api/issue/issue'
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** Renders a table contaiimport React from 'react';
ning all of the Stuff documents. Use <StuffItem> to render each row. */
class IssueFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {issues : this.props.issues, currentColumn : "", sortBy : "Time Submitted", statusFilter : "All"};
    this.handleSort = this.handleSort.bcomind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }

  handleSort = () => {};

  handleFilter = () => {};

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class IssueFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {issues : this.props.issues, currentColumn : "" };
  }


  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {

    const sortBy = this.state.sortBy ? this.state.sortBy : "createdAt";
    var issues = (this.state.issues.length !== 0) ? this.state.issues : this.props.issues;
    issues = sortBy(issues, sortBy);


    return (
        <Container>
        <Menu>
          <Menu.Item header>Sort By:</Menu.Item>
          <Menu.Item name='Time Submitted' active={sortBy == 'Time Submitted'}> Time Submitted </Menu.Item>
          <Menu.Item name='Likes' active={sortBy == 'Likes'}> Likes </Menu.Item>

          <Menu.Item header position='right'>Filter By Status:</Menu.Item>
          <Dropdown item text='All'>
            <Dropdown.Menu>
              <Dropdown.Item>Not Started</Dropdown.Item>
              <Dropdown.Item>In Progress</Dropdown.Item>
              <Dropdown.Item>Completed</Dropdown.Item>

            </Dropdown.Menu>
          </Dropdown>
        </Menu>
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
