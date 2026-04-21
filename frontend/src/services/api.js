import axios from "axios";

const API = axios.create({
  baseURL: "https://roomify-backend-ys5f.onrender.com/api"
});

export default API;