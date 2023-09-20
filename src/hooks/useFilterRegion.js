import _ from "lodash";
import { useRegionStore } from "@/store/region";

export const useFilterRegion = (fetchData) => {
  let data = [];
  let filteredData = [];
  const region = useRegionStore((state) => state.region);
  fetchData && (filteredData = _.cloneDeep(fetchData));
  filteredData.forEach((el) => {
    const filteredItems = el.items.filter((el) => el.expand.place.address.includes(region));
    el.items = [...filteredItems];
  });

  if (region === "전체") data = fetchData;
  else data = filteredData;

  return data;
};
