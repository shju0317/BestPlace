import { pb } from "@/api/pocketbase";
import { useFollowList } from "@/hooks/useFollowList";
import { getPbImageURL } from "@u";
import { shape, string } from "prop-types";
import { useState, useEffect } from "react";
import { IoPersonCircleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

function FeedItemHeader({ item }) {
  const [isFollow, setIsFollow] = useState(false);
  const myId = pb.authStore.model.id;
  const { data, refetch } = useFollowList();

  useEffect(() => {
    const myFollowings = data?.filter((el) => el.expand.owner.id === myId)[0].followings;
    myFollowings?.includes(item.expand.writer.id) ? setIsFollow(true) : setIsFollow(false);
  }, [data, myId, item]);

  const handleFollow = async (e) => {
    let followings;
    let followers;
    const myRecordId = data?.filter((el) => el.expand.owner.id === myId)[0].id;
    const myFollowings = data?.filter((el) => el.expand.owner.id === myId)[0].followings;
    const writerRecordId = data?.filter((el) => el.expand.owner.id === e.target.id)[0].id;
    const writerFollowers = data?.filter((el) => el.expand.owner.id === e.target.id)[0].followers;

    if (isFollow) {
      followings = myFollowings.filter((el) => el !== item.expand.writer.id);
      followers = writerFollowers.filter((el) => el !== myId);
      setIsFollow(false);
    } else {
      followings = [...myFollowings, item.expand.writer.id];
      followers = [...writerFollowers, myId];
      setIsFollow(true);
    }

    try {
      await pb.collection("follow").update(myRecordId, {
        followings,
      });
      await pb.collection("follow").update(writerRecordId, {
        followers,
      });
    } catch (error) {
      console.error(error);
    }

    refetch();
  };

  return (
    <div className="flex items-center justify-between">
      <Link to={`/userReview/${item.expand.writer.id}`}>
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
      </Link>
      {myId === item.expand.writer.id ? (
        <div aria-label="내가 쓴 리뷰" className="text-sm text-gray-500">
          내가 쓴 리뷰
        </div>
      ) : isFollow ? (
        <button
          className="h-8 rounded-md bg-gray-100 px-3 text-sm text-gray-500"
          id={item.expand.writer.id}
          onClick={handleFollow}
        >
          팔로우 취소
        </button>
      ) : (
        <button
          className="h-8 rounded-md bg-secondary px-3 text-sm text-white"
          id={item.expand.writer.id}
          onClick={handleFollow}
        >
          팔로우
        </button>
      )}
    </div>
  );
}

FeedItemHeader.propTypes = {
  item: shape({
    expand: shape({
      writer: shape({
        id: string,
        avatar: string,
        nickname: string,
      }),
    }),
  }),
};

export default FeedItemHeader;
