// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api/v1", // backend URL
  withCredentials: true, // include cookies for auth
});

export default api;
