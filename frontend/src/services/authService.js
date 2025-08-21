import axios from "axios";

const BASE_URL = "http://localhost:5000/api/auth";

export const signup = (data) => axios.post(`${BASE_URL}/signup`, data);

export const login = (data) => axios.post(`${BASE_URL}/login`, data);
