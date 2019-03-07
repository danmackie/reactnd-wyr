import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'reactstrap';
import { setAuthedUser } from '../actions/authedUser';
import { handleAddQuestion } from '../actions/questions';
import { handleInitialData } from '../actions/shared';
import DashboardView from './DashboardView';
import LeaderboardView from './LeaderboardView';
import LoginView from './LoginView';
import Navigation from './Navigation';
import NewQuestionView from './NewQuestionView';
import QuestionView from './QuestionView';

class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  handleReturnFromLogin = () => {
    console.log('Handle return from login');
  }

  handleReturnFromQuestion = ({ history }) => {
    history.push('/')
    console.log('Handle return from handleReturnFromQuestion');
  }

  handleReturnFromLeaderboard = () => {
    console.log('Handle return from leaderboard');
  }

  handleLogout = (event) => {
    event.preventDefault()
    this.props.dispatch(setAuthedUser(''))
  }

  handleSubmitNewQuestion = (optionOneText, optionTwoText) => {
    const { dispatch, authedUser } = this.props
    console.log('NEW Q: ', optionOneText, optionOneText, authedUser);

    dispatch(handleAddQuestion({ optionOneText, optionTwoText, author: authedUser }))
  }

  render() {

    const { users, authedUser, loading } = this.props
    const avatarURL = users[authedUser] !== undefined ? users[authedUser].avatarURL : ''
    const name = users[authedUser] !== undefined ? users[authedUser].name : ''

    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <Container>
            {loading === true
              ? null
              :
              <Fragment>
                <Navigation authedUser={this.props.authedUser} username={name} avatarURL={avatarURL} handleLogout={this.handleLogout} />
                <Route path='/' exact component={DashboardView} />
                <Route path='/login' render={({ history }) => (
                  <LoginView
                    handleReturn={() => {
                      this.handleReturnFromLogin()
                      history.push('/')
                    }}
                  />
                )} />
                {/* <Route path='/questions/:id' component={QuestionView} /> */}
                <Route path='/questions/:id' render={(props) => <QuestionView
                  handleReturn={() => {
                    this.handleReturnFromQuestion(props)
                  }}
                  {...props} />} />
                <Route path='/new' render={({ history }) => (
                  <NewQuestionView
                    handleReturn={(t1, t2) => {
                      this.handleSubmitNewQuestion(t1, t2)
                      history.push('/')
                    }}
                    handleReturnClose={() => { history.push('/') }}
                  />
                )} />
                <Route path='/leaderboard' render={({ history }) => (
                  <LeaderboardView
                    users={users}
                    handleReturn={() => {
                      this.handleReturnFromLeaderboard()
                      history.push('/')
                    }}
                  />
                )} />
              </Fragment>
            }
          </Container>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    users,
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App)