import { pb } from "@/api/pocketbase";
import ReservationCount from "@/components/ReservationList/ReservationCount";
import ReservationList from "@/components/ReservationList/ReservationList";
import ReservedList from "@/components/ReservationList/ReservedList";
import useReservationList from "@/hooks/useReservationList.js";

//@ 예약 페이지 컴포넌트
function Reservation() {
  let userInfo = pb.authStore.model;
  const { data: reservation } = useReservationList();
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

  return (
    <div>
      {/* 현재 예약중 리스트 */}
      <ReservedList userInfo={userInfo} reservedList={reservedList.reverse()} />

      {/* 예약 횟수 */}
      <ReservationCount userInfo={userInfo} visitedList={visitedList} />

      {/* 예약 리스트 */}
      <ReservationList
        userInfo={userInfo}
        progressList={progressList}
        visitedList={visitedList}
        canceledList={canceledList}
      />
    </div>
  );
}

export default Reservation;
