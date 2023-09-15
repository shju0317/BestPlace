import { useEffect, useState } from 'react';
import { readRecordOne } from '@u/readRecordList'

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