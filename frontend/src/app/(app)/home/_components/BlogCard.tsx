import Link from "next/link";
import { FC } from "react";
import { Blog } from "@/Types/type";
import { formatDate } from "@/lib/utils";

interface BlogCardProps {
  blog: Blog;
  publishedStatus?: boolean;
  isMyBlogs?: boolean;
}

const BlogCard: FC<BlogCardProps> = ({ blog, publishedStatus, isMyBlogs }) => {
  // console.log(blog.publishedAt);

  return (
    <div className="flex flex-col gap-4 rounded-[0.875rem] shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] hover:bg-[#393939c5] transition-colors duration-150 border border-zinc-600/20 p-2 md:p-3 hover:cursor-pointer px-2 py-3 relative">
      {isMyBlogs && (
        <div className="absolute right-3 top-4 bg-orange-500/55 px-2 py-1 rounded-full min-w-14">
          {publishedStatus ? "Published" : "Draft"}
        </div>
      )}
      <Link href={`/blog/${blog.id}`}>
        <h3 className="text-2xl md:text-3xl font-semibold w-[80%]">
          {blog.title}
        </h3>
        <div className="flex items-center text-gray-300 mb-4">
          <span>{blog.author?.name}</span>
          <span className="px-1">⟡</span>
          <span>{formatDate(blog.publishedAt)}</span>
        </div>
      </Link>
    </div>
  );
};

export default BlogCard;
