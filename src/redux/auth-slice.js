import { createSlice } from "@reduxjs/toolkit";
import { DEVELOPER } from "../data";
import { JWT_TOKEN_KEY, verifyJwt, logout } from "../services/auth-service";


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
        initUser: (state, action) => {
            state.id = action.payload.id;
            state.profilePicUrl = action.payload.profilePicUrl;
            state.tasks = action.payload.tasks;
            state.projects = action.payload.projects;
            state.requestedProjects = action.payload.requestedProjects;
            state.createdProjects = action.payload.createdProjects;
        },
        setToken: (state, action) => {
            const authenticated = verifyJwt(action.payload);
            state.token = action.payload;
            state.authenticated = authenticated;
        },
        toggleTask: (state, action) => {
            const { taskId, status } = action.payload;
            const taskToUpdate = state.tasks.find(item => item.id === taskId);
            if (taskToUpdate) {
                taskToUpdate.status = status;
            }
        },
        reset: (state) => {
            state.id = "";
            state.token = "";
            state.authenticated = false;
            logout();
            state = DEVELOPER;
        },
    },
});

export const { initUser, reset, setToken, toggleTask } = authSlice.actions;
export default authSlice.reducer;
