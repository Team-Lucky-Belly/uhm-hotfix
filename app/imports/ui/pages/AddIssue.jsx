import React from 'react';
import { Issues, IssueSchema } from '/imports/api/issue/issue';
import { Grid, Segment, Header } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import LongTextField from 'uniforms-semantic/LongTextField';
import TextField from 'uniforms-semantic/TextField';
import HiddenField from 'uniforms-semantic/HiddenField';
import SubmitField from 'uniforms-semantic/SubmitField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';

/** Renders the Page for adding a document. */
class AddIssue extends React.Component {

  /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.insertCallback = this.insertCallback.bind(this);
    this.formRef = null;
  }

  /** Notify the user of the results of the submit. If successful, clear the form. */
  insertCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Add failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Add succeeded' });
      this.formRef.reset();
    }
  }

  /** On submit, insert the data. */
  submit(data) {
    const { name, description, location } = data;
    const owner = Meteor.user().username;
    const createdAt = new Date();
    const status = 'Not Started';
    const votes = 0;
    Issues.insert({ name, description, owner, createdAt, location, status, votes }, this.insertCallback);
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    return (
        <div>
          <Grid container centered>
            <Grid.Column>
              <Header as="h2" textAlign="center">Report an Issue</Header>
              <AutoForm ref={(ref) => {
                this.formRef = ref;
              }} schema={IssueSchema} onSubmit={this.submit}>
                <Segment>
                  <TextField name='name'/>
                  <LongTextField name='description'/>
                  <TextField name='location'/>
                  <SubmitField value='Submit'/>
                  <ErrorsField/>
                  <HiddenField name='owner' value='fakeuser@foo.com'/>
                  <HiddenField name='createdAt' value={new Date()}/>
                </Segment>
              </AutoForm>
            </Grid.Column>
          </Grid>
          <div style={{ height: '50px' }}/>
        </div>
    );
  }
}

export default AddIssue;
