import axios from "axios";


const JWT_TOKEN_KEY = "prg-mg-token";

export const BASE_URL = "http://localhost:8080";
export const authorization = localStorage.getItem(JWT_TOKEN_KEY);

const api = axios.create({
    baseURL: BASE_URL,
    Headers: { authorization: `Bearer: ${authorization}` }
});

export default api;