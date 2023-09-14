import _ from "lodash";
import { useCategoryStore } from "@s/category";

export const useFilterCategory = (fetchData) => {
  let data = [];
  let filteredData = [];
  const category = useCategoryStore((state) => state.category);

  fetchData && (filteredData = _.cloneDeep(fetchData));
  filteredData.forEach((el) => {
    const filteredItems = el.items.filter((el) => category.includes(el.expand.place.category));
    el.items = [...filteredItems];
  });

  if (category.includes("전체")) data = fetchData;
  else data = filteredData;

  return data;
};
