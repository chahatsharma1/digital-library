import {
    FETCH_UNIVERSITIES_REQUEST,
    FETCH_UNIVERSITIES_SUCCESS,
    FETCH_UNIVERSITIES_FAILURE,
    FETCH_MY_UNIVERSITY_SUCCESS,
    FETCH_MY_UNIVERSITY_FAILURE,
    UPDATE_UNIVERSITY_REQUEST,
    UPDATE_UNIVERSITY_SUCCESS,
    UPDATE_UNIVERSITY_FAILURE,
    DELETE_UNIVERSITY_REQUEST,
    DELETE_UNIVERSITY_SUCCESS,
    DELETE_UNIVERSITY_FAILURE,
    FETCH_MY_UNIVERSITY_REQUEST,
} from "./ActionType";
import axios from "axios";
import {API_BASE_URL} from "@/config/api.js";

export const fetchUniversities = () => async (dispatch) => {
    dispatch({ type: FETCH_UNIVERSITIES_REQUEST });

    try {
        const response = await axios.get(`${API_BASE_URL}/libraries/universities`);
        dispatch({ type: FETCH_UNIVERSITIES_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({
            type: FETCH_UNIVERSITIES_FAILURE,
            payload: error.message || "Failed to fetch universities",
        });
    }
};

export const fetchMyUniversity = (jwt) => async (dispatch) => {
    dispatch({ type: FETCH_MY_UNIVERSITY_REQUEST });
    try {
        const res = await axios.get(`${API_BASE_URL}/university/my`, {
            headers:
                { Authorization: `Bearer ${jwt}` }
        },);
        dispatch({ type: FETCH_MY_UNIVERSITY_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({
            type: FETCH_MY_UNIVERSITY_FAILURE,
            payload: error.message || "Failed to fetch university",
        });
    }
};

export const updateUniversity = (data, jwt) => async (dispatch) => {
    dispatch({ type: UPDATE_UNIVERSITY_REQUEST });
    try {
        await axios.put(`${API_BASE_URL}/university/update`, data, {
            headers:
                { Authorization: `Bearer ${jwt}` }
        },);
        dispatch({ type: UPDATE_UNIVERSITY_SUCCESS });
    } catch (error) {
        dispatch({
            type: UPDATE_UNIVERSITY_FAILURE,
            payload: error.message || "Failed to update university",
        });
    }
};

export const deleteUniversity = (jwt) => async (dispatch) => {
    dispatch({ type: DELETE_UNIVERSITY_REQUEST });
    try {
        await axios.delete(`${API_BASE_URL}/university/delete`, {
            headers:
                { Authorization: `Bearer ${jwt}` }
        },);
        dispatch({ type: DELETE_UNIVERSITY_SUCCESS });
    } catch (error) {
        dispatch({
            type: DELETE_UNIVERSITY_FAILURE,
            payload: error.message || "Failed to delete university",
        });
    }
};
