import axios from "../../axios";

interface LoginResponse {
  message: string;
  token: string;
}

export default class AuthApi {
  static login(data: any): Promise<LoginResponse> {
    return axios.post("/auth/login", data);
  }
}
