import { JWT_TOKEN_KEY } from "./auth-service";
import api from "./axios-config";

export const toggleTaskStatus = (taskId, status) => {
    console.log("backend call toggleTaskStatus", `/task/${taskId}/status/${status}`);
    const authorization = localStorage.getItem(JWT_TOKEN_KEY);
    return api.get(`/task/${taskId}/status/${status}`, { headers: { Authorization: `Bearer ${authorization}` } });
}

export const commentTask = (taskId, comment) => {
    const authorization = localStorage.getItem(JWT_TOKEN_KEY);
    return api.get(`/task/${taskId}/comment/${comment}`, { headers: { Authorization: `Bearer ${authorization}` } });
}
