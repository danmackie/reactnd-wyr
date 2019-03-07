import React from 'react';
import { Badge, Col, Row } from 'reactstrap';
import { avatartocircular } from '../utils/helpers';

//TODO: Style
const UserLeaderboardCard = props => {

  const { avatarURL, name, answers, questions } = props.user

  return (
    <Row style={{ padding: '1EM' }}>
      <Col>
        <img
          src={avatartocircular(avatarURL)}
          alt={`Avatar of ${name}`}
          width='120'
          height='120'
        />
      </Col>
      <Col className='my-auto'>
        <div style={{ verticalAlign: 'middle' }} align='left' className="align-middle" >
          <h4>{name}</h4>
          <strong>Answered:</strong> <Badge pill color="success">{answers.length > 0 ? answers.length : `None`}</Badge>
          <br /><strong>Asked:</strong> <Badge pill color="primary">{questions.length > 0 ? questions.length : `None`}</Badge>
        </div>
      </Col>
    </Row >
  );
}

export default UserLeaderboardCard;