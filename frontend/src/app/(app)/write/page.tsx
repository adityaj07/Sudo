import { FC } from "react";
import Editor from "./_components/Editor";

interface WriteBlogProps {}

const WriteBlog: FC<WriteBlogProps> = ({}) => {


  return (
    <div className="min-h-screen">
      <Editor />
    </div>
  );
};

export default WriteBlog;
