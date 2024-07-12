import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";

const config = {
  baseURL: "https://server.ganghannal.life/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
};

const api: AxiosInstance = axios.create(config);

// api.interceptors.request.use(
//   (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
//     // 요청 전에 수행할 작업
//     return config;
//   },
//   (error: any) => {
//     return Promise.reject(error);
//   }
// );

// api.interceptors.response.use(
//   (response: AxiosResponse): AxiosResponse => {
//     return response;
//   },
//   (error: any) => {
//     return Promise.reject(error);
//   }
// );

export default api;
