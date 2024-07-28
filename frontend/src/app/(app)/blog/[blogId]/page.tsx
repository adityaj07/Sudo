import { blogService } from "@/services/blogService";
import { FC } from "react";
import BlogContent from "../../home/_components/BlogContent";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";

interface BlogProps {
  params: {
    blogId: string;
  };
}

const Blog: FC<BlogProps> = async ({
  params,
}: {
  params: { blogId: string };
}) => {
  const data = await blogService.getBlogById(params.blogId);
  const formattedDate = format(new Date(data.blog.publishedAt), "dd/MM/yyyy");
  console.log("Formatted Date in blog page", formattedDate);
  console.log("Date from blog in blog page", data.blog.publishedAt);

  return (
    <div className="container mx-auto px-0 py-2 md:px-2 md:py-4 lg:px-4 lg:py-8">
      <h1 className="text-4xl font-bold mb-4">{data.blog.title}</h1>
      <p className="text-gray-600 mb-4" suppressHydrationWarning={true}>
        {data.blog.author?.name} ⟡ {formattedDate}
      </p>
      <Separator className="text-white/100 mb-4" />
      <BlogContent content={data.blog.content} />
    </div>
  );
};

export default Blog;
