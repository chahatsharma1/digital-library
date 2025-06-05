import {FETCH_UNIVERSITIES_REQUEST, FETCH_UNIVERSITIES_SUCCESS, FETCH_UNIVERSITIES_FAILURE,} from "./ActionType";

const initialState = {
    universities: [],
    loading: false,
    error: null,
};

const universityReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_UNIVERSITIES_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_UNIVERSITIES_SUCCESS:
            return {
                ...state,
                loading: false,
                universities: action.payload,
            };
        case FETCH_UNIVERSITIES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default universityReducer;