import { calcDay, dateFormat, timeFormat } from "@/utils";
import { array, object } from "prop-types";
import { BsCalendarWeek } from "react-icons/bs";



//@ 현재 예약중 리스트
function ReservedList({ reservedList, userInfo }) {
  return (
    <div className="mb-8 border-b border-dashed border-gray-500/50 pb-8">
      <h3 className="mb-4 mt-2 text-lg font-bold">
        <BsCalendarWeek className="mr-2 inline align-bottom text-3xl" />
        <span className="mx-0.5 text-secondary">{userInfo.nickname}</span>님이 현재 예약한 정보에요
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
  userInfo: object,
};

export default ReservedList;