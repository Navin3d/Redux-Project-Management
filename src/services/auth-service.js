import { jwtDecode } from "jwt-decode";
import api from "./axios-config";


export const USER_ID_KEY = "prg-mg-id";
export const IS_AUTHENTICATED_KEY = "prg-mg-auth";
export const JWT_TOKEN_KEY = "prg-mg-token";

export const isM2FEnabled = emailId => api.get(`/auth/${emailId}`)
    .then(response => ({
        status: response.status,
        data: response.data
    }));

export const login = data => api.post(`/auth/login`, data)
    .then(response => {
        let authenticated;
        const jwt = response.data["access_token"];
        if (jwt) {
            authenticated = verifyJwt(jwt);
        }
        return authenticated;
    });


export const verifyJwt = jwt => {
    let userId = false;
    try {
        const decoded = jwtDecode(jwt);
        console.log("decoded: ", decoded);
        userId = decoded.sub;
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

export const isAuthenticated = _ => localStorage.getItem(IS_AUTHENTICATED_KEY);
