import axios from "axios";
import { getAccessToken } from "@/utils/tokenService";
export const apiClient = axios.create({
  baseURL: "http://192.168.0.177:3000/api/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

const publicEndPoints = ["/auth/login", "/auth/register", "/auth/verify"];

apiClient.interceptors.request.use(
  (config) => {
    const isPublicEndPoint = publicEndPoints.some((url) =>
      config.url?.includes(url),
    );
    if (!isPublicEndPoint) {
      const token = getAccessToken();

      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);
