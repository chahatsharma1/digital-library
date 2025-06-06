import {FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, DELETE_USER_FAILURE,} from "./ActionType";

const initialState = {
    users: [],
    loading: false,
    error: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUEST:
        case DELETE_USER_REQUEST:
            return { ...state, loading: true, error: null };

        case FETCH_USERS_SUCCESS:
            return { ...state, loading: false, users: action.payload };

        case FETCH_USERS_FAILURE:
        case DELETE_USER_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case DELETE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                users: state.users.filter((user) => user.id !== action.payload),
            };

        default:
            return state;
    }
};

export default userReducer;