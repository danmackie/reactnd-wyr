import React, { Fragment } from 'react';
import { Col, Row } from 'reactstrap';
import UserLeaderboardCard from './UserLeaderboardCard';

const LeaderboardView = props => {

  const { users } = props

  console.log('leaderboard users = ', users);


  const sortedusers = []
  //Get sorted array of users (desc total of QAs)
  if (!!users) {
    Object.keys(users).forEach(id => {
      let user = users[id];
      console.log('User = ', user);
      user.total = 0;
      user.total += user.questions.length > 0 && user.questions.length
      console.log('User total 1 = ', user.total);
      user.total += Object.keys(user.answers).length > 0 && Object.keys(user.answers).length
      console.log('User total 2 = ', user.total);
      sortedusers.push(user)
    });
    sortedusers.sort((a, b) => b.total - a.total)
  }

  return (
    <Fragment>
      <Row align='center'>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <h4>Leaderboard</h4>
          {!!users &&
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