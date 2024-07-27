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

  // console.log(data);
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{data.blog.title}</h1>
      <p className="text-gray-600 mb-4">
        By {data.blog.author?.name} on{" "}
        {formattedDate}
      </p>
      <Separator className="text-white/100 mb-4"/>
      <BlogContent content={data.blog.content} />
    </div>
  );
};

export default Blog;
