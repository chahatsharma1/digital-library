import {
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAILURE,
    FETCH_LIBRARIAN_REQUEST,
    FETCH_LIBRARIAN_SUCCESS,
    FETCH_LIBRARIAN_FAILURE,
    FETCH_UNIVERSITY_STAFF_REQUEST,
    FETCH_UNIVERSITY_STAFF_FAILURE,
    FETCH_UNIVERSITY_STAFF_SUCCESS,
    UPDATE_USER_PROFILE_REQUEST,
    FETCH_USER_PROFILE_REQUEST,
    FETCH_USER_PROFILE_SUCCESS,
    UPDATE_USER_PROFILE_SUCCESS,
    UPDATE_USER_PROFILE_FAILURE,
    FETCH_USER_PROFILE_FAILURE,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_FAILURE,
    CHANGE_PASSWORD_REQUEST,
} from "./ActionType";

const initialState = {
    users: [],
    userProfile: null,
    staff: [],
    librarian: null,
    loading: false,
    error: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUEST:
        case DELETE_USER_REQUEST:
        case FETCH_LIBRARIAN_REQUEST:
        case FETCH_UNIVERSITY_STAFF_REQUEST:
        case FETCH_USER_PROFILE_REQUEST:
        case UPDATE_USER_PROFILE_REQUEST:
        case CHANGE_PASSWORD_REQUEST:
            return { ...state, loading: true, error: null };

        case FETCH_USERS_SUCCESS:
            return { ...state, loading: false, users: action.payload };

        case FETCH_LIBRARIAN_SUCCESS:
            return { ...state, loading: false, librarian: action.payload };

        case FETCH_USER_PROFILE_SUCCESS:
            return { ...state, loading: false, userProfile: action.payload, error: null };

        case UPDATE_USER_PROFILE_SUCCESS:
            return { ...state, loading: false, error: null };

        case DELETE_USER_SUCCESS:
            return {...state, loading: false, users: state.users.filter((user) => user.id !== action.payload), librarian: state.librarian?.id === action.payload ? null : state.librarian,};

        case FETCH_UNIVERSITY_STAFF_SUCCESS:
            return {...state, loading: false, staff: action.payload,};

        case CHANGE_PASSWORD_SUCCESS:
            return {...state, loading: false, error: null,};

        case FETCH_USER_PROFILE_FAILURE:
        case UPDATE_USER_PROFILE_FAILURE:
        case FETCH_USERS_FAILURE:
        case DELETE_USER_FAILURE:
        case FETCH_LIBRARIAN_FAILURE:
        case FETCH_UNIVERSITY_STAFF_FAILURE:
        case CHANGE_PASSWORD_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};

export default userReducer;