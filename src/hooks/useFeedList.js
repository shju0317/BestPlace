import pb from "@/api/pocketbase";
import { useCategoryStore } from "@/store/category";
import { useQuery } from "@tanstack/react-query";

export function useFeedList() {
  const category = useCategoryStore((state) => state.category).sort();
  const queryParams = category.includes("전체") ? "" : category.map((item) => `place.category='${item}'`).join("||");

  async function fetchReviews() {
    try {
      const reviews = await pb.collection("reviews").getFullList({
        expand: "writer,place",
        // filter: filterQuery,
      });
      return reviews;
    } catch (error) {
      console.log("tryCatch-" + error);
      console.log(error.isAbort);
    }
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ["reviews"],
    // queryFn: () => fetchReviews(queryParams),
    queryFn: fetchReviews,
  });

  if (error) console.log("useQuery-" + error);

  return {
    data,
    isLoading,
  };
}
