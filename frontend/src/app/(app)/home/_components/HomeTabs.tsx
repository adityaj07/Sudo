import { FC } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LatestBlogs from "./LatestBlogs";
import Myblogs from "./Myblogs";
import { blogService } from "@/services/blogService";

interface HomeTabsProps {}

const HomeTabs: FC<HomeTabsProps> = async ({}) => {
  // const initialData = await blogService.getLatestBlogs();

  return (
    <Tabs defaultValue="latestBlogs" className="min-w-full">
      <TabsList>
        <TabsTrigger value="latestBlogs">Latest Blogs</TabsTrigger>
        <TabsTrigger value="myBlogs">My Blogs</TabsTrigger>
      </TabsList>
      <TabsContent value="latestBlogs">
        {/* <LatestBlogs initialData={initialData} /> */}
        <LatestBlogs />
      </TabsContent>
      <TabsContent value="myBlogs">
        <Myblogs />
      </TabsContent>
    </Tabs>
  );
};

export default HomeTabs;
