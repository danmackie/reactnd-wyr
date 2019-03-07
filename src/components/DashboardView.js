import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, ButtonGroup, CardColumns, Col, Row } from 'reactstrap';
import { avatartocircular } from '../utils/helpers';
import QCardMini from './QCardMini';

//TODO:Style
class DashboardView extends Component {

  state = {
    showingUnanswered: true,
  }

  handleToggleQuestions = (e) => {
    this.setState(() => ({
      showingUnanswered: !this.state.showingUnanswered
    }))
  }

  // handleClickCallback = (question, answered) => {
  //   //TODO: Navigate to popup of question in different modes depending on login etc.
  //   this.props.history.push(`/questions/:${question.id}`)
  // }

  render() {

    const { unansweredQs, answeredQs, users } = this.props

    return (

      <Fragment>
        <Row>
          <Col align='center'>
            <ButtonGroup>
              <Button outline color="primary" onClick={this.handleToggleQuestions} active={this.state.showingUnanswered}>Unanswered</Button>
              <Button outline color="success" onClick={this.handleToggleQuestions} active={!this.state.showingUnanswered}>Answered</Button>
            </ButtonGroup>
          </Col>
        </Row>
        <Row align='center'>
          <Col>
            {this.state.showingUnanswered
              ?
              <CardColumns>
                {answeredQs.map((question) => (
                  <Col key={question.id}>
                    <QCardMini
                      key={question.id}
                      question={question}
                      answered={true}
                      avatarURL={avatartocircular(users[question.author].avatarURL)}
                      username={users[question.author].name}
                    // handleClickCallback={this.handleClickCallback}
                    />
                  </Col>
                ))}
              </CardColumns>
              :
              <CardColumns>
                {unansweredQs.map((question) => (
                  <Col key={question.id}>
                    <QCardMini
                      key={question.id}
                      question={question}
                      answered={false}
                      avatarURL={users[question.author].avatarURL}
                      username={users[question.author].name}
                    // handleClickCallback={this.handleClickCallback} 
                    />
                  </Col>
                ))}
              </CardColumns>
            }
          </Col>
        </Row>
      </Fragment>
    );
  }
}

function mapStateToProps({ questions, authedUser, users }) {
  let unansweredQs = []
  let answeredQs = []
  if (authedUser === '') {
    //If there's no authed user questions are deedmed as unanswered if no one has answered them at all
    Object.keys(questions).map((key) => (
      (questions[key].optionOne.votes.length === 0 && questions[key].optionTwo.votes.length === 0)
        ? unansweredQs.push(questions[key])
        : answeredQs.push(questions[key])
    ))
  } else {
    //If there IS an authed user then questions are sorted by unaswered questions per user 
    Object.keys(questions).map((key) => (
      (questions[key].optionOne.votes.includes(authedUser) || questions[key].optionTwo.votes.includes(authedUser))
        ? answeredQs.push(questions[key])
        : unansweredQs.push(questions[key])
    ))
  }

  return {
    unansweredQs: unansweredQs.sort((a, b) => b.timestamp - a.timestamp),
    answeredQs: answeredQs.sort((a, b) => b.timestamp - a.timestamp),
    authedUser,
    users,
  }
}

export default connect(mapStateToProps)(DashboardView);
