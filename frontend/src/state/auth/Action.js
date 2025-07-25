import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT, CLEAR_AUTH_ERROR,
} from "./ActionType";
import {API_BASE_URL} from "@/config/api.js";
import axios from "axios";

export const register = (userData) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });

    try {
        const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
        const user = response.data;
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

        const role = userData.role;

        if (role === "ROLE_ADMIN") navigate("/admin");
        else if (role === "ROLE_LIBRARIAN") navigate("/librarian");
        else navigate("/student");

        return { error: false };
    } catch (error) {
        console.log(error.response.data.message);
        dispatch({ type: LOGIN_FAILURE, payload: error.response.data.message });
        return {
            error: true,
            message: error.response?.data?.message || "AdminStudent login failed",
        };
    }
};

export const clearAuthError = () => (dispatch) => {
    dispatch({ type: CLEAR_AUTH_ERROR });
};


export const logout = () => (dispatch) => {
    localStorage.removeItem("jwt");
    dispatch({ type: LOGOUT });
};
