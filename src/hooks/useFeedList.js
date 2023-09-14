import {pb} from "@/api/pocketbase";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useFeedList() {
  async function fetchReviews({ pageParam = 1 }) {
    try {
      const reviews = await pb.collection("reviews").getList(pageParam, 4, {
        expand: "writer,place",
      });
      return reviews;
    } catch (error) {
      console.log("tryCatch-" + error);
      console.log(error.isAbort);
    }
  }

  const { data, isLoading, error, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["reviews"],
    queryFn: fetchReviews,
    keepPreviousData: true,
    getNextPageParam: (lastPage) => {
      if (lastPage.page >= lastPage.totalPages) return undefined;
      return lastPage.page + 1;
    },
  });

  if (error) console.log("useQuery-" + error);

  return {
    data: data?.pages,
    isLoading,
    fetchNextPage,
    hasNextPage,
  };
}
