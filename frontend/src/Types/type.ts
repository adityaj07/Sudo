export interface GetLatestBlogsResponse {
  blogs: Blog[];
  pagination: {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalCount: number;
  };
}

export interface Blog {
  id: string;
  title: string;
  author: {
    name: string;
  };
  published: boolean;
  publishedAt: string;
  content: JSON;
}

export interface GetBlogByIdResponse {
  blog: Blog;
}

export interface DeleteBlogResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
  };
}

export interface ApiResponse {
  success: boolean;
  message: string;
}