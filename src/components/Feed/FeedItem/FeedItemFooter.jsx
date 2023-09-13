import { shape, string } from "prop-types";
import { BsBookmarkStar } from "react-icons/bs";

function FeedItemFooter({ item }) {
  return (
    <div className="flex items-center justify-between rounded-lg border p-4">
      <dl className="grid grid-cols-[36px_1fr] gap-1">
        <dt className="sr-only">플레이스 이름</dt>
        <dd className="col-start-1 col-end-3 overflow-hidden text-ellipsis whitespace-nowrap font-bold">
          {item.expand.place.title}
        </dd>
        <dt className="sr-only">플레이스 카테고리</dt>
        <dd className="col-start-1 w-fit text-sm text-gray-500">
          {item.expand.place.category} <span aria-hidden>·</span>
        </dd>
        <dt className="sr-only">플레이스 주소</dt>
        <dd className="col-start-2 overflow-hidden text-ellipsis whitespace-nowrap text-sm text-gray-500">
          {item.expand.place.address}
        </dd>
      </dl>
      <button aria-label="플레이스 저장하기" className="ml-2 flex flex-col items-center gap-1 text-gray-400">
        <BsBookmarkStar className="text-2xl" />
        <span className="text-xs">저장</span>
      </button>
    </div>
  );
}

FeedItemFooter.propTypes = {
  item: shape({
    expand: shape({
      place: shape({
        title: string,
        category: string,
        address: string,
      }),
    }),
  }),
};

export default FeedItemFooter;
