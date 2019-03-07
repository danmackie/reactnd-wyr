import React, { Component } from 'react';
import { Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';


//TODO: 
// The new polling question appears in the correct category on the home page.

//TODO: Style
class NewQuestionView extends Component {

  state = {
    cansubmit: true,
    optionOneText: '',
    optionTwoText: '',
  }

  componentDidMount() {
    this.disableSubmit()
  }

  disableSubmit = () => {
    this.setState(() => ({
      cansubmit: false
    }))
  }

  updateField = (event) => {
    const optionOneText = document.getElementById('optionOne').value.trim();
    const optionTwoText = document.getElementById('optionTwo').value.trim();
    this.setState(() => ({
      optionOneText,
      optionTwoText,
      cansubmit: !(optionOneText === '' || optionTwoText === '')
    }))
  }

  handleSubmitQuestion = (e) => {
    this.disableSubmit();
    this.props.handleReturn(this.state.optionOneText, this.state.optionTwoText)
  }

  render() {

    return (
      <Col align='center'>
        <h2>Would You Rather</h2>

        <Form onSubmit={this.handleSubmitQuestion}>
          <Row form>
            <Col md={4}>
              <FormGroup>
                <Label for="optionOne">Option 1</Label>
                <Input
                  type="text"
                  onChange={this.updateField}
                  name="optionOne"
                  id="optionOne"
                  placeholder="Add your first option..." />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="optionTwo">Option 2</Label>
                <Input
                  onChange={this.updateField}
                  type="text"
                  name="optionTwo"
                  id="optionTwo"
                  placeholder="Add your second option..." />
              </FormGroup>
            </Col>
          </Row>
          <Button color="info" disabled={!this.state.cansubmit}>Add it</Button>
        </Form>
      </Col>
    );
  }
}

export default NewQuestionView;
