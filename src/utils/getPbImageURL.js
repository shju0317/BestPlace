export const getPbImageURL = (item, fileName = "photos") =>
  `${import.meta.env.VITE_PB_API}/files/${item.collectionId}/${item.id}/${item[fileName]}`;
