import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
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
  return response.data;
};

export const responseErrorInterceptor = (error: any) => {
  if (!error.response) {
    return Promise.reject("Unable to connect!");
  }

  if (error.response.status === 401) {
    return Promise.reject("Unauthorized!");
  }

  if (error.response?.data?.errors) {
    return Promise.reject(error.response?.data?.errors.join(""));
  } else {
    return Promise.reject("Something went wrong!");
  }
};
