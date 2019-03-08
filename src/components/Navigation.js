import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { avatartocircular } from '../utils/helpers';


class Navigation extends Component {

  state = {
    isOpen: false
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  getLinkClassName = () => {
    const { authedUser } = this.props
    return authedUser !== "" ? "nav-link" : "nav-link disabled"
  }

  render() {

    const { authedUser, avatarURL, handleLogout, username } = this.props
    // console.log(authedUser, avatarURL, handleLogout, username);

    return (
      <Navbar color="inverse" light expand="md" style={{ padding: '20px' }}>
        <NavbarBrand tag={Link} to="/">Would you rather?</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink tag={Link} to="/new" disabled={authedUser === ''}>New</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/leaderboard" disabled={authedUser === ''}>Leaderboard</NavLink>
            </NavItem>
          </Nav>
          <Nav className="ml-auto" navbar>
            <NavItem>
              {authedUser === '' &&
                <NavLink tag={Link} to="/login">Login</NavLink>
              }
              {authedUser !== '' &&
                <div>
                  <img
                    src={avatartocircular(avatarURL)}
                    alt={`Avatar of ${username}`}
                    width='30px'
                    height='30px'
                  />
                  <span>&nbsp;&nbsp;{username}&nbsp;&nbsp;</span> <Button color="primary" size="sm" outline onClick={handleLogout}>Logout</Button>
                </div>
              }
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    )
  }
}

export default Navigation