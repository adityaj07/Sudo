import { FC } from "react";
import Editor from "../../write/_components/Editor";
import { blogService } from "@/services/blogService";

interface EditBlogProps {
  params: {
    blogId: string;
  };
}

const EditBlog: FC<EditBlogProps> = async ({ params: { blogId } }) => {
  const data = await blogService.getBlogById(blogId);
  return (
    <Editor
      isEditMode={true}
      initialContent={data?.blog.content}
      initialTitle={data?.blog.title}
      initialPublishedStatus={data?.blog.published}
      blogId={blogId}
    />
  );
};

export default EditBlog;
