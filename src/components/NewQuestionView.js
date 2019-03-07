import React, { Component, Fragment } from 'react';
import { Button, Card, CardBody, CardHeader, CardText, Col, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

//TODO: 
// The new polling question appears in the correct category on the home page.
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
    const { handleReturnClose } = this.props
    return (
      <Fragment>
        <Row align='center'>
          <Col sm="12" md={{ size: 8, offset: 2 }}>
            <Button onClick={handleReturnClose} close />
            <Card style={{ marginTop: '2em', marginBottom: '2em' }}>
              <CardHeader>
                <Col className='my-auto'>
                  <h2>Would You Rather</h2>
                </Col>
              </CardHeader>
              <CardBody align='center'>
                <Form onSubmit={this.handleSubmitQuestion}>
                  <Row>
                    <Col style={{ padding: '20px', margin: '20px' }} className='my-auto'>
                      <FormGroup>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>Option 1</InputGroupText>
                          </InputGroupAddon>
                          <Input
                            onChange={this.updateField}
                            name="optionOne"
                            id="optionOne"
                            placeholder="Add your first option..."
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <CardText style={{ fontSize: '1.3em', fontWeight: '600' }}> ~ OR ~ </CardText>
                    </Col>
                  </Row>
                  <Row>
                    <Col style={{ padding: '20px', margin: '20px' }} className='my-auto'>
                      <FormGroup>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>Option 2</InputGroupText>
                          </InputGroupAddon>
                          <Input
                            onChange={this.updateField}
                            name="optionTwo"
                            id="optionTwo"
                            placeholder="Add your second option..."
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Button
                        size="lg"
                        color="warning"
                        disabled={!this.state.cansubmit}>Add your question
                     </Button>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Fragment >
    );
  }
}

export default NewQuestionView;
