import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Badge, Button, Card, CardBody, CardHeader, CardText, CardTitle, Col, Row } from 'reactstrap';
import { handleAnswerQuestion } from '../actions/questions';
import { avatartocircular, formatDate } from '../utils/helpers';


//TODO: 
// T̶h̶e̶ ̶d̶e̶t̶a̶i̶l̶s̶ ̶o̶f̶ ̶t̶h̶e̶ ̶p̶o̶l̶l̶ ̶a̶r̶e̶ ̶a̶v̶a̶i̶l̶a̶b̶l̶e̶ ̶a̶t̶ ̶q̶u̶e̶s̶t̶i̶o̶n̶s̶/̶:̶q̶u̶e̶s̶t̶i̶o̶n̶_̶i̶d̶.̶
// When a poll is clicked on the home page, the following is shown:
// For answered polls, each of the two options contains the following:
// the text of the option;
// The option selected by the logged in user should be clearly marked.
// When the user is logged in, the details of the poll are shown. If the user is logged out, he/she is asked to log in before before being able to access the poll.
// The application asks the user to sign in and shows a 404 page if that poll does not exist. (In other words, if a user creates a poll and then the same or another user tries to access that poll by its url, the user should be asked to sign in and then be shown a 404 page. Please keep in mind that new polls will not be accessible at their url because of the way the backend is set up in this application.) 

//TODO: Style
class QuestionView extends Component {

  state = {
    votinginprogress: false
  }

  handleVote = (e) => {
    e.preventDefault();
    const { dispatch, question, authedUser, qid } = this.props
    const answer = e.target.name
    console.log('VOTE = ', answer);
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

  getVotes = (votesA, votesB) => {
    let votesPercent = votesA.length === 0
      ? 'None'
      : `${votesA.length} (${Math.round((votesA.length / (votesA.length + votesB.length)) * 100)}%)`
    return votesPercent
  }

  render() {

    const { question, user, authedUser, handleReturn, avatarURL, auURL } = this.props
    const votesOne = question.optionOne.votes
    const votesTwo = question.optionTwo.votes
    const answered = votesOne.includes(authedUser) || votesTwo.includes(authedUser);
    const authedUserVote = votesOne.includes(authedUser) ? '1' : '2';

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
                      ? <form name='optionOne' onSubmit={this.handleVote}>
                        <Button
                          disabled={this.state.votinginprogress}
                          name='optionOne'
                          size="lg"
                          outline color='success'
                          style={{ paddingLeft: '20px', paddingRight: '20px', paddingBottom: '10px' }}
                        ><span role='img' name='optionOne' aria-label='Vote'>👍</span></Button>
                      </form>
                      : <Col className='my-auto'>
                        <span style={{ fontSize: '1.4em', fontWeight: '600' }}>Votes: <Badge pill color="primary">{this.getVotes(votesOne, votesTwo)}</Badge></span>
                        {authedUserVote === '1' &&
                          <img
                            height='30px'
                            width='30px'
                            alt={authedUser}
                            src={`../${auURL}`}
                            style={{ marginLeft: '5px', marginTop: '-5px' }}
                          />
                        }
                      </Col>
                    }
                  </Col>
                </Row>
                <CardText style={{ fontSize: '1.3em', fontWeight: '600' }}> ~ OR ~ </CardText>
                <Row style={this.getDisabledStyle()}>
                  <Col sm='7'><span style={{ fontSize: '1.4em', fontWeight: '600' }}>2: {question.optionTwo.text}</span></Col>
                  <Col sm='5' align='left'>
                    {(!answered && authedUser !== '')
                      ? <form name='optionTwo' onSubmit={this.handleVote}>
                        <Button
                          disabled={this.state.votinginprogress}
                          name='optionTwo'
                          size="lg"
                          outline color='success'
                          style={{ paddingLeft: '20px', paddingRight: '20px', paddingBottom: '10px' }}
                        ><span name='optionTwo' role='img' aria-label='Vote'>👍</span></Button>
                      </form>
                      : <Col className='my-auto'>
                        <span style={{ fontSize: '1.4em', fontWeight: '600' }}>Votes: <Badge pill color="primary">{this.getVotes(votesTwo, votesOne)}</Badge></span>
                        {authedUserVote === '2' &&
                          <img
                            height='30px'
                            width='30px'
                            alt={authedUser}
                            style={{ marginLeft: '5px', marginTop: '-5px' }}
                            src={`../${auURL}`} />
                        }
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
  // console.log('props = ', props);
  const user = users[questions[id].author]
  const auObject = users[authedUser]
  const aURL = avatartocircular(user.avatarURL)
  const auURL = avatartocircular(auObject.avatarURL)
  return {
    qid: id,
    authedUser,
    user: user,
    avatarURL: aURL,
    question: questions[id],
    auURL: auURL,
    // handleReturn: props.handleReturn
  }
}

export default connect(mapStateToProps)(QuestionView);
