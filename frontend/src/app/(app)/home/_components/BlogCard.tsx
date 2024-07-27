import Link from "next/link";
import { FC } from "react";
import { format } from "date-fns";
import { Blog } from "@/Types/type";

interface BlogCardProps {
  blog: Blog;
}

const BlogCard: FC<BlogCardProps> = ({ blog }) => {
  // console.log(blog.content.stringify);

  const formattedDate = format(new Date(blog.publishedAt), "dd/MM/yyyy");
  return (
    <Link
      href={`/blog/${blog.id}`}
      className="flex flex-col gap-4 rounded-[0.875rem] shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] hover:bg-[#393939c5] transition-colors duration-150 border border-zinc-600/20 p-2 md:p-3 hover:cursor-pointer px-2 py-3"
    >
      <h3 className="text-2xl md:text-3xl font-semibold">{blog.title}</h3>
      <p className="text-sm text-gray-500/80">
        {blog.author.name} ⟡ {formattedDate}
      </p>
    </Link>
  );
};

export default BlogCard;
