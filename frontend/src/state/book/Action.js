import axios from "axios";
import {
    ADD_BOOK_REQUEST,
    ADD_BOOK_SUCCESS,
    ADD_BOOK_FAILURE,
    FETCH_BOOKS_REQUEST,
    FETCH_BOOKS_SUCCESS,
    FETCH_BOOKS_FAILURE,
    FETCH_ISSUES_SUCCESS,
    FETCH_ISSUES_BY_STUDENT_SUCCESS,
    ISSUE_BOOK_SUCCESS,
    FETCH_BOOKS_BY_LIBRARY_REQUEST,
    FETCH_BOOKS_BY_LIBRARY_SUCCESS,
    FETCH_BOOKS_BY_LIBRARY_FAILURE,
    ISSUE_BOOK_REQUEST, ISSUE_BOOK_FAILURE
} from "./ActionType";
import {API_BASE_URL} from "@/config/api.js";
import {toast} from "react-hot-toast";

export const addBook = (bookData, jwt ) => async (dispatch) => {
    dispatch({ type: ADD_BOOK_REQUEST });

    try {
        const response = await axios.post(`${API_BASE_URL}/librarian/book`, bookData, {
                headers: {
                    Authorization: `Bearer ${jwt}`,},
            }
        );
        dispatch({
            type: ADD_BOOK_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: ADD_BOOK_FAILURE,
            payload: error.response?.data?.message || error.message,
        });
    }
};


export const fetchBooks = (jwt) => async (dispatch) => {
    dispatch({ type: FETCH_BOOKS_REQUEST });
    try {
        const response = await axios.get(`${API_BASE_URL}/librarian/books`, {
            headers: { Authorization: `Bearer ${jwt}`,
            },
        });
        dispatch({ type: FETCH_BOOKS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({
            type: FETCH_BOOKS_FAILURE,
            payload: error.response?.data?.message || "Failed to fetch books",
        });
    }
};

export const fetchBooksByLibrary = (libraryId) => async (dispatch) => {
    dispatch({ type: FETCH_BOOKS_BY_LIBRARY_REQUEST });

    try {
        const res = await axios.get(`${API_BASE_URL}/libraries/${libraryId}/books`);
        dispatch({ type: FETCH_BOOKS_BY_LIBRARY_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({ type: FETCH_BOOKS_BY_LIBRARY_FAILURE, payload: error.message });
    }
};

export const fetchAllIssuesForStudent = (jwt) => async (dispatch) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/student/issues`, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
        dispatch({ type: FETCH_ISSUES_SUCCESS, payload: response.data });
    } catch (error) {
        console.error("Failed to fetch issued books", error);
    }
};

export const fetchAllIssues = (jwt) => async (dispatch) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/librarian/issues`, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
        dispatch({ type: FETCH_ISSUES_SUCCESS, payload: response.data });
    } catch (error) {
        console.error("Failed to fetch issued books", error);
    }
};

export const fetchIssuesByStudent = (studentId, jwt) => async (dispatch) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/librarian/issues/student/${studentId}`, {
            headers: { Authorization: jwt },
        });
        dispatch({ type: FETCH_ISSUES_BY_STUDENT_SUCCESS, payload: response.data });
    } catch (error) {
        console.error("Failed to fetch student issued books", error);
    }
};

export const issueBookToStudent = (bookId, studentId, token) => async (dispatch) => {
    dispatch({ type: ISSUE_BOOK_REQUEST });

    try {
        const response = await axios.post(`${API_BASE_URL}/librarian/issue`, null, {
                params: { bookId, studentId },
                headers: { Authorization: `Bearer ${token},` }
            }
        );

        dispatch({
            type: ISSUE_BOOK_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: ISSUE_BOOK_FAILURE,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const returnBook = (issueId, jwt) => async (dispatch) => {
    try {
        await axios.post(`${API_BASE_URL}/librarian/return?issueId=${issueId}`, {},
            { headers: { Authorization: `Bearer ${jwt}` } }
        );

        toast.success("Book returned successfully!");
        dispatch(fetchAllIssues(jwt));
    } catch (error) {
        console.error("Failed to return book", error);
        toast.error("Failed to return the book.");
    }
};

