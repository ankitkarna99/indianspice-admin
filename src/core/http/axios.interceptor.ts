import { AxiosRequestConfig, AxiosResponse } from "axios";
import LocalStorageService from "../services/LocalStorageService";

export const requestInterceptor = (config: AxiosRequestConfig) => {
  const accessToken = LocalStorageService.getAccessToken();
  if (accessToken) {
    config.headers["Authorization"] = "Bearer " + accessToken;
  }

  return config;
};

export const requestErrorInterceptor = (error: any) => {
  return Promise.reject(error);
};

export const responseInterceptor = (response: AxiosResponse) => {
  return response;
};

export const responseErrorInterceptor = (error: any) => {
  //   if (error.response.status === 401) {
  //   }

  return Promise.reject(error);
};
