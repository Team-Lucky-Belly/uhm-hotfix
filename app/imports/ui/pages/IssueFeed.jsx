import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Menu, Dropdown} from 'semantic-ui-react';
import IssueFeedEvent from '/imports/ui/components/IssueFeedEvent';
import { Issues } from '/imports/api/issue/issue'
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { sortBy, filter } from 'underscore';

/** Renders a table contaiimport React from 'react';
 ning all of the Stuff documents. Use <StuffItem> to render each row. */
class IssueFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {issues : this.props.issues, currentColumn : "", sortKey : 'createdAt', statusFilter : "All"};
    this.handleSort = this.handleSort.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }

  handleSort = (sortKey) => {
    var issues = (this.state.issues.length !== 0) ? this.state.issues : this.props.issues;

    issues = sortBy(issues, sortKey).reverse();
    this.setState({sortKey : sortKey, issues : issues});

  };

  handleFilter = (filterKey) => {
    let issues = Issues.find({}).fetch();
    if (filterKey !== 'all') {
      issues = filter(issues, (issue) => issue.status === filterKey);
    }
    console.log(issues);
    this.handleSort(this.state.sortKey);
    this.setState({ issues: issues, statusFilter: filterKey });
  };

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {

    let issues = (this.state.issues.length !== 0) ? this.state.issues : this.props.issues;
    if (this.state.sortKey === 'createdAt') issues = sortBy(issues, 'createdAt').reverse();
    let filterKeys = ['All', 'Not Started', 'In Progress', 'Completed'];
    filterKeys = filter(filterKeys, key  => key !== this.state.statusFilter);
    console.log(filterKeys);
    return (
        <Container>
          <Menu>
            <Menu.Item header>Sort By:</Menu.Item>
            <Menu.Item name='createdAt' active={sortBy === 'createdAt'} onClick={() => this.handleSort('createdAt')}>
              Time Submitted
            </Menu.Item>
            <Menu.Item name='votes' active={sortBy === 'votes'} onClick={() => this.handleSort('votes')}>
              Votes
            </Menu.Item>
            <Menu.Item header position='right'>Filter By Status:</Menu.Item>
            <Dropdown item text={this.state.statusFilter}>
              <Dropdown.Menu>
                {filterKeys.map((key) => <Dropdown.Item key={key} onClick={() => this.handleFilter(key)}>{key}</Dropdown.Item>)}
              </Dropdown.Menu>
            </Dropdown>
          </Menu>
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
