import SwiperCategory from "@/components/SwiperCategory";
import { BsChevronDown } from "react-icons/bs";
import { MdFoodBank, MdOutlineCheck } from "react-icons/md";
import { PiCalendarCheckBold, PiCalendarXBold, PiNumberSquareOneFill } from "react-icons/pi";

/* -------------------------------------------------------------------------- */

//@ 현재 예약중 리스트
function ReservedList() {
  return (
    <div className="p-4 border-2 border-primary">
      
    </div>
  );
}


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
  //TODO 추후 데이터 렌더링으로 가져올 것
  let name = "LION";
  let count = "33";

  return (
    <div className="max-w-md">
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
        {name}님은 LION PLACE로 {count}회 예약했어요
      </h3>

      {/* 예약 횟수 */}
      <ReservationCount />
      {/* 예약 리스트 */}
      <ReservationList />
    </div>
  );
}

export default Reservation;
