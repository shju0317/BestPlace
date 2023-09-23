import { pb, setLogOut } from "@/api/pocketbase";
import { useFetchList } from "@/hooks/useFetchList";
import { getPbImageURL } from "@/utils";
import { IoLogOutOutline, IoPersonCircleSharp } from "react-icons/io5";
import { FaUserEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

function Profile() {
  const userInfo = pb.authStore.model;
  const { data: reviewData } = useFetchList("reviews", { filter: `writer='${userInfo.id}'` });
  const { data: followData } = useFetchList("follow", { filter: `owner='${userInfo.id}'` });

  const handleLogout = () => {
    setLogOut();
    location.href = "/";
  };

  return (
    <div className="mx-auto flex max-w-3xl justify-start px-3 py-4">
      <div className="mx-auto flex flex-col items-center sm:mx-[12%]">
        <dl className="relative flex items-center justify-center gap-x-6 gap-y-2">
          <div>
            <dt className="sr-only">내 프로필 사진</dt>
            <dd className="h-20 w-20 rounded-full bg-white p-0.5 shadow-[0_1px_6px_rgba(0,0,0,0.1)] sm:h-24 sm:w-24">
              <Link to={"/update-user-data"}>
                {userInfo.avatar ? (
                  <img
                    src={getPbImageURL(userInfo, userInfo.avatar)}
                    alt="유저 프로필 사진"
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  <IoPersonCircleSharp className="h-full w-full text-gray-100" />
                )}
              </Link>
            </dd>
          </div>

          <div className="flex flex-col gap-1">
            <dt className="sr-only">내 닉네임</dt>
            <dd className="w-fit">
              <Link to={"/update-user-data"} className="flex items-center gap-2 text-2xl font-bold">
                <span>{userInfo.nickname}</span>
                <FaUserEdit aria-label="프로필 수정" title="프로필 수정" className="text-xl text-secondary" />
              </Link>
            </dd>
            <dt className="sr-only">나의 활동</dt>
            <dd>
              <div className="flex">
                <Link to={"/my-review"}>
                  <div className="flex flex-col items-center border-r border-primary pr-4 text-sm">
                    <span>리뷰</span>
                    <span className="font-semibold">{reviewData && reviewData?.length}</span>
                  </div>
                </Link>
                <Link to={"/follow"}>
                  <div className="flex flex-col items-center border-r border-primary px-4 text-sm">
                    <span>팔로잉</span>
                    <span className="font-semibold">{followData && followData[0].followings.length}</span>
                  </div>
                </Link>
                <Link to={"/follow"}>
                  <div className="flex flex-col items-center pl-4 text-sm">
                    <span>팔로워</span>
                    <span className="font-semibold">{followData && followData[0].followers.length}</span>
                  </div>
                </Link>
              </div>
            </dd>
          </div>

          <div className="absolute right-0 top-3 flex items-center gap-2">
            <button type="button" onClick={handleLogout}>
              <IoLogOutOutline aria-label="로그아웃" title="로그아웃" className="text-2xl text-secondary" />
            </button>
          </div>
        </dl>
      </div>
    </div>
  );
}

export default Profile;
