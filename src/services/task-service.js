import api from "./axios-config";

export const toggleTaskStatus = (taskId, status) => api.get(`/task/${taskId}/status/${status}`);

export const commentTask = (taskId, comment) => api.get(`/task/${taskId}/comment/${comment}`);
