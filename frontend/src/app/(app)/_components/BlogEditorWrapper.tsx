// "use client";

// import { blogService } from "@/services/blogService";
// import { Blog, GetBlogByIdResponse } from "@/Types/type";
// import { FC, useEffect, useState } from "react";
// import Editor from "../write/_components/Editor";

// interface BlogEditorWrapperProps {
//   params: {
//     blogId: string;
//   };
// }

// const BlogEditorWrapper: FC<BlogEditorWrapperProps> = ({
//   params: { blogId },
// }) => {
//   const [blogData, setBlogData] = useState<Blog>();
//   const isEdit = !!blogId;

//   useEffect(() => {
//     const fetchBlog = async () => {
//       if (isEdit) {
//         const data = await blogService.getBlogById(blogId);
//         setBlogData(data.blog);
//       }
//     };

//     fetchBlog();
//   }, [blogId]);

//   console.log(blogData);

//   return (
//     <Editor
//       isEditMode={isEdit}
//       initialContent={blogData?.content}
//       initialTitle={blogData?.title}
//       initialPublishedStatus={blogData?.published}
//     />
//   );
// };

// export default BlogEditorWrapper;
