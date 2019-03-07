import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardFooter, CardHeader, CardText, CardTitle, Col } from 'reactstrap';
import { formatDate } from '../utils/helpers';



//TODO: Style
const QCardMini = props => {

  const { question, avatarURL, username, answered } = props
  // const { question, answered, handleClickCallback } = props

  // const handleClick = (e) => {
  //   e.preventDefault();
  //   handleClickCallback(question, answered)
  // }

  const handleMouseEnter = () => {
    //TODO: Mouseenter UX - highlight
  }

  const handleMouseLeave = () => {
    //TODO: Mouseleave UX - lowlight
  }


  return (

    <Card align='left' style={{ marginTop: '2em', marginBottom: '2em' }}>
      {/* <CardImg alt={question.author} top src={`../${avatarURL}`} /> */}
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
        <Button
          tag={Link}
          to={`/questions/${question.id}`}
          outline color={answered ? `primary` : `success`}
        >
          {answered ? `Vote!` : `See votes`}
        </Button>
      </CardFooter>
    </Card >

  );
}

export default QCardMini;

{/* <Link to={`/questions/${question.id}`}></Link> */ }
{/* <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      // onClick={handleClick}
      >
        <img height='30px' alt={question.author} width='30px' src={`../${avatarURL}`} />
        <h4>{formatDate(question.timestamp)}</h4>
        <h4>{question.optionOne.text}</h4>
        <p>OR</p>
        <h4>{question.optionTwo.text}</h4>
        <hr />
      </div> */}