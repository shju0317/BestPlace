import PocketBase from "pocketbase";

export async function read(collection) {
  const pb = new PocketBase("https://lionplace-db.pockethost.io/");

  const data = await pb.collection(collection).getList(1, 99);
  // 나중에 삭제
  console.log(data);
  return data;
}
