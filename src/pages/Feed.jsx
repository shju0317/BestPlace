import { useFeedList, useIntersect, useFilterCategory } from "@h";
import FeedItem from "@c/Feed/FeedItem/FeedItem";
import Spinner from "@c/Spinner";
import NoResult from "@c/Feed/NoResult";
import FilterCategory from "@/components/Feed/FilterCategory";
import FilterRegion from "@/components/Feed/FilterRegion";

const PLACE_LIST = ["전체", "홍익대", "합정역", "+ 관심지역"];

function Feed() {
  const { data: fetchData, isLoading, hasNextPage, fetchNextPage } = useFeedList();

  // 인피니트 스크롤
  const ref = useIntersect(
    async (entry, observer) => {
      observer.unobserve(entry.target);
      if (hasNextPage && !isLoading) {
        fetchNextPage();
      }
    },
    { threshold: 1 }
  );

  // 카테고리 필터링
  const data = useFilterCategory(fetchData);

  // 로딩 중
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
          <FilterRegion key={crypto.randomUUID()} title={item} />
        ))}
      </ul>
      <ul className="flex gap-2 py-3 text-sm">
        <FilterCategory />
      </ul>

      <ul className="flex flex-col gap-1 bg-gray-50">
        {data[0].items.length ? (
          data.map((group) => group.items.map((item) => <FeedItem key={item.id} item={item} />))
        ) : (
          <NoResult />
        )}
      </ul>
      <div ref={ref} className="h-[1px]"></div>
    </>
  );
}

export default Feed;
