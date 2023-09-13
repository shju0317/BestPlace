import { PiPencilSimpleLineDuotone } from "react-icons/pi";
import { IoLogOutOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

function Profile() {
  return (
    <div className="flex  justify-center">
      <div className="flex flex-col items-center">
        <dl className="grid w-[320px] justify-center gap-x-6 gap-y-2">
          <dt className="sr-only">내 프로필</dt>
          <dd className="col-start-1 row-start-1 row-end-3 h-16 w-16 rounded-full bg-gray-300"></dd>
          <dt className="sr-only">내 닉네임</dt>
          <dd className="col-start-2 flex items-center justify-between text-xl font-bold">
            개미
            <Link to="/login">
              <button aria-label="로그아웃" title="로그아웃">
                <IoLogOutOutline className="text-2xl" />
              </button>
            </Link>
          </dd>
          <dt className="sr-only">나의 활동</dt>
          <dd>
            <dl className="flex">
              <div className="border-r border-[rgba(4,160,124,.8)] pr-3">
                <dt className="text-sm">리뷰</dt>
                <dd className="text-center">9</dd>
              </div>

              <div className="border-r border-[rgba(4,160,124,.8)] px-3">
                <dt className="text-sm">팔로잉</dt>
                <dd className="text-center">2</dd>
              </div>
              <div className="pl-3">
                <dt className="text-sm">팔로워</dt>
                <dd className="text-center">2</dd>
              </div>
            </dl>
          </dd>
        </dl>
        <Link to="/reviewwrite">
          <div className="mt-3 flex w-[300px] justify-between gap-2">
            <button className="flex w-full items-center justify-center gap-1 rounded-xl bg-secondary py-2 text-sm">
              <PiPencilSimpleLineDuotone className="text-base" />
              리뷰 쓰기
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Profile;
