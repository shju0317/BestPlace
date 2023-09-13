import PocketBase from 'pocketbase';

const pb = new PocketBase("https://lionplace-db.pockethost.io/");

// 레코드 리스트 읽기
export const readRecordList = async (
	collectionName, 
	{ page = 1, perPage = 10, ...options } = {}
) => {
  try {
    return await pb.collection(collectionName).getList(page, perPage, options);
  } catch (error) {
    throw new Error(error.message);
  }
};

// 레코드 ID로 읽기
export const readRecordOne = async (collectionName, id) => {
  try {
		return await pb.collection(collectionName).getOne(id);
  } catch(error) {
		throw new Error(error.message);
	}
};