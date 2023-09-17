import { pb } from "@/api/pocketbase";
import { useQuery } from "@tanstack/react-query";

function useReservationList() {
  const userInfo = pb.authStore.model;
  
  async function fetchReservation() {
    try {
      const reservation = await pb.collection("reservation").getFullList({
        filter: `booker = '${userInfo.id}'`,
        expand: "place",
        sort: "+date",
      });
      return reservation;
    } catch (error) {
      console.log(error);
    }
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ["reservation"],
    queryFn: fetchReservation,
  });

  if (error) console.log(error);

  return { data, isLoading };
}

export default useReservationList;
