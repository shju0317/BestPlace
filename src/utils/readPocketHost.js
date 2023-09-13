export async function read(pb, collection, field, id) {
  const FieldData = await pb.collection(collection).getList(1, 10, {
    fields: field,
  });

  const collectionData = await pb.collection(collection).getList(1, 10);

  // 추후 삭제해야 함
  console.log(field ? FieldData : collectionData);

  return field ? FieldData : collectionData;
}
