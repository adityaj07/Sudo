import apiClient from "@/lib/apiClient";
import { ApiResponse, AuthData } from "@/Types/type";

export const userService = {
  signIn: async (data: Pick<AuthData, "email" | "password">) => {
    let res;
    try {
      res = await apiClient.post<ApiResponse>("/users/sign-in", data);
      return res.data;
    } catch (error) {
      console.log("Error in userService.signIn: ", error);
      throw new Error(res?.data.message);
    }
  },

  userInfo: async () => {
    let res;
    try {
      res = await apiClient.get<ApiResponse>("/users/me");
      return res.data;
    } catch (error) {
      console.log("Error in userService.userInfo: ", error);
      throw new Error(res?.data.message);
    }
  },

  signUp: async (data: AuthData) => {
    let res;
    try {
      res = await apiClient.post<ApiResponse>("/users/sign-up", data);
      return res.data;
    } catch (error) {
      console.log("Error in userService.signUp: ", error);
      throw new Error(res?.data.message);
    }
  },

  logout: async () => {
    let res;
    try {
      res = await apiClient.post<ApiResponse>("/users/logout");
      return res.data;
    } catch (error) {
      console.log("Error in userService.logout: ", error);
      throw new Error(res?.data.message);
    }
  },
};
