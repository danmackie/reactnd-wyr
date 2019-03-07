import { getInitialData } from '../utils/api'
import { receiveQuestions } from './questions'
import { receiveUsers } from '../actions/users'
import { setAuthedUser } from '../actions/authedUser'
import { showLoading, hideLoading } from 'react-redux-loading' 

// const AUTHED_ID = 'tylermcginnis'

export function handleInitialData () {
    return(dispatch) => {
        dispatch(showLoading())
        return getInitialData()
            .then(({ users, questions }) => {
               dispatch(receiveUsers(users))
               dispatch(receiveQuestions(questions))
               dispatch(setAuthedUser(''))
               dispatch(hideLoading())
            })
    }
}