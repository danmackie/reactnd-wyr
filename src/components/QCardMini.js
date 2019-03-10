import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardFooter, CardHeader, CardText, CardTitle, Col } from 'reactstrap';
import { formatDate } from '../utils/helpers';

const QCardMini = props => {

  const { question, avatarURL, username, answered, loggedin } = props
  // const { question, answered, handleClickCallback } = props

  // const handleClick = (e) => {
  //   e.preventDefault();
  //   handleClickCallback(question, answered)
  // }

  return (

    <Card align='left' style={{ marginTop: '2em', marginBottom: '2em' }}>
      <CardHeader>
        <Col className='my-auto'>
          <img
            height='50px'
            width='50px'
            alt={question.author}
            src={`../${avatarURL}`} /><span style={{ fontSize: '1.2em', fontWeight: '600' }}>&nbsp;&nbsp;&nbsp;{username}</span>
        </Col>
      </CardHeader>
      <CardHeader align='center' style={{ backgroundColor: '#fcfcfc', paddingTop: '0.1REM', paddingBottom: '0.1REM' }}>
        <small className="text-muted">{formatDate(question.timestamp)}</small>
      </CardHeader>
      <CardBody align='center'>
        <CardTitle><h5>Would you rather?</h5></CardTitle>
        <CardText><strong>1: </strong>{question.optionOne.text}</CardText>
        <CardText>OR</CardText>
        <CardText><strong>2: </strong>{question.optionTwo.text}</CardText>
      </CardBody>
      <CardFooter align='center'>
        {loggedin
          ?
          <Button
            tag={Link}
            size="lg"
            to={`/questions/${question.id}`}
            outline color={answered ? `primary` : `success`}
          >
            {answered ? `See votes` : `Vote!`}
          </Button>
          :
          <Button
            // tag={Link}
            // to={`/login`}
            // active={false}
            disabled={true}
          // outline color='info'
          >
            {answered ? `Log in to see votes` : `Log in to vote`}
          </Button>
        }
      </CardFooter>
    </Card >

  );
}

export default QCardMini;