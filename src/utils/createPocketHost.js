import PocketBase from "pocketbase";

export async function create(collection, data) {
  const pb = new PocketBase("https://lionplace-db.pockethost.io/");
  const create = await pb.collection(collection).create(data);
  // 추후 삭제해야 함
  console.log("created data on collection");
  return create;
}
