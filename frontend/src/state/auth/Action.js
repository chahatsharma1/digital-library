import {REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,} from "./ActionType";
import {API_BASE_URL} from "@/config/api.js";
import axios from "axios";

export const register = (userData) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });

    try {
        const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
        const user = response.data;
        console.log(response.data);
        dispatch({ type: REGISTER_SUCCESS, payload: user.jwt });
        localStorage.setItem("jwt", user.jwt);
        return Promise.resolve()
    } catch (error) {
        dispatch({ type: REGISTER_FAILURE, payload: error.message });
        return Promise.reject();
    }
};

export const login = (userData, navigate) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });

    try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, userData);
        const user = response.data;

        dispatch({ type: LOGIN_SUCCESS, payload: user.jwt });
        localStorage.setItem("jwt", user.jwt);
        navigate("/librarian");
        return { error: false };
    } catch (error) {
        dispatch({ type: LOGIN_FAILURE, payload: error.message });
        return { error: true, message: error.response?.data?.message || "User login failed" };
    }
};
