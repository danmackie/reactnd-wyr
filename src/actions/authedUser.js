export const SET_AUTHED_USER = 'SET_AUTHED_USER'
export const SET_AUTHED_USER_LOG_OUT = 'SET_AUTHED_USER_LOG_OUT'

export function setAuthedUser (id) {
    return {
        type: SET_AUTHED_USER,
        id,
    }
}

export function setAuthedUserLogout (id) {
    return {
        type: SET_AUTHED_USER_LOG_OUT,
        id,
    }
}