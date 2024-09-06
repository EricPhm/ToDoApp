const SET_LOGIN_STATUS = 'SET_LOGIN_STATUS';


const initialState = {
    isLoggedIn: false
}

// action
export const setLoginStatus = (status) => {
    return {
        type: SET_LOGIN_STATUS,
        payload: status
    }
}


// reducer
const LoginStatusReducer = (state = initialState, action) => {
    switch (action.type){
        case SET_LOGIN_STATUS:
            return {
                ...state,
                isLoggedIn: action.payload
            }
        default:
            return state
    }
}

export default LoginStatusReducer