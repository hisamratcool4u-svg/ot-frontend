import axios from "axios";

const API = axios.create({
  baseURL: "https://ot-backend-g90m.onrender.com/api",
});

export default API;
