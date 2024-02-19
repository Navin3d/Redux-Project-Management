import api from "./axios-config";


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
    return api.post("/graphql", { query: GET_PROJECT_QUERY });
}

export const toggleProject = (projectId, status) => api.get(`/project/${projectId}/${status}`);

export const requestJoinProject = (projectId, userId) => api.get(`/project/${projectId}/request/${userId}`);

export const acceptJoinRequest = (projectId, userId) => api.get(`/project/${projectId}/accept/${userId}`);

export const rejectJoinRequest = (projectId, userId) => api.get(`/project/${projectId}/reject/${userId}`);
