import PocketBase from "pocketbase";

const pb = new PocketBase(import.meta.env.VITE_PB_URL);
pb.autoCancellation(false);
export default pb


export async function create(collection, data) {
  const create = await pb.collection(collection).create(data);
  
  // 추후 삭제해야 함
  console.log("created data on collection");
  
  return create;
}

export async function read(collection, field, id) {
  const FieldData = await pb.collection(collection).getList(1, 10, {
    fields: field,
  });
  const collectionData = await pb.collection(collection).getList(1, 10);
  
  // 추후 삭제해야 함
  console.log(field ? FieldData : collectionData);
  
  return field ? FieldData : collectionData;
}

export function update(collection, itemId, data) {
  const update = pb.collection(collection).update(itemId, data);
  
  // 추후 삭제해야 함
  console.log("created data on collection");
  
  return update
}

export function setLogOut() {
  pb.authStore.clear();
  
  // 추후 삭제해야 함
  console.log("Logout");
}