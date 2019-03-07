import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Badge, Button, Card, CardBody, CardHeader, CardText, CardTitle, Col, Row } from 'reactstrap';
import { handleAnswerQuestion } from '../actions/questions';
import { avatartocircular, formatDate } from '../utils/helpers';


//TODO: 
// T̶h̶e̶ ̶d̶e̶t̶a̶i̶l̶s̶ ̶o̶f̶ ̶t̶h̶e̶ ̶p̶o̶l̶l̶ ̶a̶r̶e̶ ̶a̶v̶a̶i̶l̶a̶b̶l̶e̶ ̶a̶t̶ ̶q̶u̶e̶s̶t̶i̶o̶n̶s̶/̶:̶q̶u̶e̶s̶t̶i̶o̶n̶_̶i̶d̶.̶
// When a poll is clicked on the home page, the following is shown:
// t̶h̶e̶ ̶t̶e̶x̶t̶ ̶“̶W̶o̶u̶l̶d̶ ̶Y̶o̶u̶ ̶R̶a̶t̶h̶e̶r̶”̶;̶
// t̶h̶e̶ ̶p̶i̶c̶t̶u̶r̶e̶ ̶o̶f̶ ̶t̶h̶e̶ ̶u̶s̶e̶r̶ ̶w̶h̶o̶ ̶p̶o̶s̶t̶e̶d̶ ̶t̶h̶e̶ ̶p̶o̶l̶l̶i̶n̶g̶ ̶q̶u̶e̶s̶t̶i̶o̶n̶;̶ ̶a̶n̶d̶
// the two options.
// For answered polls, each of the two options contains the following:
// the text of the option;
// t̶h̶e̶ ̶n̶u̶m̶b̶e̶r̶ ̶o̶f̶ ̶p̶e̶o̶p̶l̶e̶ ̶w̶h̶o̶ ̶v̶o̶t̶e̶d̶ ̶f̶o̶r̶ ̶t̶h̶a̶t̶ ̶o̶p̶t̶i̶o̶n̶;̶
// t̶h̶e̶ ̶p̶e̶r̶c̶e̶n̶t̶a̶g̶e̶ ̶o̶f̶ ̶p̶e̶o̶p̶l̶e̶ ̶w̶h̶o̶ ̶v̶o̶t̶e̶d̶ ̶f̶o̶r̶ ̶t̶h̶a̶t̶ ̶o̶p̶t̶i̶o̶n̶.̶
// The option selected by the logged in user should be clearly marked.
// When the user is logged in, the details of the poll are shown. If the user is logged out, he/she is asked to log in before before being able to access the poll.
// The application asks the user to sign in and shows a 404 page if that poll does not exist. (In other words, if a user creates a poll and then the same or another user tries to access that poll by its url, the user should be asked to sign in and then be shown a 404 page. Please keep in mind that new polls will not be accessible at their url because of the way the backend is set up in this application.) 

//TODO: Style
class QuestionView extends Component {

  state = {
    votinginprogress: false
  }

  handleVote = (e) => {
    const { dispatch, question, authedUser, qid } = this.props
    const answer = e.target.name
    this.disableWhilstVoting();
    dispatch(handleAnswerQuestion(question, { authedUser, qid, answer }))
  }

  disableWhilstVoting = () => {
    this.setState(() => ({
      votinginprogress: true
    }))
  }

  getDisabledStyle = () => {
    return (this.props.authedUser === '')
      ? { color: '#aaa', padding: '20px' }
      : { color: '#000', padding: '20px' }
  }

  getVotes = (optionN) => {
    const { question } = this.props
    const votesOne = question.optionOne.votes
    const votesTwo = question.optionTwo.votes
    let votesPercent = 'None'
    if (optionN === 1 && votesOne.length > 0) {
      const votes1 = Math.round((votesOne.length / (votesOne.length + votesTwo.length)) * 100)
      votesPercent = `${votesOne.length} - ${votes1} %`
    }
    if (optionN === 2 && votesTwo.length > 0) {
      const votes2 = Math.round((votesTwo.length / (votesTwo.length + votesOne.length)) * 100)
      votesPercent = `${votesTwo.length} - ${votes2} %`
    }
    return votesPercent
  }

  render() {

    const { question, user, authedUser, handleReturn, avatarURL } = this.props
    const votesOne = question.optionOne.votes
    const votesTwo = question.optionTwo.votes
    const answered = votesOne.includes(authedUser) || votesTwo.includes(authedUser);

    return (
      <Fragment>
        <Row align='center'>
          <Col sm="12" md={{ size: 8, offset: 2 }}>
            <Button onClick={handleReturn} close />
            <Card style={{ marginTop: '2em', marginBottom: '2em' }}>
              <CardHeader>
                <Col className='my-auto'>
                  <img
                    height='100px'
                    width='100px'
                    alt={question.author}
                    src={`../${avatarURL}`} /><span style={{ fontSize: '1.4em', fontWeight: '600' }}>&nbsp;&nbsp;&nbsp;{user.name}</span>
                </Col>
              </CardHeader>
              <CardHeader align='center' style={{ backgroundColor: '#fcfcfc', paddingTop: '0.1REM', paddingBottom: '0.1REM' }}>
                <small className="text-muted">{formatDate(question.timestamp)}</small>
              </CardHeader>
              <CardBody align='center'>
                <CardTitle><h3 style={{ padding: '20px' }}>Would you rather?</h3></CardTitle>
                <Row style={this.getDisabledStyle()}>
                  <Col sm='7'><span style={{ fontSize: '1.4em', fontWeight: '600' }}>1: {question.optionOne.text}</span></Col>
                  <Col sm='5' align='left'>
                    {(!answered && authedUser !== '')
                      ? <form onInput={this.handleVote}>
                        <Button
                          disabled={this.state.votinginprogress}
                          name='optionOne'
                          outline color='success'
                          style={{ paddingLeft: '20px', paddingRight: '20px', paddingBottom: '10px' }}
                        ><span role='img' aria-label='Vote'>👍</span></Button>
                      </form>
                      : <Col>
                        <span style={{ fontSize: '1.4em', fontWeight: '600' }}>Votes: <Badge pill color="success">{this.getVotes(1)}</Badge></span>
                      </Col>
                    }
                  </Col>
                </Row>
                <CardText style={{ fontSize: '1.3em', fontWeight: '600' }}> ~ OR ~ </CardText>
                <Row style={this.getDisabledStyle()}>
                  <Col sm='7'><span style={{ fontSize: '1.4em', fontWeight: '600' }}>2: {question.optionTwo.text}</span></Col>
                  <Col sm='5' align='left'>
                    {(!answered && authedUser !== '')
                      ? <form onInput={this.handleVote}>
                        <Button
                          disabled={this.state.votinginprogress}
                          name='optionOne'
                          outline color='success'
                          style={{ paddingLeft: '20px', paddingRight: '20px', paddingBottom: '10px' }}
                        ><span role='img' aria-label='Vote'>👍</span></Button>
                      </form>
                      : <Col>
                        <span style={{ fontSize: '1.4em', fontWeight: '600' }}>Votes: <Badge pill color="success">{this.getVotes(2)}</Badge></span>
                      </Col>
                    }
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Fragment >
    );
  }
}

function mapStateToProps({ authedUser, questions, users }, props) {
  const { id } = props.match.params
  console.log('props = ', props);
  const user = users[questions[id].author]
  const aURL = avatartocircular(user.avatarURL)
  return {
    qid: id,
    authedUser,
    user: user,
    avatarURL: aURL,
    question: questions[id],
    // handleReturn: props.handleReturn
  }
}

export default connect(mapStateToProps)(QuestionView);
