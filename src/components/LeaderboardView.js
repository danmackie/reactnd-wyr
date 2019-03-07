import React, { Fragment } from 'react';
import { Col, Row } from 'reactstrap';
import UserLeaderboardCard from './UserLeaderboardCard';

const LeaderboardView = props => {

  const { users } = props

  const sortedusers = []
  //Get sorted array of users (desc total of QAs)
  if (users !== undefined) {
    Object.keys(users).forEach(id => {
      // console.log('user = ', users[id]);
      let user = users[id];
      user.total += user.questions.length > 0 && user.questions.length
      user.total += user.answers.length > 0 && user.answers.length
      sortedusers.push(user)
    });
    sortedusers.sort((a, b) => b.total - a.total)
  }

  return (
    <Fragment>
      <Row align='center'>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <h4>Leaderboard</h4>
          {users !== undefined &&
            sortedusers.map((user) => (
              <UserLeaderboardCard
                key={user.id}
                user={user}
              />
            ))}
        </Col>
      </Row>
    </Fragment>
  );
}

export default LeaderboardView;