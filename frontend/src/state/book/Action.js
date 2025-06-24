import axios from "axios";
import {ADD_BOOK_REQUEST, ADD_BOOK_SUCCESS, ADD_BOOK_FAILURE, FETCH_BOOKS_REQUEST, FETCH_BOOKS_SUCCESS, FETCH_BOOKS_FAILURE, FETCH_ISSUES_SUCCESS, FETCH_ISSUES_BY_STUDENT_SUCCESS, ISSUE_BOOK_SUCCESS,    RETURN_BOOK_SUCCESS} from "./ActionType";
import {API_BASE_URL} from "@/config/api.js";

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

export const fetchAllIssues = (jwt) => async (dispatch) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/librarian/issues`, {
            headers: { Authorization: jwt },
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

export const issueBook = (bookId, studentId, jwt) => async (dispatch) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/librarian/issue?bookId=${bookId}&studentId=${studentId}`,
            {},
            { headers: { Authorization: jwt } }
        );
        dispatch({ type: ISSUE_BOOK_SUCCESS, payload: response.data });
    } catch (error) {
        console.error("Failed to issue book", error);
    }
};

export const returnBook = (issueId, jwt) => async (dispatch) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/librarian/return?issueId=${issueId}`,
            {},
            { headers: { Authorization: jwt } }
        );
        dispatch({ type: RETURN_BOOK_SUCCESS, payload: response.data });
    } catch (error) {
        console.error("Failed to return book", error);
    }
};
