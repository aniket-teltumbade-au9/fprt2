import { REGISTER, LOGIN, LOGOUT, IS_LOGGEDIN, REQUEST_PASS_TOKEN } from "../actionTypes";

const initialState = {
    userRegister: [],
    isAuth: false,
    userLogin: null,
    userProfile: null,
    pass_token: [],
}

const authReducer = (state = initialState, { type, payload }) => {
    switch (type) {

        case REGISTER:
            return {
                ...state,
                userRegister: [...state.userRegister, payload]
            }

        case LOGIN:
            return {
                ...state,
                isAuth: payload.isAuth,
                userLogin: payload.userLogin,
            }

        case REQUEST_PASS_TOKEN:
            return {
                ...state,
                pass_token: [...state.pass_token, payload]
            }

        case IS_LOGGEDIN:
            return {
                ...state,
                isAuth: payload.isAuth,
                userProfile: payload.userProfile.msg,
            }

        case LOGOUT:
            return {
                ...state,
                isAuth: false,
                userProfile: null,
            }

        default:
            return state
    }
}
export default authReducer