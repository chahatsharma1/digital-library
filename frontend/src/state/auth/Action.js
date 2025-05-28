import {REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,} from "./ActionType";
import {API_BASE_URL} from "@/config/api.js";

export const registerUser = async (userData, dispatch) => {
    dispatch({ type: REGISTER_REQUEST });
    try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to register");
        }

        dispatch({ type: REGISTER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: REGISTER_FAILURE, error: error.message });
    }
};

export const loginUser = async (loginData, dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginData),
        });
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to login");
        }

        dispatch({ type: LOGIN_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: LOGIN_FAILURE, error: error.message });
    }
};
