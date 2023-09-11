// const visitedPlaces = [
//   {
//     id: 'visited-1',
//     name: '투썸플레이스 상무번영로점',
//     subject: '카페',
//     location: '광주광역시 서구 치평동'
//   },
//   {
//     id: 'visited-2',
//     name: '스테이_STAY',
//     subject: '양식',
//     location: '광주광역시 북구 중흥동'
//   }
// ]

// import { read, create } from "@/utils";

import { useEffect, useState } from 'react';
import { readRecordList, readRecordOne } from '@u/readRecordList'

function VisitedPlace() {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await readRecordOne("places","zxuv5vm0v8b5wph");
        setData(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="border-b-[1px] pb-2 w-full self-center">
      <h1 className="text-lg font-semibold">{data.title}</h1>
      <p>{data.category}<span className="mx-1">|</span>{data.address}</p>
    </div>
  )
}

export default VisitedPlace