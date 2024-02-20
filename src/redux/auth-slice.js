import { createSlice } from "@reduxjs/toolkit";
import { DEVELOPER } from "../data";
import { JWT_TOKEN_KEY, verifyJwt } from "../services/auth-service";


const token = localStorage.getItem(JWT_TOKEN_KEY);
const authenticated = verifyJwt(token);

const initialState = {
    ...DEVELOPER,
    authenticated,
    token,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        init: (state, action) => {
            state.id = action.payload.id;
            state.profilePicUrl = action.payload.profilePicUrl;
            state.projects = action.payload.projects;
            state.requestedProjects = action.payload.requestedProjects;
            state.createdProjects = action.payload.createdProjects;
        },
        setToken: (state, action) => {
            const authenticated = verifyJwt(action.payload);
            state.token = action.payload;
            state.authenticated = authenticated;
        },
        reset: (state) => {
            state = {};
        },
    },
});

export const { init, reset, setToken } = authSlice.actions;
export default authSlice.reducer;
