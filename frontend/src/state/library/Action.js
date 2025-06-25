import axios from "axios";
import {FETCH_LIBRARIES_REQUEST, FETCH_LIBRARIES_SUCCESS, FETCH_LIBRARIES_FAILURE, FETCH_LIBRARY_BY_ID_REQUEST, FETCH_LIBRARY_BY_ID_SUCCESS, FETCH_LIBRARY_BY_ID_FAILURE} from "./ActionType";

import { API_BASE_URL } from "@/config/api.js";

export const fetchLibraries = () => async (dispatch) => {
    dispatch({ type: FETCH_LIBRARIES_REQUEST });

    try {
        const response = await axios.get(`${API_BASE_URL}/libraries`);
        dispatch({ type: FETCH_LIBRARIES_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({
            type: FETCH_LIBRARIES_FAILURE,
            payload: error.message || "Failed to fetch libraries",
        });
    }
};

export const fetchLibraryById = (id) => async (dispatch) => {
    dispatch({ type: FETCH_LIBRARY_BY_ID_REQUEST });

    try {
        const response = await axios.get(`${API_BASE_URL}/libraries/${id}`);
        dispatch({ type: FETCH_LIBRARY_BY_ID_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({
            type: FETCH_LIBRARY_BY_ID_FAILURE,
            payload: error.message || "Failed to fetch library",
        });
    }
};
