import { FC } from "react";
import BlogCard from "./BlogCard";
import { Blog } from "@/Types/type";
import { Skeleton } from "@/components/ui/skeleton";

interface BlogListProps {
  blogs: Blog[];
  loading?: boolean;
  hasMoreBlogs?: boolean;
  isMyBlogs?: boolean;
}

const BlogList: FC<BlogListProps> = ({
  blogs,
  loading,
  hasMoreBlogs,
  isMyBlogs,
}) => {
  return (
    <div className="flex flex-col space-y-4 mt-4">
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} publishedStatus={blog.published} isMyBlogs={isMyBlogs}/>
      ))}
      {loading &&
        hasMoreBlogs &&
        Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="min-h-[7rem]" />
        ))}
    </div>
  );
};

export default BlogList;
