import {FETCH_UNIVERSITIES_REQUEST, FETCH_UNIVERSITIES_SUCCESS, FETCH_UNIVERSITIES_FAILURE,} from "./ActionType";
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
