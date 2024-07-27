import { FC } from "react";
import Editor from "./_components/Editor";
import { type Metadata } from "next";

interface WriteBlogProps {}

export const metadata: Metadata = {
  title: "Blog draft | Sudo",
  description: "Write your blog.",
};

const WriteBlog: FC<WriteBlogProps> = ({}) => {
  return <Editor />;
};

export default WriteBlog;
