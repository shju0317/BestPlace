import PocketBase from "pocketbase";

async function create(collection, data) {
  const pb = new PocketBase("https://lionplace-db.pockethost.io/");
  const create = await pb.collection(collection).create(data);
  console.log('created data on collection');
  return create;
}

export default create;
