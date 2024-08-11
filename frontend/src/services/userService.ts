import apiClient from "@/lib/apiClient";
import { ApiResponse } from "@/Types/type";

export const userService = {
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
