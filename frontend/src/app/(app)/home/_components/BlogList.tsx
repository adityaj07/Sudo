import { FC } from "react";
import BlogCard from "./BlogCard";
import { Blog } from "@/Types/type";

interface BlogListProps {
  blogs: Blog[];
}

const BlogList: FC<BlogListProps> = ({ blogs }) => {
  return (
    <div className="flex flex-col space-y-4 mt-4">
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
