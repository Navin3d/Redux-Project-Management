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
        let userId;
        const jwt = response.data["access_token"];
        if (jwt) {
            userId = verifyJwt(jwt);
        }
        return getDeveloper().then(res => {
            return {
                ...res.data["data"]["developer"],
                authenticated: true,
                token: jwt,
            }
        });
    });

export const toggleM2F = (status) => {
    const userId = localStorage.getItem(USER_ID_KEY);
    const authorization = localStorage.getItem(JWT_TOKEN_KEY);
    return api.get(`/auth/${userId}/m2f/${status}`, { headers: { Authorization: `Bearer ${authorization}` } });
}

export const verifyJwt = jwt => {
    let userId = false;
    try {
        const decoded = jwtDecode(jwt);
        console.log("decoded: ", decoded);
        if (decoded.exp * 1000 < Date.now()) {
            logout();
            console.log("Token expired...");
        } else {
            userId = decoded.sub;
            localStorage.setItem(JWT_TOKEN_KEY, jwt);
            localStorage.setItem(IS_AUTHENTICATED_KEY, "true");
        }
    } catch (e) {
        console.log(e);
        localStorage.setItem(IS_AUTHENTICATED_KEY, "false");
    } finally {
        localStorage.setItem(USER_ID_KEY, userId);
        return userId;
    }
}

export const getDeveloper = _ => {
    const id = localStorage.getItem(USER_ID_KEY);
    const query = `query {
        developer (id: "${id}") {
            id
            profilePicUrl
            tasks {
                id
                tittle
                status
                description
                assignedTo
                projectId
            }
            projects {
                id
                tittle
                description
                icon
                status
            }
            requestedProjects {
                id
                tittle
                description
                icon
                status
            }
            createdProjects {
                id
                tittle
                description
                icon
                status
            }
        }
    }`;
    const authorization = localStorage.getItem(JWT_TOKEN_KEY);
    console.log("Backend call developer")
    return api.post(`/graphql`, { query }, { headers: { Authorization: `Bearer ${authorization}` } });
}

export const isAuthenticated = _ => localStorage.getItem(IS_AUTHENTICATED_KEY);

export const getProfile = id => {
    if (id == "me")
        id = localStorage.getItem(USER_ID_KEY);
    const query = `query {
        developer (id: "${id}") {
            name
            username
            email
            githubProfile
            linkedInProfile
            tasks {
                status
            }
            projects {
                id
                tittle
                icon
                status
            }
            requestedProjects {
                id
            }
            createdProjects {
                id
                tittle
                icon
                status
            }
        }
    }`;
    console.log("id ", id);
    const authorization = localStorage.getItem(JWT_TOKEN_KEY);
    console.log("Backend call profile")
    return api.post(`/graphql`, { query }, { headers: { Authorization: `Bearer ${authorization}` } })
}

export const logout = _ => {
    localStorage.removeItem(USER_ID_KEY);
    localStorage.removeItem(JWT_TOKEN_KEY);
    localStorage.removeItem(IS_AUTHENTICATED_KEY);
    verifyJwt("");
}
