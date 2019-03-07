import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, CardDeck, Col, Row } from 'reactstrap';
import { setAuthedUser } from '../actions/authedUser';
import UserLoginCard from './UserLoginCard';


//TODO: Style
class LoginView extends Component {

  handleLogout = (event) => {
    event.preventDefault()
    this.props.dispatch(setAuthedUser(''))
  }

  handleLogin = (id) => {
    this.props.dispatch(setAuthedUser(id))
    this.props.handleReturn()
  }

  render() {
    const { authedUser, users, handleReturn } = this.props
    return (
      <Row align='center'>
        <Col sm="12" md={{ size: 8, offset: 2 }}>
          <Button onClick={handleReturn} close />
          <h4>You can log as any of these users</h4>
          {authedUser === ''
            ? <CardDeck>
              {Object.keys(users).map((key) => (
                <Col key={users[key].id} sm="6">
                  <UserLoginCard
                    key={users[key].id}
                    handleLogin={this.handleLogin}
                    user={users[key]}
                  />
                </Col>
              ))}
            </CardDeck>
            : <div>
              <h3>You're logged in as:</h3>
              <span>&nbsp;&nbsp;{authedUser}</span>
              <button
                onClick={this.handleLogout}
              >Log out</button>
            </div>
          }
        </Col>
      </Row >
    );
  }
}

function mapStateToProps({ authedUser, users }, { handleReturn }) {
  return {
    authedUser,
    users,
    handleReturn,
  }
}

export default withRouter(connect(mapStateToProps)(LoginView));
