import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "https://ot-backend-g90m.onrender.com/api",
});

export default API;
