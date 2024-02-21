import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./auth-slice";
import profileReducer from './profile-slice';
import projectReducer from "./project-slice";
import settingsReducer from './settings-slice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        project: projectReducer,
        profile: profileReducer,
        settings: settingsReducer,
    },
});

export default store;
