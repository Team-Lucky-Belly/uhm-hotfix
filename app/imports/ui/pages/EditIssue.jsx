import React from 'react';
import { Issues, IssueSchema } from '/imports/api/issue/issue';
import { Grid, Segment, Header, Loader } from 'semantic-ui-react';
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

/** Renders the Page for adding a document. */
class EditIssue extends React.Component {

  /** On submit, insert the data. */
  submit(data) {
    const { name, status, description, location, _id } = data;
    Issues.update(_id,{$set: { name, status, description, location } }, (error) => (error ?
        Bert.alert({ type: 'danger', message: `Update failed: ${error.message}` }) :
        Bert.alert({ type: 'success', message: 'Update succeeded' })));
  }
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    return (
        <div>
          <Grid container centered>
            <Grid.Column>
              <Header as="h2" textAlign="center">Edit Issue</Header>
              <Header as="h3" textAlign="center">submitted by: {this.props.doc.owner} </Header>
              <Header as="h5" textAlign="center">{this.props.doc.createdAt.toLocaleString()}</Header>
              <AutoForm schema={IssueSchema} onSubmit={this.submit} model={this.props.doc}>
                <Segment>
                  <TextField name='name'/>
                  <SelectField name='status'/>
                  <LongTextField name='description'/>
                  <TextField name='location'/>
                  <SubmitField value='Submit'/>
                  <ErrorsField/>
                  <HiddenField name='owner' value='fakeuser@foo.com'/>
                </Segment>
              </AutoForm>
            </Grid.Column>
          </Grid>
          <div style={{ height: '50px' }}/>
        </div>
    );
  }
}

/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
EditIssue.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
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
})(EditIssue);
