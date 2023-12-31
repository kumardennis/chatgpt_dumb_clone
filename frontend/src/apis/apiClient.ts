import axios, { AxiosRequestConfig } from "axios";

export const localUrl = "http://localhost:5000";
export const liveUrl = "https://dumb-gpt-backend.onrender.com";

const axiosInstance = axios.create({
  baseURL: liveUrl,
  headers: {
    "Content-type": "application/json",
  },
});

export const apiClient = {
  get: (url: string) =>
    axiosInstance
      .get(url, { withCredentials: true })
      .then((response) => response.data),
  put: (url: string, body: any) =>
    axiosInstance.put(url, body).then((response) => response.data),
  post: (url: string, body: any) =>
    axiosInstance.post(url, body).then((response) => response.data),
  delete: (url: string, body: any) =>
    axiosInstance.delete(url, body).then((response) => response.data),
};
