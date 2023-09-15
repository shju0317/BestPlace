import PocketBase from "pocketbase";

export const pb = new PocketBase(import.meta.env.VITE_PB_URL);
pb.autoCancellation(false);

const autoReload = pb.authStore.onChange((token, model) => {
  globalThis.location.reload()
})

//콜랙션에 데이터값으로 아이템 생성 
export async function create(collection, data) {
  const create = await pb.collection(collection).create(data);
  return create;
}

//콜랙션 읽기, 필드값을 추가하면 필터링 됨 
export async function read(collection, field, id) {
  const FieldData = await pb.collection(collection).getList(1, 10, {
    fields: field,
  });
  const collectionData = await pb.collection(collection).getList(1, 10);
  return field ? FieldData : collectionData;
}

//콜랙션 전부 읽기 
export async function fullRead(collection, field, id) {
  const FieldData = await pb.collection(collection).getFullList({
    fields: field,
  });
  const collectionData = await pb.collection(collection).getFullList();
  return field ? FieldData : collectionData;
}

//콜랙션의 아이템에 데이터를 업데이트, 데이터는 객체이며 해당 콜랙션의 필드와 키값이 일치해야 한다 
export function update(collection, itemId, data) {
  const update = pb.collection(collection).update(itemId, data);
  return update;
}

//로그인 
export async function setLogIn(idPw) {
  const authData = await pb.collection("users").authWithPassword(...idPw);
  return authData;
}

//로그아웃 
export function setLogOut() {
  pb.authStore.clear();
}
