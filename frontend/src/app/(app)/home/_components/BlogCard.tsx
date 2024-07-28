"use client";

import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { format } from "date-fns";
import { Blog } from "@/Types/type";

interface BlogCardProps {
  blog: Blog;
}

const BlogCard: FC<BlogCardProps> = ({ blog }) => {
  const [formattedDate, setFormattedDate] = useState<string>("");
  // console.log(blog.content.stringify);
  useEffect(() => {
    setFormattedDate(format(new Date(blog.publishedAt), "dd/MM/yyyy"));
  }, [blog.publishedAt]);

  console.log("Formatted Date", formattedDate);
  console.log("Date from blog", blog.publishedAt);

  return (
    <Link
      href={`/blog/${blog.id}`}
      className="flex flex-col gap-4 rounded-[0.875rem] shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] hover:bg-[#393939c5] transition-colors duration-150 border border-zinc-600/20 p-2 md:p-3 hover:cursor-pointer px-2 py-3"
    >
      <h3 className="text-2xl md:text-3xl font-semibold">{blog.title}</h3>
      <p className="text-sm text-gray-500/80" suppressHydrationWarning={true}>
        {blog.author.name} ⟡ {formattedDate}
      </p>
    </Link>
  );
};

export default BlogCard;
