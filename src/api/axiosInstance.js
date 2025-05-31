import axios from "axios";



export const axiosInstance = axios.create({
  baseURL: "http://3.68.159.72:8080/",
  timeout: 8000,
  headers: { Accept: "application/json" },
});

