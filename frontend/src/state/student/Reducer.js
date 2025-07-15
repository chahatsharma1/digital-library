import {FETCH_STUDENT_BOOKS_REQUEST, FETCH_STUDENT_BOOKS_SUCCESS, FETCH_STUDENT_BOOKS_FAILURE,} from "./ActionType";

const initialState = {
    studentBooks: [],
    loading: false,
    error: null,
};

const studentReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_STUDENT_BOOKS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_STUDENT_BOOKS_SUCCESS:
            return {
                ...state,
                loading: false,
                studentBooks: action.payload,
            };
        case FETCH_STUDENT_BOOKS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default studentReducer;