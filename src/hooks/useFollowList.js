import { pb } from "@/api/pocketbase";
import { useQuery } from "@tanstack/react-query";

export const useFollowList = () => {
  const fetchFollows = async () => {
    try {
      const follows = await pb.collection("follow").getFullList({
        expand: "owner",
      });
      return follows;
    } catch (error) {
      console.error("tryCatch-" + error);
    }
  };

  const { data, error, refetch } = useQuery({
    queryKey: ["follows"],
    queryFn: fetchFollows,
  });

  if (error) console.error("useQuery-" + error);

  return {
    data,
    refetch,
  };
};
