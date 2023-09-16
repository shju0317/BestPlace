import PocketBase from "pocketbase";

const pb = new PocketBase("https://lionplace-db.pockethost.io");

export async function useGetOne(collection, userId) {
  return await pb.collection(collection).getOne(userId);
}
