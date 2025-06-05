import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/reducer";
import universityReducer from "@/state/university/Reducer.js";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        university: universityReducer,
    },
});
export default store;