import React from 'react';
import { Card, CardHeader } from 'reactstrap';
import { avatartocircular } from '../utils/helpers';


//TODO: Style
const UserLoginCard = props => {

  const { avatarURL, name, id } = props.user
  const avatarURLCirc = avatartocircular(avatarURL)

  const { handleLogin } = props

  const handleLoginClick = () => {
    handleLogin(id)
  }

  return (
    <Card
      onClick={handleLoginClick}
      align='center'
      style={{ marginTop: '2em', marginBottom: '2em' }}>
      <CardHeader>
        <img
          src={avatarURLCirc}
          height='80px'
          width='80px'
          alt={`Avatar of ${name}`} /><span><br />{name}</span>
      </CardHeader>
    </Card>
  );
}

export default UserLoginCard;
