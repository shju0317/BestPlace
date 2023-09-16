import {pb} from "@/api/pocketbase";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useFeedList = () => {
  const fetchReviews = async ({ pageParam = 1 }) => {
    try {
      const reviews = await pb.collection("reviews").getList(pageParam, 5, {
        expand: "writer,place",
      });
      return reviews;
    } catch (error) {
      console.error("tryCatch-" + error);
    }
  };

  const { data, isLoading, error, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["reviews"],
    queryFn: fetchReviews,
    keepPreviousData: true,
    getNextPageParam: (lastPage) => {
      if (lastPage.page >= lastPage.totalPages) return undefined;
      return lastPage.page + 1;
    },
  });

  if (error) console.error("useQuery-" + error);

  return {
    data: data?.pages,
    isLoading,
    fetchNextPage,
    hasNextPage,
  };
};
