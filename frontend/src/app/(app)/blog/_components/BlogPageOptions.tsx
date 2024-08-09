"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Edit, EllipsisVertical, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC } from "react";
import DeleteAlertDialog from "./DeleteAlertDialog";
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";
import { blogService } from "@/services/blogService";

interface BlogPageOptionsProps {
  blogId: string;
}

const BlogPageOptions: FC<BlogPageOptionsProps> = ({ blogId }) => {
  const router = useRouter();

  const handleEditButtonClick = () => {
    router.push(`/edit/${blogId}`);
  };

  const handleDeleteButtonClick = async () => {
    let response;
    try {
      response = await blogService.deleteBlog(blogId);

      if (!response.success) {
        toast({
          title: response.message,
          variant: "destructive",
        });
      }

      toast({
        title: response.message,
      });
      router.push(`/home`);
    } catch (error) {
      toast({
        title: response?.message,
        variant: "destructive",
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="hover:cursor-pointer -mt-4">
        <div className="p-2 rounded-full hover:bg-gray-400/50 transition-colors duration-150">
          <EllipsisVertical className="h-4 w-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleEditButtonClick}>
            <Edit className="mr-2 h-4 w-4" />
            <span>Edit</span>
          </DropdownMenuItem>
          {/* <AlertDialog>
            <AlertDialogTrigger> */}
          <DropdownMenuItem asChild className="w-full">
            <DeleteAlertDialog blogId={blogId} />
            {/* <div className="flex justify-between items-center w-full mx-auto">
                  <Trash2Icon className="mr-2 h-4 w-4" />
                  <span>Delete</span>
                </div> */}
          </DropdownMenuItem>
          {/* </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Do you want to delete this blog?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This will delete your blog permanently
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteButtonClick}>
                  <Trash2Icon className="mr-2 h-4 w-4" />
                  <span>Delete</span>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog> */}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default BlogPageOptions;
