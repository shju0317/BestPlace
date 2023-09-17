import { pb } from "@/api/pocketbase";
import SwiperCategory from "@/components/SwiperCategory";
import { BsCalendarWeek, BsChevronDown } from "react-icons/bs";
import { MdFoodBank, MdOutlineCheck } from "react-icons/md";
import { PiCalendarCheckBold, PiCalendarXBold, PiNumberSquareOneFill } from "react-icons/pi";
import { array } from "prop-types";
import Spinner from "@/components/Spinner";
import useReservationList from "@/hooks/useReservationList.js";
import { dateFormat, timeFormat } from "@/utils";
import { calcDay } from "./../utils/getDate";

/* -------------------------------------------------------------------------- */

//@ 현재 예약중 리스트
function ReservedList({ reservedList }) {
  return (
    <ul>
      {reservedList.map((item, index) => (
        <li key={index} className="my-5 rounded-2xl border-2 border-primary p-4">
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
  );
}

ReservedList.propTypes = {
  reservedList: array,
};

/* -------------------------------------------------------------------------- */

//@ 예약 횟수 컴포넌트
function ReservationCount() {
  return (
    <div className="">
      <div>
        <div className="flex justify-between">
          <h4 className="font-semibold">
            <PiNumberSquareOneFill className="mr-1 inline align-top text-2xl" /> 상호명
          </h4>
          <p className="font-bold">27회</p>
        </div>
        <div className="mt-3 h-1 w-full rounded-md bg-gray-200">
          <div className="h-1 w-[54%] rounded-md bg-primary" />
        </div>
      </div>

      <button type="button" className="mx-auto my-5 flex items-center gap-1">
        <span>더보기</span> <BsChevronDown />
      </button>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

// 예약방문 아이콘
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

//@ 예약 리스트
function ReservationList() {
  return (
    <>
      <div className="flex gap-2">
        <ReservationVisitIcon />
        <div>
          <h4 className="font-bold">상호명</h4>
          <p className="text-sm font-light">
            22. 12. 24 토 <span className="mx-1 font-normal opacity-40">|</span> 오후 12:00
          </p>
        </div>
      </div>
      <div className="my-4 w-full rounded-2xl border border-gray-200/50 px-4 shadow-md">
        <div className="border-b border-dashed pb-3 pt-4">
          <p className="font-semibold">15번째, 35일만에 예약</p>
        </div>

        <div className="pb-4 pt-3">
          <p className="font-semibold">상호명</p>
        </div>
      </div>

      <button
        type="button"
        className="mx-auto my-5 flex items-center gap-1 rounded-3xl border border-gray-200 px-4 py-2 text-sm shadow-sm"
      >
        <span>내역 더보기</span> <BsChevronDown />
      </button>
    </>
  );
}

/* -------------------------------------------------------------------------- */

//@ 예약 페이지 컴포넌트
function Reservation() {
  const { data: reservation, isLoading } = useReservationList();
  let count = reservation?.length;
  let reservedList = [];
  let visitedList = [];
  let canceledList = [];
  let name = pb.authStore.model.nickname;

  reservation?.forEach((item) => {
    item.canceled === true
      ? (canceledList = [...canceledList, item])
      : item.visited === true
      ? (visitedList = [...visitedList, item])
      : (reservedList = [...reservedList, item]);
  });

  if (isLoading) return <Spinner />;

  return (
    <div>
      {/* 현재 예약중 리스트 */}
      <h3 className="my-5 text-lg font-bold">
        <BsCalendarWeek className="mr-2 inline align-bottom text-3xl" />
        <span className="mx-0.5 text-secondary">{name}</span>님이 현재 예약한 정보에요
      </h3>
      <ReservedList reservedList={reservedList} />
      {/* 카테고리 선택 */}
      <h3 className="mb-2 text-lg font-bold">
        <MdFoodBank className="mr-2 inline align-bottom text-3xl" />
        카테고리를 선택하세요
      </h3>
      {/* 스와이퍼 카테고리 */}
      <SwiperCategory />

      {/* 예약 횟수 */}
      <h3 className="my-5 text-lg font-bold">
        <MdOutlineCheck className="mr-2 inline align-bottom text-3xl" />
        <span className="text-secondary">{name}</span>님은 LION PLACE로
        <span className="text-secondary"> {count}회 </span>
        예약했어요
      </h3>

      {/* 예약 횟수 */}
      <ReservationCount />

      {/* 예약 리스트 */}
      <ReservationList />
    </div>
  );
}

export default Reservation;
