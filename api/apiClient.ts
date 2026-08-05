import axios from "axios";
import { getAccessToken, getRefreshToken, saveToken, removeToken } from "@/utils/tokenService";

export const apiClient = axios.create({
  baseURL: "http://192.168.0.173:3000/api/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

const publicEndPoints = ["/auth/login", "/auth/register", "/auth/verify", "/auth/refresh"];

apiClient.interceptors.request.use(
  async (config) => {
    const isPublicEndPoint = publicEndPoints.some((url) =>
      config.url?.includes(url),
    );
    if (!isPublicEndPoint) {
      const token = await getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Registered by AuthProvider on mount so this file doesn't need to import it
// directly (would create a provider <-> apiClient circular dependency).
let onAuthFailure: (() => void) | null = null;
export const setOnAuthFailure = (handler: (() => void) | null) => {
  onAuthFailure = handler;
};

// Coalesces concurrent 401s into a single refresh call instead of firing one
// refresh request per failed request.
let refreshPromise: Promise<string | null> | null = null;

const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = await getRefreshToken();
  if (!refreshToken) return null;

  try {
    const { data } = await axios.post(`${apiClient.defaults.baseURL}/auth/refresh`, {
      refreshToken,
    });
    const { accessToken, refreshToken: newRefreshToken } = data.data;
    await saveToken(accessToken, newRefreshToken);
    return accessToken as string;
  } catch (error) {
    return null;
  }
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const isPublicEndPoint = publicEndPoints.some((url) =>
      originalRequest?.url?.includes(url),
    );

    if (error.response?.status === 401 && !isPublicEndPoint && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!refreshPromise) {
        refreshPromise = refreshAccessToken().finally(() => {
          refreshPromise = null;
        });
      }

      const newAccessToken = await refreshPromise;
      if (newAccessToken) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      }

      await removeToken();
      onAuthFailure?.();
    }

    return Promise.reject(error);
  },
);
