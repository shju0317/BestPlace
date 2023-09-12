import { useState } from "react";
import pb from "./pocketbase";

export function useFeedList() {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("pending");

  async function getFeedList() {
    try {
      setStatus("loading");
      const reviews = await pb.collection("reviews").getFullList({
        expand: "writer,place",
      });
      setData(reviews);
      setStatus("success");
    } catch (error) {
      setStatus("error");
    }
  }

  return {
    data,
    status,
    getFeedList,
  };
}
