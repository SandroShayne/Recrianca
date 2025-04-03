import { jwtDecode } from "jwt-decode";
import { ILogin } from "../interfaces/ILogin";
import { IUser } from "../interfaces/IUser";
import api from "./api";

interface LoginResponse {
  jwtToken: string;
}

export const authService = {
  login: async (login: ILogin): Promise<{ token: string; user: IUser }> => {
    try {
      const response = await api.post<LoginResponse>(
        "Login/authenticate",
        {
          Email: login.email,
          Senha: login.senha,
        },
        {
          headers: {
            accept: "/",
            "Content-Type": "application/json",
          },
        }
      );

      const { jwtToken } = response.data;
      const decodedToken = jwtDecode<IUser>(jwtToken);

      api.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;

      return { token: jwtToken, user: decodedToken };
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  logout: async (): Promise<void> => {
    try {
      delete api.defaults.headers.common["Authorization"];
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  },
};
