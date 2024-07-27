import Link from "next/link";
import { FC } from "react";
import { format } from "date-fns";
import { Blog } from "@/Types/type";

interface BlogCardProps {
  blog: Blog;
}

const BlogCard: FC<BlogCardProps> = ({ blog }) => {
  console.log(blog.content.stringify);

  const formattedDate = format(new Date(blog.publishedAt), "dd/MM/yyyy");
  return (
    <Link
      href={`/blog/${blog.id}`}
      className="flex flex-col gap-4 rounded-[0.875rem] shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] hover:bg-[#393939c5] transition-colors duration-150 border border-zinc-600/20 p-2 md:p-3 hover:cursor-pointer"
    >
      <h3 className="text-3xl font-semibold">{blog.title}</h3>
      <div className="flex flex-col"></div>
      <p>By: {blog.author.name}</p>
      <p>Published: {formattedDate}</p>
    </Link>
  );
};

export default BlogCard;
