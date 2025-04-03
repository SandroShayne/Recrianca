import axios from "axios";
import { ISignup } from "../interfaces/ISignup";
import api from "./api";

export const signupService = async (userData: ISignup): Promise<any> => {
  try {
    const response = await api.post(`Usuarios`, userData, {
      headers: {
        accept: "text/plain",
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw error.response.data;
      }
      throw error.message;
    }
    throw new Error("An unexpected error occurred");
  }
};
