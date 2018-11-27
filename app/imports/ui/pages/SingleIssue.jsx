import React from 'react';
import { Issues, IssueSchema } from '/imports/api/issue/issue';
import { Grid, Segment, Header, Loader, Container, Icon, Button, Label, Divider} from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import LongTextField from 'uniforms-semantic/LongTextField';
import TextField from 'uniforms-semantic/TextField';
import HiddenField from 'uniforms-semantic/HiddenField';
import SubmitField from 'uniforms-semantic/SubmitField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SelectField from 'uniforms-semantic/SelectField';
import { Redirect } from 'react-router-dom';

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
            <Grid.Column width={1}>
                <Button icon basic>
                  <Icon name='up arrow' />
                  {this.props.doc.votes}
                </Button>
            </Grid.Column>
            <Grid.Column width={15}>
              <Segment>
              <Header as="h2">{this.props.doc.name}
                      <Header.Subheader>Submitted by: {this.props.doc.owner}
                      </Header.Subheader>
                <Header.Subheader>Located at: {this.props.doc.location}
                </Header.Subheader>
                <Header.Subheader>{this.props.doc.createdAt.toLocaleString()}
                      </Header.Subheader>
                      </Header>
                <Divider/>
              {this.props.doc.description}
                </Segment>
            </Grid.Column>
          </Grid>
          <div style={{ height: '50px' }}/>
          </Container>
    );
  }
}

/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
SingleIssue.propTypes = {
  doc: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('IssuesAdmin');
  return {
    doc: Issues.findOne(documentId),
    ready: subscription.ready(),
  };
})(SingleIssue);
