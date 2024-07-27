export interface GetLatestBlogsResponse {
  blogs: Blog[];
  pagination: {
    currentPage: number;
    totalPages: number;
  };
}

export interface Blog {
  id: string;
  title: string;
  author: {
    name: string;
  };
  publishedAt: string;
  content: JSON;
}
