import api from "./axios-config";
import { JWT_TOKEN_KEY } from "./auth-service";

export const fetchProjects = _ => {
    const GET_ALL_PROJECT_QUERY = `query {
        projects {
            id
            tittle
            description
            icon
            status
            tasks {
                id
                tittle
                description
                comments
                status
                assignedTo
                projectId
                deadline
                updatedAt
                createdAt
            }
            requestedDevelopers {
                id
                profilePicUrl
                name
                username
                enabledM2F
                email
                githubProfile
                linkedInProfile
                authProvider
            }
            developers {
                id
                profilePicUrl
                name
                username
                enabledM2F
                email
                githubProfile
                linkedInProfile
                authProvider
            }
            createdBy {
                id
                profilePicUrl
                name
                username
                enabledM2F
                email
                githubProfile
                linkedInProfile
                authProvider
            }
            createdAt
        }
    }`;
    const authorization = localStorage.getItem(JWT_TOKEN_KEY);
    console.log("Backend call.")
    return api.post("/graphql", { query: GET_ALL_PROJECT_QUERY }, { headers: { Authorization: `Bearer ${authorization}` } });
};

export const fetchProject = id => {
    const GET_PROJECT_QUERY = `query {
        project(id: "${id}") {
            id
            tittle
            description
            icon
            status
            tasks {
                id
                tittle
                description
                comments
                status
                assignedTo
                projectId
                deadline
                updatedAt
                createdAt
            }
            requestedDevelopers {
                id
                profilePicUrl
                name
                username
                enabledM2F
                email
                githubProfile
                linkedInProfile
                authProvider
            }
            developers {
                id
                profilePicUrl
                name
                username
                enabledM2F
                email
                githubProfile
                linkedInProfile
                authProvider
            }
            createdBy {
                id
                profilePicUrl
                name
                username
                enabledM2F
                email
                githubProfile
                linkedInProfile
                authProvider
            }
            createdAt
        }
    }`;
    console.log("Backend call.")
    return api.post("/graphql", { query: GET_PROJECT_QUERY });
}

export const toggleProject = (projectId, status) => api.get(`/project/${projectId}/${status}`);

export const requestJoinProject = (projectId, userId) => api.get(`/project/${projectId}/request/${userId}`);

export const acceptJoinRequest = (projectId, userId) => api.get(`/project/${projectId}/accept/${userId}`);

export const rejectJoinRequest = (projectId, userId) => api.get(`/project/${projectId}/reject/${userId}`);