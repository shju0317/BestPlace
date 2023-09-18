import { pb } from "@/api/pocketbase";
import { useUserInfo } from "@/hooks/useUserInfo";
import { getPbImageURL } from "@u";
import { shape, string } from "prop-types";
import { useState, useEffect } from "react";
import { IoPersonCircleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

function FeedItemHeader({ item }) {
  const [isFollow, setIsFollow] = useState(false);
  const userId = pb.authStore.model.id;
  const { data: user, refetch } = useUserInfo(userId);

  useEffect(() => {
    user?.following.includes(item.expand.writer.id) ? setIsFollow(true) : setIsFollow(false);
  }, [item.expand.writer.id, user]);

  const handleFollow = async () => {
    let following;

    if (isFollow) {
      following = user.following.filter((el) => el !== item.expand.writer.id);
      setIsFollow(false);
    } else {
      following = [...user.following, item.expand.writer.id];
      setIsFollow(true);
    }

    try {
      await pb.collection("users").update(userId, {
        following,
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
      {userId === item.expand.writer.id ? (
        <div></div>
      ) : isFollow ? (
        <button className="h-8 rounded-md bg-gray-100 px-3 text-sm text-gray-500" onClick={handleFollow}>
          팔로우 취소
        </button>
      ) : (
        <button className="h-8 rounded-md bg-secondary px-3 text-sm text-white" onClick={handleFollow}>
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
