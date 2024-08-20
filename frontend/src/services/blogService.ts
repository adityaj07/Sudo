import apiClient from "@/lib/apiClient";
import {
  Blog,
  DeleteBlogResponse,
  GetBlogByIdResponse,
  GetBlogsResponse,
} from "@/Types/type";

export const blogService = {
  getLatestBlogs: async (
    page = 1,
    pageSize = 10
  ): Promise<GetBlogsResponse> => {
    try {
      const response = await apiClient.get<GetBlogsResponse>("/blogs", {
        params: { page, pageSize },
      });
      return response.data;
    } catch (error) {
      console.error("Error in getLatestBlogs:", error);
      throw new Error("Failed to fetch latest blogs");
    }
  },

  getMyBlogs: async (
    page = 1,
    pageSize = 10
  ): Promise<GetBlogsResponse> => {
    try {
      const response = await apiClient.get<GetBlogsResponse>("/users/blogs", {
        params: { page, pageSize },
      });
      return response.data;
    } catch (error) {
      console.error("Error in getMyBlogs:", error);
      throw new Error("Failed to fetch my blogs");
    }
  },

  getBlogById: async (id: string): Promise<GetBlogByIdResponse> => {
    try {
      const response = await apiClient.get<GetBlogByIdResponse>(`/blogs/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error in getBlogById:", error);
      throw new Error("Failed to fetch the blog");
    }
  },

  deleteBlog: async (id: string) => {
    try {
      const response = await apiClient.delete<DeleteBlogResponse>(
        `/blogs/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error in deleteBlog:", error);
      throw new Error("Failed to delete the blog");
    }
  },
};
