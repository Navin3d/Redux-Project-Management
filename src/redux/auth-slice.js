import { createSlice } from "@reduxjs/toolkit";
import { USER_ID_KEY, JWT_TOKEN_KEY, IS_AUTHENTICATED_KEY, verifyJwt } from "../services/auth-service";


const initialState = {
    name: "Navin3d",
    userId: localStorage.getItem(USER_ID_KEY),
    profilePic: "https://avatars.githubusercontent.com/u/71096790?v=4",
    authenticated: localStorage.getItem(IS_AUTHENTICATED_KEY),
    token: localStorage.getItem(JWT_TOKEN_KEY),
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        init: (state, action) => {
            state = action;
        },
        setToken: (state, action) => {
            const token = verifyJwt(action.payload);
            state.token = token;
            state.authenticated = token && true;
        },
        reset: (state) => {
            state = {};
        },
    },
});

export const { init, reset, setToken } = authSlice.actions;

export default authSlice.reducer;
