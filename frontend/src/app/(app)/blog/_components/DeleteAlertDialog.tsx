import { FC } from "react";
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
import { blogService } from "@/services/blogService";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Trash2Icon } from "lucide-react";

interface DeleteAlertDialogProps {
  blogId: string;
}

const DeleteAlertDialog: FC<DeleteAlertDialogProps> = ({ blogId }) => {
  const router = useRouter();

  const handleDeleteButtonClick = async () => {
 
    try {
      const response = await blogService.deleteBlog(blogId);

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
        title: "Some error occured while deleting the blog",
        variant: "destructive",
      });
    }
  };

  return (
    <AlertDialog>
      <div className="w-full">
        <AlertDialogTrigger>
          <div className="flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-secondary">
            <Trash2Icon className="mr-2 h-4 w-4" />
            <span>Delete</span>
          </div>
        </AlertDialogTrigger>
      </div>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Do you want to delete this blog?</AlertDialogTitle>
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
    </AlertDialog>
  );
};

export default DeleteAlertDialog;
