import {
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    CLEAR_AUTH_ERROR,
} from "./ActionType";

const initialState = {
    user: null,
    jwt: null,
    error: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            return {
                ...state,
                user: action.payload.message,
                jwt: action.payload.jwt,
                error: null,
            };
        case LOGIN_FAILURE:
        case REGISTER_FAILURE:
            return {
                ...state,
                error: action.payload,
            };
        case LOGOUT:
            return initialState;

        case CLEAR_AUTH_ERROR:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

export default authReducer;