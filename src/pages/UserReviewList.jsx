import FeedItem from "@/components/Feed/FeedItem/FeedItem";
import Spinner from "@/components/Spinner";
import UserReviewHeader from "@/components/UserReviewList/UserReviewHeader";
import { useInfiniteList, useIntersect } from "@/hooks";
import Footer from "@/layout/Footer";
import Header from "@/layout/header";
import { useParams } from "react-router-dom";

function UserReviewList() {
  const { userId } = useParams();
  const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteList("reviews");
  const result = data?.flatMap((el) => el.items).filter((el) => el.writer === userId) || null;

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
      <Header />
      <UserReviewHeader item={result[0]} />
      <main className="mx-auto max-w-3xl p-3">
        <h2 className="sr-only">유저 리뷰리스트 페이지</h2>
        <ul className="flex flex-col gap-1 bg-gray-50">
          {result.map((item) => (
            <li key={item.id}>
              <FeedItem item={item} hiddenHeader={true} isPlace={true} />
            </li>
          ))}
        </ul>
        <div ref={ref} className="h-[1px]"></div>
      </main>
      <Footer />
    </>
  );
}

export default UserReviewList;
