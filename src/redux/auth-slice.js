import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";


const USER_ID_KEY = "prg-mg-id";
const IS_AUTHENTICATED_KEY = "prg-mg-auth";
const JWT_TOKEN_KEY = "prg-mg-token";

const initialState = {
    name: "Navin3d",
    userId: localStorage.getItem(USER_ID_KEY),
    profilePic: "https://avatars.githubusercontent.com/u/71096790?v=4",
    authenticated: localStorage.getItem(IS_AUTHENTICATED_KEY),
    token: localStorage.getItem(JWT_TOKEN_KEY),
};

const verifyJwt = (jwt) => {
    let userId = false;
    try {
        const decoded = jwtDecode(jwt);
        console.log("decoded: ", decoded);
        userId = decoded;
        localStorage.setItem(JWT_TOKEN_KEY, jwt);
        localStorage.setItem(IS_AUTHENTICATED_KEY, true);
    } catch (e) {
        console.log(e);
        localStorage.setItem(IS_AUTHENTICATED_KEY, false);
    } finally {
        localStorage.setItem(USER_ID_KEY, userId);
        return userId;
    }
}

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
