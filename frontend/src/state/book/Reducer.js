import {
    FETCH_BOOKS_REQUEST,
    FETCH_BOOKS_SUCCESS,
    FETCH_BOOKS_FAILURE,
    FETCH_ISSUES_SUCCESS,
    FETCH_ISSUES_BY_STUDENT_SUCCESS,
    ISSUE_BOOK_SUCCESS,
    RETURN_BOOK_SUCCESS,
    ADD_BOOK_REQUEST,
    ADD_BOOK_SUCCESS,
    ADD_BOOK_FAILURE,
    FETCH_BOOKS_BY_LIBRARY_SUCCESS, FETCH_BOOKS_BY_LIBRARY_FAILURE, FETCH_BOOKS_BY_LIBRARY_REQUEST,
} from "./ActionType";

const initialState = {
    books: [],
    issues: [],
    studentIssues: [],
    addedBook: null,
    loading: false,
    error: null,
}

export const bookReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_BOOKS_BY_LIBRARY_REQUEST:
        case ADD_BOOK_REQUEST:
        case FETCH_BOOKS_REQUEST:
            return { ...state, loading: true, error: null };

        case ADD_BOOK_SUCCESS:
            return { ...state, loading: false, addedBook: action.payload };

        case FETCH_BOOKS_SUCCESS:
            return { ...state, books: action.payload, loading: false };

        case FETCH_ISSUES_SUCCESS:
            return { ...state, issues: action.payload };

        case FETCH_ISSUES_BY_STUDENT_SUCCESS:
            return { ...state, studentIssues: action.payload };

        case ISSUE_BOOK_SUCCESS:
            return { ...state, issues: [...state.issues, action.payload] };

        case RETURN_BOOK_SUCCESS:
            return {
                ...state,
                issues: state.issues.map((issue) =>
                    issue.id === action.payload.id ? action.payload : issue
                ),
            };


        case FETCH_BOOKS_BY_LIBRARY_SUCCESS:
            return { ...state, loading: false, books: action.payload };

        case FETCH_BOOKS_FAILURE:
        case ADD_BOOK_FAILURE:
        case FETCH_BOOKS_BY_LIBRARY_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};
export default bookReducer;