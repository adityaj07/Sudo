import apiClient from "@/lib/apiClient";
import {
  Blog,
  DeleteBlogResponse,
  GetBlogByIdResponse,
  GetLatestBlogsResponse,
} from "@/Types/type";

export const blogService = {
  getLatestBlogs: async (
    page = 1,
    pageSize = 10
  ): Promise<GetLatestBlogsResponse> => {
    try {
      const response = await apiClient.get<GetLatestBlogsResponse>("/blogs", {
        params: { page, pageSize },
      });
      return response.data;
    } catch (error) {
      console.error("Error in getLatestBlogs:", error);
      throw new Error("Failed to fetch latest blogs");
    }
  },

  // getMyBlogs: async (page = 1, pageSize = 10) => {
  //   const response = await apiClient.get<BlogResponse>("/my-blogs", {
  //     params: { page, pageSize },
  //   });
  //   return response.data;
  // },

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
