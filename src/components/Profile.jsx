import { pb } from "@/api/pocketbase";
import { getPbImageURL } from "@/utils";
import { IoLogOutOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

function Profile() {
  const userInfo = pb.authStore.model;
  console.log(userInfo);
  // const { data: user } = useUserInfo(userInfo.id);

  return (
    <div className="mx-auto my-8 flex max-w-3xl justify-start px-6">
      <div className="flex flex-col items-center mx-auto sm:mx-0">
        <dl className="flex items-center justify-center gap-x-6 gap-y-2">
          <div>
            <dt className="sr-only">내 프로필 사진</dt>
            <dd className="h-24 w-24 rounded-full bg-gray-300">
              <img
                src={getPbImageURL(userInfo, userInfo.avatar)}
                alt="유저 프로필 사진"
                className="h-24 w-24 rounded-full object-cover"
              />
            </dd>
          </div>
          <div className="flex grow flex-col gap-3">
            <div className="flex items-center justify-center">
              <dt className="sr-only">내 닉네임</dt>
              <dd className="grow items-center justify-between text-2xl mx-2 font-bold">{userInfo.nickname}</dd>
              <Link to="/login" aria-label="로그아웃" title="로그아웃">
                <IoLogOutOutline className="text-2xl" />
              </Link>
            </div>
            <dt className="sr-only">나의 활동</dt>
            <dd>
              <dl className="flex">
                <div className="box-content w-14 border-r border-primary pr-2 text-center">
                  <dt className="">리 뷰</dt>
                  {/* PR 후 useVisitData 에서 호출 */}
                  <dd className="font-semibold">9</dd>
                </div>
                <div className="box-content w-16 border-r border-primary px-1.5 text-center">
                  <dt className="">팔로잉</dt>
                  <dd className="font-semibold">2</dd>
                </div>
                <div className="box-content w-14 pl-2 text-center">
                  <dt className="">팔로워</dt>
                  <dd className="font-semibold">2</dd>
                </div>
              </dl>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

export default Profile;
