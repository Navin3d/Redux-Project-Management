import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./auth-slice";

const store = configureStore({
    initialState: {},
    reducer: {
        auth: authReducer
    },
});

export default store;
