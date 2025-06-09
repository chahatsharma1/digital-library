import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/reducer";
import universityReducer from "@/state/university/Reducer.js";
import userReducer from "@/state/user/Reducer.js";
import {bookReducer} from "@/state/book/Reducer.js";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        university: universityReducer,
        user: userReducer,
        book: bookReducer,
    },
});
export default store;