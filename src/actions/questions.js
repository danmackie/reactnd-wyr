import { saveQuestion, saveQuestionAnswer } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'

function addQuestion (question) {
  return {
    type: ADD_QUESTION,
    question,
  }
}

export function handleAddQuestion ({optionOneText, optionTwoText, author}) {
  const question = {
    optionOneText,
    optionTwoText,
    author,
  }
  return (dispatch) => {
    dispatch(showLoading())
    return saveQuestion(question)
      .then((question) => dispatch(addQuestion(question)))
      .then(() => dispatch(hideLoading()))
  }
}

export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

function answerQuestion(authedUser, qid, answer) {
  return {
    type: ANSWER_QUESTION,
    authedUser,
    qid,
    answer,
  };
}

export function handleAnswerQuestion(question, { authedUser, qid, answer }) {
  return function(dispatch) {
    dispatch(showLoading())
    return saveQuestionAnswer({ authedUser, qid, answer })
      .then(() => dispatch(answerQuestion(authedUser, qid, answer)))
        .then(() => dispatch(hideLoading()))
  }
}