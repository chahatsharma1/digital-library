import axios from "axios";
import {FETCH_STUDENT_BOOKS_REQUEST, FETCH_STUDENT_BOOKS_SUCCESS, FETCH_STUDENT_BOOKS_FAILURE,} from "./ActionType";
import {API_BASE_URL} from "@/config/api.js";

export const fetchStudentBooks = (jwt) => async (dispatch) => {
    dispatch({ type: FETCH_STUDENT_BOOKS_REQUEST });

    try {
        const response = await axios.get(`${API_BASE_URL}/student/books`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        dispatch({type: FETCH_STUDENT_BOOKS_SUCCESS, payload: response.data,});
    } catch (error) {
        dispatch({
            type: FETCH_STUDENT_BOOKS_FAILURE,
            payload: error.message,
        });
    }
};