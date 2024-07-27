"use client";

import { toast } from "@/components/ui/use-toast";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { blogService } from "@/services/blogService";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import BlogList from "./BlogList";
import { Blog, GetLatestBlogsResponse } from "@/Types/type";

interface LatestBlogsProps {
  initialData: GetLatestBlogsResponse;
}

interface Pagination {
  currentPage: number;
  totalPages: number;
}

const LatestBlogs: FC<LatestBlogsProps> = ({ initialData }) => {
  const [blogs, setBlogs] = useState<Blog[]>(initialData.blogs);
  const [pagination, setPagination] = useState<Pagination>(
    initialData.pagination
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isError, setIsError] = useState<string | null>(null);

  const loadMoreBlogsRef = useRef<HTMLDivElement>(null);
  const isIntersecting = useIntersectionObserver(loadMoreBlogsRef);

  const fetchBlogs = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    setIsError(null);

    try {
      const data = await blogService.getLatestBlogs(pagination.currentPage + 1);
      if (data.blogs.length === 0) {
        setHasMore(false);
      } else {
        setBlogs((prevBlogs) => {
          const newBlogs = data.blogs.filter(
            (newBlog) =>
              !prevBlogs.some((prevBlog) => prevBlog.id === newBlog.id)
          );
          return [...prevBlogs, ...newBlogs];
        });
        setPagination((prevPagination) => ({
          ...prevPagination,
          currentPage: prevPagination.currentPage + 1,
        }));
        setHasMore(data.pagination.currentPage < data.pagination.totalPages);
      }
    } catch (error) {
      console.error("Error fetching latest blogs", error);
      setIsError("Couldn&apos;t fetch latest blogs at the moment");
      setHasMore(false);
      toast({
        title: "Oopsie!!",
        description: isError,
      });
    } finally {
      setLoading(false);
    }
  }, [pagination, loading, hasMore]);

  useEffect(() => {
    if (blogs.length === 0 && !loading && hasMore && !isError) {
      fetchBlogs();
    }
  }, [blogs.length, loading, hasMore, isError, fetchBlogs]);

  useEffect(() => {
    if (isIntersecting && !loading && hasMore && !isError) {
      fetchBlogs();
    }
  }, [isIntersecting, loading, hasMore, isError, fetchBlogs]);

  return (
    <div>
      {blogs.length > 0 ? (
        <BlogList blogs={blogs} />
      ) : loading ? (
        <p>Loading more blogs...</p>
      ) : (
        <p>No blogs.</p>
      )}
      {hasMore && <div ref={loadMoreBlogsRef} className="h-20" />}
      {!hasMore && <p>You have reached the end of the feed.</p>}
    </div>
  );
};

export default LatestBlogs;
