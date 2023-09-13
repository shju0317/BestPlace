import { useFeedList } from "@/hooks/useFeedList";
import Category from "@c/Feed/Category";
import Place from "@c/Feed/Place";
import FeedItem from "@c/Feed/FeedItem/FeedItem";
import Spinner from "@c/Spinner";
import { useCategoryStore } from "@/store/category";
// import { LuSearchX } from "react-icons/lu";

const PLACE_LIST = ["전체", "홍익대", "합정역", "+ 관심지역"];

function Feed() {
  let data = [];
  const { data: fetchData, isLoading } = useFeedList();
  const category = useCategoryStore((state) => state.category);
  const filteredData = fetchData?.filter((el) => category.includes(el.expand.place.category));
  category.includes("전체") ? (data = fetchData) : (data = filteredData);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Spinner size={160} />
      </div>
    );
  }

  return (
    <>
      <h2 className="sr-only">피드 페이지</h2>
      <ul className="flex gap-2">
        {PLACE_LIST.map((item) => (
          <Place key={crypto.randomUUID()} title={item} />
        ))}
      </ul>
      <ul className="flex gap-2 py-3 text-sm">
        <Category />
      </ul>
      <ul className="flex flex-col gap-1 bg-gray-50">
        {data.length ? data?.map((item) => <FeedItem key={item.id} item={item} />) : <Empty />}
      </ul>
    </>
  );
}

export default Feed;

function Empty() {
  return (
    <div className="flex flex-col items-center justify-center bg-white pt-10">
      {/* <LuSearchX className="h-20 w-20" /> */}
      <h3 className="mt-2 text-2xl font-bold">일치하는 결과가 없습니다.</h3>
      <p className="mt-2">필터를 바꾸고 다시 시도해보세요.</p>
    </div>
  );
}
