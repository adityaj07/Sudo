import { blogService } from "@/services/blogService";
import { FC } from "react";
import BlogContent from "../../home/_components/BlogContent";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";
import BlogPageOptions from "../_components/BlogPageOptions";

interface BlogProps {
  params: {
    blogId: string;
  };
}

const Blog: FC<BlogProps> = async ({ params: { blogId } }) => {
  const data = await blogService.getBlogById(blogId);
  const formattedDate = format(new Date(data.blog.publishedAt), "dd/MM/yyyy");

  return (
    <div className="container mx-auto px-0 py-2 md:px-2 md:py-4 lg:px-4 lg:py-8">
      <h1 className="text-4xl font-bold mb-4">{data.blog.title}</h1>
      <div className="flex justify-between items-center">
        <div
          className="flex items-center text-gray-300 mb-4"
          suppressHydrationWarning={true}
        >
          <span>{data.blog.author?.name}</span>
          <span className="px-1">⟡</span>
          <span>{formattedDate}</span>
        </div>
        <BlogPageOptions blogId={blogId} />
      </div>
      <Separator className="text-white/100 mb-4" />
      <BlogContent content={data.blog.content} />
    </div>
  );
};

export default Blog;
