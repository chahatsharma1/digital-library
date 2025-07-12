import axios from "axios";
import {FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, DELETE_USER_FAILURE, ADD_LIBRARIAN_SUCCESS, FETCH_LIBRARIAN_SUCCESS, FETCH_LIBRARIAN_FAILURE, FETCH_LIBRARIAN_REQUEST,} from "./ActionType";

import { API_BASE_URL } from "@/config/api.js";

export const fetchStudents = (jwt) => async (dispatch) => {
    dispatch({ type: FETCH_USERS_REQUEST });

    try {
        const response = await axios.get(`${API_BASE_URL}/admin/students`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        dispatch({ type: FETCH_USERS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({
            type: FETCH_USERS_FAILURE,
            payload: error.message || "Failed to fetch users",
        });
    }
};

export const fetchLibrarian = (jwt) => async (dispatch) => {
    dispatch({ type: FETCH_LIBRARIAN_REQUEST });
    try {
        const res = await axios.get(`${API_BASE_URL}/admin/librarian`, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
        dispatch({ type: FETCH_LIBRARIAN_SUCCESS, payload: res.data });
    } catch (err) {
        if (err.response?.status === 404) {
            dispatch({ type: FETCH_LIBRARIAN_SUCCESS, payload: null });
        } else {
            dispatch({ type: FETCH_LIBRARIAN_FAILURE, payload: err.message });
        }
    }
};

export const addLibrarian = (formData, jwt) => async (dispatch) => {
    const res = await axios.post(`${API_BASE_URL}/admin/add`, formData, {
        headers: {
            Authorization: `Bearer ${jwt}` },
    });
    dispatch({ type: ADD_LIBRARIAN_SUCCESS, payload: res.data });
};

export const deleteUser = (userId, jwt) => async (dispatch) => {
    dispatch({ type: DELETE_USER_REQUEST });

    try {
        await axios.delete(`${API_BASE_URL}/admin/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        dispatch({ type: DELETE_USER_SUCCESS, payload: userId });
    } catch (error) {
        dispatch({
            type: DELETE_USER_FAILURE,
            payload: error.message || "Failed to delete user",
        });
    }
};
