export interface GetBlogsResponse {
  success: boolean;
  message: string;
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
    id: string;
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
  user?: User | null;
}

export interface User {
  id: string;
  name: string;
  email: string;
  bio: string | null;
  profilePicture: string | null;
  createdAt: string;
  isVerified: boolean;
}

export interface AuthData {
  name: string;
  email: string;
  password: string;
}
