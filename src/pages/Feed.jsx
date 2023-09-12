import { array, object, shape, string } from "prop-types";
import { useFeedList } from "@/hooks/useFeedList";
import { useEffect } from "react";
import { getPbImageURL } from "../utils/getPbImageURL";
import { getDate } from "../utils/getDate";

const PLACE_LIST = ["전체", "홍익대", "합정역", "+ 관심지역"];
const CATEGORY = ["한식", "양식", "일식", "중식", "카페", "아시아/퓨전 음식", "뷔페/레스토랑", "술집"];

// 피드 페이지 컴포넌트
function Feed() {
  const { data, status, getFeedList } = useFeedList();
  console.log(data);
  useEffect(() => {
    getFeedList();
  }, []);

  return (
    <>
      <ul className="flex gap-2">
        {PLACE_LIST.map((item) => (
          <Place key={crypto.randomUUID()} title={item} />
        ))}
      </ul>
      <ul className="flex gap-2 py-3 text-sm">
        {CATEGORY.map((item) => (
          <Category key={crypto.randomUUID()} title={item} />
        ))}
      </ul>
      <ul className="flex flex-col gap-2 py-4">
        {data?.map((item) => (
          <FeedItem key={item.id} item={item} />
        ))}
      </ul>
    </>
  );
}

export default Feed;

// 관심지역 리스트
function Place({ title }) {
  return (
    <li>
      <button className="rounded-md bg-gray-100 p-2 text-gray-500 shadow hover:bg-secondary hover:text-white">
        {title}
      </button>
    </li>
  );
}

Place.propTypes = {
  title: string,
};

// 카테고리 리스트
function Category({ title }) {
  return (
    <li>
      <button className="rounded-2xl border p-2 text-gray-700">{title}</button>
    </li>
  );
}

Category.propTypes = {
  title: string,
};

// 피드 리스트 아이템
function FeedItem({ item }) {
  return (
    <li className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <dl className="grid gap-1">
          <dt className="sr-only">작성자 프로필</dt>
          <dd className="col-start-1  row-start-1 row-end-3 h-12 w-12 rounded-full bg-gray-300">
            <img
              src={getPbImageURL(item.expand.writer, "avatar")}
              alt="작성자 프로필"
              className="h-full w-full rounded-full object-cover text-xs"
            />
          </dd>
          <dt className="sr-only">작성자</dt>
          <dd className="col-start-2 col-end-6 font-bold">{item.expand.writer.nickname}</dd>
          <dt className="col-start-2 row-start-2 text-xs text-gray-500">사진리뷰</dt>
          <dd className="col-start-3 row-start-2 text-xs text-gray-500">20</dd>
          <dt className="col-start-4 row-start-2 text-xs text-gray-500">팔로워</dt>
          <dd className="col-start-5 row-start-2 text-xs text-gray-500">8</dd>
        </dl>
        <button className="h-8 rounded-md bg-secondary px-3 text-sm text-white">팔로우</button>
      </div>
      <figure>
        {item.photos}
        <img src={getPbImageURL(item)} alt="리뷰 사진" className="h-96 w-full object-contain" />
        <figcaption>
          <p className="mt-3  text-gray-700">{item.contents}</p>
        </figcaption>
      </figure>
      <div className="flex items-center justify-between">
        <ul className="flex gap-2">
          {item.keywords.map((item) => (
            <TagList key={crypto.randomUUID()} item={item} />
          ))}
        </ul>
        <time dateTime="2023-09-06" className="text-sm text-gray-500">
          {getDate(item.created, "mm.dd day 방문")}
        </time>
      </div>
      <div className="flex items-center justify-between rounded-lg border p-4">
        <dl className="grid gap-1">
          <dt className="sr-only">가게이름</dt>
          <dd className="col-start-1 col-end-3 font-bold">{item.expand.place.title}</dd>
          <dt className="sr-only">가게유형</dt>
          <dd className="col-start-1 w-fit text-sm text-gray-500">
            {item.expand.place.category} <span aria-hidden>·</span>
          </dd>
          <dt className="sr-only">주소</dt>
          <dd className="col-start-2 text-sm text-gray-500">{item.expand.place.address}</dd>
        </dl>
        <div className="flex flex-col items-center text-gray-400">
          <span>☆</span>
          <span className="text-xs">저장</span>
        </div>
      </div>
    </li>
  );
}

FeedItem.propTypes = {
  item: shape({
    contents: string,
    keywords: array,
    created: string,
    expand: object,
  }),
};

function TagList({ item }) {
  return <li className="w-fit rounded-md bg-gray-100 px-2 py-1 text-sm text-gray-500">{item}</li>;
}

TagList.propTypes = {
  item: string,
};
