import { getPbImageURL } from "@u";
import { shape, string } from "prop-types";
import { IoPersonCircleSharp } from "react-icons/io5";

function FeedItemHeader({ item }) {
  return (
    <div className="flex items-center justify-between">
      <dl className="grid gap-x-1">
        <dt className="sr-only">작성자 프로필</dt>
        <dd className="col-start-1  row-start-1 row-end-3 mr-1 h-12 w-12 rounded-full bg-gray-300">
          {item.expand.writer.avatar ? (
            <img
              src={getPbImageURL(item.expand.writer, item.expand.writer.avatar)}
              alt="작성자 프로필"
              className="h-full w-full rounded-full object-cover text-xs"
            />
          ) : (
            <IoPersonCircleSharp className="h-full w-full text-gray-100" />
          )}
        </dd>
        <dt className="sr-only">작성자</dt>
        <dd className="col-start-2 col-end-6 font-bold">{item.expand.writer.nickname}</dd>
        <dt className="col-start-2 row-start-2 text-xs text-gray-500">리뷰</dt>
        <dd className="col-start-3 row-start-2 text-xs text-gray-500">20</dd>
        <dt className="col-start-4 row-start-2 text-xs text-gray-500">팔로워</dt>
        <dd className="col-start-5 row-start-2 text-xs text-gray-500">8</dd>
      </dl>
      <button className="h-8 rounded-md bg-secondary px-3 text-sm text-white">팔로우</button>
    </div>
  );
}

FeedItemHeader.propTypes = {
  item: shape({
    expand: shape({
      writer: shape({
        avatar: string,
        nickname: string,
      }),
    }),
  }),
};

export default FeedItemHeader;
