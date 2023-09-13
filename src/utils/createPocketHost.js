export async function create(pb, collection, data) {
  const create = await pb.collection(collection).create(data);

  // 추후 삭제해야 함
  console.log("created data on collection");

  return create;
}
