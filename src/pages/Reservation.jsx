import { pb } from "@/api/pocketbase";
import Spinner from "@/components/Spinner";
import SwiperCategory from "@/components/SwiperCategory";
import useReservationList from "@/hooks/useReservationList.js";
import { dateFormat, timeFormat } from "@/utils";
import { array, bool, func, string } from "prop-types";
import { useState } from "react";
import { BsCalendarWeek, BsChevronDown, BsChevronUp } from "react-icons/bs";
import { MdFoodBank, MdOutlineCheck } from "react-icons/md";
import { PiCalendarCheckBold, PiCalendarXBold } from "react-icons/pi";
import { calcDay } from "./../utils/getDate";

/* -------------------------------------------------------------------------- */

//@ 현재 예약중 리스트
function ReservedList({ reservedList, nickname }) {
  return (
    <div className="border-b border-dashed border-gray-500/50 pb-6">
      <h3 className="mb-4 mt-2 text-lg font-bold">
        <BsCalendarWeek className="mr-2 inline align-bottom text-3xl" />
        <span className="mx-0.5 text-secondary">{nickname}</span>님이 현재 예약한 정보에요
      </h3>

      <ul>
        {reservedList.map((item, index) => (
          <li key={index} className="my-2 rounded-2xl border-2 border-primary p-4">
            <p className="inline rounded-xl bg-primary px-1.5 py-0.5 text-xs font-bold text-white">
              {calcDay(item.date)}
            </p>
            <h4 className="mt-1 font-bold">{item.expand.place.title}</h4>
            <p className="text-sm font-light">
              {dateFormat(item.date)} <span className="mx-1 font-normal opacity-40">|</span>
              {timeFormat(item.date)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

ReservedList.propTypes = {
  reservedList: array,
  nickname: string,
};

/* -------------------------------------------------------------------------- */

//@ 예약 횟수 컴포넌트
function ReservationCount({ nickname, visitedList }) {
  const [isSeeMore, setIsSeeMore] = useState(false);
  let renderList = !isSeeMore ? visitedList.slice(0, 3) : visitedList.slice(0, 9);
  // const [filterList, setFilterList] = useState(renderList);

  function handleClickButton() {
    setIsSeeMore(!isSeeMore);
  }

  return (
    <div className="my-12">
      <h3 className="my-5 text-lg font-bold">
        <MdOutlineCheck className="mr-2 inline align-bottom text-3xl" />
        <span className="mx-0.5 text-secondary">{nickname}</span>님은 LION PLACE로
        <span className="text-secondary"> {visitedList?.length}회 </span>
        예약했어요
      </h3>

      <ol>
        {renderList?.map((item, index) => (
          <li key={index} className="mb-6">
            <div className="flex items-center justify-between">
              <span className="mr-2 w-6 items-center rounded-lg border-2 bg-black text-center text-sm font-bold text-white">
                {index + 1}
              </span>
              <h4 className="grow font-semibold">{item.expand.place.title}</h4>
              <p className="font-bold">27회</p>
            </div>
            <div className="mt-2 h-1 w-full rounded-md bg-gray-200">
              <div className={`h-1 w-[50%] rounded-md bg-primary`} />
              {/* ${Math.floor((2 / filterList?.length) * 100)} */}
            </div>
          </li>
        ))}
      </ol>

      <label
        htmlFor="seeMoreButton"
        className={`mx-auto my-5 flex cursor-pointer items-center justify-center gap-1 ${
          renderList.length < 3 ? "hidden" : ""
        }`}
      >
        <input type="checkbox" className="sr-only" onChange={handleClickButton} id="seeMoreButton" />
        <span>{!isSeeMore ? "더보기" : "접기"}</span>
        {!isSeeMore ? <BsChevronDown /> : <BsChevronUp />}
      </label>
    </div>
  );
}

ReservationCount.propTypes = {
  nickname: string,
  visitedList: array,
};

/* -------------------------------------------------------------------------- */

//@ 예약 리스트
function ReservationList({ progressList, visitedList, canceledList }) {
  let renderList = progressList;
  let filter = "all";

  function ReservationVisitIcon() {
    return (
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
        <PiCalendarCheckBold className="text-3xl text-white" />
      </div>
    );
  }

  // 예약취소 아이콘
  function ReservationCancelIcon() {
    return (
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-500">
        <PiCalendarXBold className="text-3xl text-white" />
      </div>
    );
  }

  return (
    <>
      <button type="button">전체</button>
      <button type="button">방문</button>
      <button type="button">예약 취소</button>
      <button type="button" className="flex items-center">
        기간 선택
        <BsCalendarWeek className="ml-2 text-primary"/>
      </button>

      <ul>
        {renderList.map((item, index) => (
          <li key={index} className="my-8">
            <div className="flex gap-2">
              {!item.canceled ? <ReservationVisitIcon /> : <ReservationCancelIcon />}
              <div>
                <h4 className="font-bold">{item.expand.place.title}</h4>
                <p className="text-sm font-light">
                  {dateFormat(item.date)} <span className="mx-1 font-normal opacity-40">|</span> {timeFormat(item.date)}
                </p>
              </div>
            </div>
            <div className="my-2 w-full rounded-2xl border border-gray-200/50 px-4 shadow-md">
              <div className="border-b border-dashed pb-3 pt-4">
                <p className="font-semibold">15번째, 35일만에 예약</p>
              </div>
              <div className="pb-4 pt-3">
                <p className="font-semibold text-gray-600">{item.expand.place.category}</p>
                <p className="font-bold">{item.expand.place.title}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="mx-auto my-5 flex items-center gap-1 rounded-3xl border border-gray-200 px-4 py-2 text-sm shadow-sm"
      >
        <span>내역 더보기</span> <BsChevronDown />
      </button>
    </>
  );
}

ReservationList.propTypes = {
  progressList: array,
  visitedList: array,
  canceledList: array,
};

/* -------------------------------------------------------------------------- */

//@ 예약 페이지 컴포넌트
function Reservation() {
  let nickname = pb.authStore.model.nickname;
  const { data: reservation, isLoading } = useReservationList();
  let reservedList = [];
  let progressList = [];
  let visitedList = [];
  let canceledList = [];

  reservation?.forEach((item) => {
    !item.canceled && !item.visited
      ? (reservedList = [...reservedList, item])
      : (progressList = [...progressList, item]);
  });

  progressList.forEach((item) => {
    !item.canceled ? (visitedList = [...visitedList, item]) : (canceledList = [...canceledList, item]);
  });

  if (isLoading) return <Spinner />;

  return (
    <div>
      {/* 현재 예약중 리스트 */}
      <ReservedList nickname={nickname} reservedList={reservedList.reverse()} />
      {/* 카테고리 선택 */}
      <div className="my-6">
        <h3 className="mb-2 text-lg font-bold">
          <MdFoodBank className="mr-2 inline align-bottom text-3xl" />
          카테고리를 선택하세요
        </h3>
        <SwiperCategory />
      </div>

      {/* 예약 횟수 */}
      <ReservationCount nickname={nickname} visitedList={visitedList} />

      {/* 예약 리스트 */}
      <ReservationList progressList={progressList} visitedList={visitedList} canceledList={canceledList} />
    </div>
  );
}

export default Reservation;