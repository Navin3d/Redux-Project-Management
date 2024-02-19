import { createSlice } from "@reduxjs/toolkit";
import { PROJECTS } from "../data";

const projectSlice = createSlice({
    name: "project",
    initialState: PROJECTS[0],
    reducers: {
        init: (state, action) => {
            if(action.payload)
                state = action.payload;
        },
        projectStatus: (state, action) => {
            state.status = action.payload;
        },
        requestJoin: (state, action) => {
            state.hasRequested = action.payload;
        },
        setFilter: (state, action) => {
            state.isAdmin = action.payload.isAdmin;
            state.isDeveloper = action.payload.isDeveloper;
            state.hasRequested = action.payload.hasRequested;
        }
    }
});

export const { init, projectStatus, requestJoin, setFilter } = projectSlice.actions;
export default projectSlice.reducer;
