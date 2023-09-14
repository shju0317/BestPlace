import PocketBase from "pocketbase";

export const pb = new PocketBase(import.meta.env.VITE_PB_URL);
pb.autoCancellation(false);

export async function create(collection, data) {
  const create = await pb.collection(collection).create(data);
  return create;
}

export async function read(collection, field, id) {
  const FieldData = await pb.collection(collection).getList(1, 10, {
    fields: field,
  });
  const collectionData = await pb.collection(collection).getList(1, 10);
  return field ? FieldData : collectionData;
}

export async function fullRead(collection, field, id) {
  const FieldData = await pb.collection(collection).getFullList({
    fields: field,
  });
  const collectionData = await pb.collection(collection).getFullList();
  return field ? FieldData : collectionData;
}

export function update(collection, itemId, data) {
  const update = pb.collection(collection).update(itemId, data);
  return update;
}

export async function setLogIn(idPw) {
  const authData = await pb.collection("users").authWithPassword(...idPw);
  return authData;
}

export function setLogOut() {
  pb.authStore.clear();
}
