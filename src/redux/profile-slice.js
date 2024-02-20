import { createSlice } from "@reduxjs/toolkit";
import { DEVELOPER } from "../data";

const initialState = {
    ...DEVELOPER,
    showProfile: false,
    backlogTaskCount: 0,
    backlogProjectCount: 0,
    requestedProjectCount: 0,
}

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setProfile: (state, action) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.username = action.payload.username;
            state.linkedInProfile = action.payload.linkedInProfile;
            state.githubProfile = action.payload.githubProfile;
            state.projects = action.payload.projects;
            state.createdProjects = action.payload.createdProjects;
            state.backlogTaskCount = action.payload.tasks?.filter(task => task.status == true).length;
            state.backlogProjectCount = action.payload.projects?.filter(project => project.status == true).length;
            state.requestedProjectCount = action.payload.requestedProjects?.length;
            state.showProfile = true;
        },
        toggleProfile: (state) => {
            state.showProfile = false;
        },
    }
});

export const { setProfile, toggleProfile } = profileSlice.actions;
export default profileSlice.reducer;
