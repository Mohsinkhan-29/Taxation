import axios from "axios";

const API = axios.create({
  baseURL: "https://taxation-6e0q.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: global response/error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error?.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default API;
