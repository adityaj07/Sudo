"use client";

import { toast } from "@/components/ui/use-toast";
import { blogService } from "@/services/blogService";
import { Blog } from "@/Types/type";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import BlogList from "./BlogList";

interface LatestBlogsProps {
  // initialData: GetLatestBlogsResponse;
}

interface Pagination {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
}

const LatestBlogs: FC<LatestBlogsProps> = ({}) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    totalPages: 1,
    pageSize: 10,
    totalCount: 0,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMoreBlogs, setHasMoreBlogs] = useState<boolean>(true);

  //ref of the div at the end of the bloglist which we observe to load more blogs as it intersects
  const loaderRef = useRef<HTMLDivElement>(null);

  //Fetching the initial data when the component mounts
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const initialData = await blogService.getLatestBlogs();
        setBlogs(initialData.blogs);
        setPagination(initialData.pagination);
      } catch (error) {
        console.error(error);
        setHasMoreBlogs(false);
        toast({
          title: "Oopsie!! Not able to fetch the latest blogs at the moment 😓",
        });
      }
    };

    fetchInitialData();
  }, []);

  //Function to fetch more blogs as as the last div intersects
  const fetchData = useCallback(async () => {
    if (isLoading || !hasMoreBlogs) return;

    setIsLoading(true);

    try {
      const data = await blogService.getLatestBlogs(pagination.currentPage);

      if (data && data.blogs.length === 0) {
        setHasMoreBlogs(false); //stop further requests for blogs if there are no more blogs
      } else {
        //If there are more blogs, filter out any duplicates based on id and update the current list of blogs with newly fetched ones
        setBlogs((prevBlogs) => {
          const newBlogs = data.blogs.filter(
            (newBlog) =>
              !prevBlogs.some((prevBlog) => prevBlog.id === newBlog.id)
          );
          return [...newBlogs, ...prevBlogs];
        });
      }

      //Incrementing the current page
      setPagination((prevPagination) => ({
        ...prevPagination,
        currentPage: prevPagination.currentPage + 1,
      }));

      //Setting the setHasMoreBlogs boolean based on if whether the current page we are on is smaller than the total number of pages, which would imply that there are yet more blogs to be loaded
      setHasMoreBlogs(data.pagination.currentPage < data.pagination.totalPages);
    } catch (error) {
      console.error(error);
      setHasMoreBlogs(false);
      toast({
        title: "Oopsie!! Not able to fetch more blogs at the moment 😓",
      });
    } finally {
      setIsLoading(false);
    }
  }, [pagination.currentPage, isLoading, hasMoreBlogs]);

  //Logic for the observing the last div to see whther it intersects or not and unobserving it when moving onto the next set of blogs and repeat
  useEffect(() => {
    if (!hasMoreBlogs) return;

    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        fetchData();
      }
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [fetchData, hasMoreBlogs]);

  return (
    <div>
      <BlogList blogs={blogs} loading={isLoading} hasMoreBlogs={hasMoreBlogs} />
      <div ref={loaderRef} className="min-h-[2rem]" />
      {!hasMoreBlogs && (
        <div className="text-center text-gray-500 mt-4">
          End of the feed. No more blogs to load.
        </div>
      )}
    </div>
  );
};

export default LatestBlogs;
