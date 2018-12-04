import { Button, Form, Grid, Header, TextArea } from 'semantic-ui-react';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { Bert } from 'meteor/themeteorchef:bert';
import { Comments } from '/imports/api/comment/comment';



class CommentForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.insertCallback = this.insertCallback.bind(this);

  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    const comment = this.state.value;
    const issueId = this.props.issueId;
    const owner = this.props.owner;
    const createdAt = new Date();
    Comments.insert({ comment, issueId, owner, createdAt }, this.insertCallback);
  }

  insertCallback(error) {
    if (error) {
      alert("Comment failed to add");
      Bert.alert({ type: 'danger', message: `Add failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Add succeeded' });
      this.setState({value: ''});
    }
  }


  render() {
    return (
        <Form>
          <Header as='h4'>
            Add a Comment
          </Header>
          <TextArea placeholder='Add a comment' value={this.state.value} onChange={this.handleChange}/>
          <Button type='submit' onClick={this.handleSubmit} >Submit</Button>
        </Form>)
  }
}

export default withRouter(CommentForm);

