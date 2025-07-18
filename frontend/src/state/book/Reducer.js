import {
    FETCH_BOOKS_REQUEST,
    FETCH_BOOKS_SUCCESS,
    FETCH_BOOKS_FAILURE,
    FETCH_ISSUES_SUCCESS,
    FETCH_ISSUES_BY_STUDENT_SUCCESS,
    ISSUE_BOOK_SUCCESS,
    ADD_BOOK_REQUEST,
    ADD_BOOK_SUCCESS,
    ADD_BOOK_FAILURE,
    FETCH_BOOKS_BY_LIBRARY_SUCCESS,
    FETCH_BOOKS_BY_LIBRARY_FAILURE,
    FETCH_BOOKS_BY_LIBRARY_REQUEST
} from "./ActionType";

const initialState = {
    books: [],
    issues: [],
    studentIssues: [],
    addedBook: null,
    issuedBook: null,
    loading: false,
    error: null,
};

export const bookReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_BOOKS_REQUEST:
        case ADD_BOOK_REQUEST:
        case FETCH_BOOKS_BY_LIBRARY_REQUEST:
            return { ...state, loading: true, error: null };

        case FETCH_BOOKS_SUCCESS:
        case FETCH_BOOKS_BY_LIBRARY_SUCCESS:
            return { ...state, books: action.payload, loading: false };

        case ADD_BOOK_SUCCESS:
            return { ...state, addedBook: action.payload, loading: false };

        case FETCH_ISSUES_SUCCESS:
            return { ...state, issues: action.payload };

        case FETCH_ISSUES_BY_STUDENT_SUCCESS:
            return { ...state, studentIssues: action.payload };

        case ISSUE_BOOK_SUCCESS:
            return { ...state, issuedBook: action.payload };

        case FETCH_BOOKS_FAILURE:
        case ADD_BOOK_FAILURE:
        case FETCH_BOOKS_BY_LIBRARY_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};

export default bookReducer;
