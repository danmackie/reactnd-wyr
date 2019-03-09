import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import { setAuthedUser } from '../actions/authedUser';
import { handleAddQuestion } from '../actions/questions';
import { handleInitialData } from '../actions/shared';
import DashboardView from './DashboardView';
import FourohfourView from './FourohfourView';
import LeaderboardView from './LeaderboardView';
import LoginView from './LoginView';
import Navigation from './Navigation';
import NewQuestionView from './NewQuestionView';
import ProtectedRoute from './ProtectedRoute';
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
    dispatch(handleAddQuestion({ optionOneText, optionTwoText, author: authedUser }))
  }

  render() {

    const { users, authedUser, loading } = this.props
    const avatarURL = users[authedUser] !== undefined ? users[authedUser].avatarURL : ''
    const name = users[authedUser] !== undefined ? users[authedUser].name : ''

    return (

      < Router >
        <Fragment>
          <LoadingBar />
          <Container>
            {loading === true
              ? null
              :
              <Fragment>
                <Navigation authedUser={this.props.authedUser} username={name} avatarURL={avatarURL} handleLogout={this.handleLogout} />
                <Switch>
                  <Route exact path='/' component={DashboardView} />
                  <Route path='/login' render={({ history }) => (
                    <LoginView
                      handleReturn={() => {
                        this.handleReturnFromLogin()
                        history.push('/')
                      }}
                    />
                  )} />
                  {/* <Route path='/questions/:id' component={QuestionView} /> */}
                  <ProtectedRoute allowed={authedUser !== ''} path='/questions/:id' render={(props) => <QuestionView
                    handleReturn={() => {
                      this.handleReturnFromQuestion(props)
                    }}
                    {...props} />} />
                  <ProtectedRoute path='/new' allowed={authedUser !== ''} render={({ history }) => (
                    <NewQuestionView
                      handleReturn={(t1, t2) => {
                        this.handleSubmitNewQuestion(t1, t2)
                        history.push('/')
                      }}
                      handleReturnClose={() => { history.push('/') }}
                    />
                  )} />
                  <ProtectedRoute path='/leaderboard' allowed={authedUser !== ''} render={({ history }) => (
                    <LeaderboardView
                      // users={users}
                      handleReturn={() => {
                        this.handleReturnFromLeaderboard()
                        history.push('/')
                      }}
                    />
                  )} />
                  <Route component={FourohfourView} />
                </Switch>
              </Fragment>
            }
          </Container>
        </Fragment>
      </Router >
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