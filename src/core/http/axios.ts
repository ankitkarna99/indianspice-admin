import axios from "axios";
import AppConstants from "../../common/constants/AppConstants";

import {
  requestErrorInterceptor,
  requestInterceptor,
  responseErrorInterceptor,
  responseInterceptor,
} from "./axios.interceptor";

const axiosInstance = axios.create({
  baseURL: AppConstants.BASE_URL,
});

axiosInstance.interceptors.request.use(
  requestInterceptor,
  requestErrorInterceptor
);
axiosInstance.interceptors.response.use(
  responseInterceptor,
  responseErrorInterceptor
);

export default axiosInstance;
