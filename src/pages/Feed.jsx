import { useIntersect } from "@h";
import FeedItem from "@c/Feed/FeedItem/FeedItem";
import Spinner from "@c/Spinner";
import NoResult from "@c/Feed/NoResult";
import FilterRegion from "@/components/Feed/FilterRegion";
import SwiperCategory from "@/components/SwiperCategory";
import { useFilterRegion } from "@/hooks";
import { useFilterCategory, useInfiniteList } from "@/hooks";
import ScrollToTop from "@/components/ScrollTop";
import { Suspense } from "react";

function Feed() {
  const { data: fetchData, isLoading, hasNextPage, fetchNextPage } = useInfiniteList("reviews");

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

  // 데이터 필터링
  const filterRegion = useFilterRegion(fetchData);
  const filterCategory = useFilterCategory(filterRegion);
  const result = filterCategory?.flatMap((el) => el.items) || null;

  return (
    <>
      <Suspense fallback={<Spinner />}>
        <ScrollToTop />
        <h2 className="sr-only">피드 페이지</h2>

        <ul>
          <FilterRegion />
        </ul>

        <ul className="py-3 text-sm">
          <SwiperCategory />
        </ul>

        <ul className="flex flex-col gap-1 bg-gray-50">
          {!isLoading && filterCategory[0].items.length ? (
            result.map((item) => (
              <li key={item.id}>
                <FeedItem item={item} />
              </li>
            ))
          ) : (
            <NoResult title="일치하는 결과가 없습니다." contents="필터를 바꾸고 다시 시도해 보세요." />
          )}
        </ul>

        {/* 인피니트 스크롤 시 필요한 요소 */}
        <div ref={ref} className="h-[1px]"></div>
      </Suspense>
    </>
  );
}

export default Feed;
