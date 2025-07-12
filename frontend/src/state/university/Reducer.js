import {FETCH_UNIVERSITIES_REQUEST, FETCH_UNIVERSITIES_SUCCESS, FETCH_UNIVERSITIES_FAILURE, FETCH_MY_UNIVERSITY_REQUEST, FETCH_MY_UNIVERSITY_SUCCESS, FETCH_MY_UNIVERSITY_FAILURE, UPDATE_UNIVERSITY_REQUEST,
    UPDATE_UNIVERSITY_SUCCESS,
    UPDATE_UNIVERSITY_FAILURE,
    DELETE_UNIVERSITY_REQUEST,
    DELETE_UNIVERSITY_SUCCESS,
    DELETE_UNIVERSITY_FAILURE,
} from "./ActionType";

const initialState = {
    universities: [],
    university: null,
    loading: false,
    error: null,
};

const universityReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_UNIVERSITIES_REQUEST:
        case FETCH_MY_UNIVERSITY_REQUEST:
        case UPDATE_UNIVERSITY_REQUEST:
        case DELETE_UNIVERSITY_REQUEST:
            return {...state, loading: true, error: null};

        case FETCH_UNIVERSITIES_SUCCESS:
            return {...state, loading: false, universities: action.payload};

        case FETCH_MY_UNIVERSITY_SUCCESS:
            return {...state, loading: false, university: action.payload};

        case UPDATE_UNIVERSITY_SUCCESS:
        case DELETE_UNIVERSITY_SUCCESS:
            return {...state, loading: false};

        case FETCH_UNIVERSITIES_FAILURE:
        case FETCH_MY_UNIVERSITY_FAILURE:
        case UPDATE_UNIVERSITY_FAILURE:
        case DELETE_UNIVERSITY_FAILURE:
            return {...state, loading: false, error: action.payload};

        default:
            return state;
    }
};

export default universityReducer;