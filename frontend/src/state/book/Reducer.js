import {
    FETCH_BOOKS_REQUEST,
    FETCH_BOOKS_SUCCESS,
    FETCH_BOOKS_FAILURE,
    FETCH_ISSUES_SUCCESS,
    FETCH_ISSUES_BY_STUDENT_SUCCESS,
    ISSUE_BOOK_SUCCESS,
    RETURN_BOOK_SUCCESS,
} from "./ActionType";

const initialState = {
    books: [],
    issues: [],
    studentIssues: [],
    loading: false,
    error: null,
};

export const bookReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_BOOKS_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_BOOKS_SUCCESS:
            return { ...state, books: action.payload, loading: false };
        case FETCH_BOOKS_FAILURE:
            return { ...state, loading: false, error: action.payload };

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

        default:
            return state;
    }
};
