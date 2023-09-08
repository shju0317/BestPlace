import PocketBase from "pocketbase";

async function read(collection) {
  const pb = new PocketBase("https://lionplace-db.pockethost.io/");

  const data = await pb.collection(collection).getList(1, 99);
  console.log(data);
  return data;
}

export default read;
