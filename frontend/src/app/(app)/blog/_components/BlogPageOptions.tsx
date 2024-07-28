"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface BlogPageOptionsProps {
  blogId: string;
}

const BlogPageOptions: FC<BlogPageOptionsProps> = ({ blogId }) => {
  const router = useRouter();
  const handleEditButtonClick = () => {
    router.push(`/edit/${blogId}`);
  };
  return (
    <Button variant="ghost" onClick={handleEditButtonClick}>
      Edit
    </Button>
  );
};

export default BlogPageOptions;
