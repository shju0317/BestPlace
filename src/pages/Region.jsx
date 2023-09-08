import { FaSearch } from "react-icons/fa";
// import RegionList from "../components/Region/RegionList";
// import RegionSearch from "../components/Region/RegionSearch";

let suggestRegionList = [
  { name: "부천 상동", tag: "자주 방문한" },
  { name: "부천역", tag: "함께 추천하는" },
  { name: "부평역", tag: "함께 추천하는" },
  { name: "영종도", tag: "함께 추천하는" },
  { name: "홍익대", tag: "함께 추천하는" },
  { name: "합정역", tag: "함께 추천하는" },
  { name: "신촌역", tag: "함께 추천하는" },
  { name: "망리단길", tag: "함께 추천하는" },
  { name: "망원 한강공원", tag: "함께 추천하는" },
  { name: "난지 한강공원", tag: "함께 추천하는" },
  { name: "홍대입구역", tag: "함께 추천하는" },
  { name: "윤중로 벚꽃길", tag: "자주 검색한" },
  { name: "경의선숲길", tag: "자주 검색한" },
  { name: "공덕역", tag: "자주 검색한" },
];

/* -------------------------------------------------------------------------- */

// 검색바
function SearchRegion() {
  return (
    <div className="my-5 flex items-center justify-between gap-2 rounded-xl border border-black px-4 py-2 focus:outline-none">
      <label htmlFor="searchRegion" className="text-xl">
        <FaSearch />
      </label>
      <input
        type="search"
        id="searchRegion"
        placeholder="원하는 지역을 검색해 보세요"
        className="grow text-base focus:outline-none"
      />
    </div>
  );
}

function RegionSelectedList() {
  return (
    <>
      <h3>내 관심 지역 {}</h3>
    </>
  );
}

function RegionSuggestList() {
  return (
    <ul className="suggestList mx-auto flex w-[95%] flex-wrap justify-between gap-3">
      {suggestRegionList.map((region, index) => (
        <li
          key={index}
          className="suggestListItem relative flex grow basis-2/5 flex-row items-center justify-between rounded-lg bg-neutral-200 p-4"
          aria-label={region.name + "를 관심 지역에 추가"}
        >
          <label htmlFor="suggestList">
            <h4 className="sr-only">{region.name}</h4>
            <p className="text-xs font-semibold text-gray-500">{region.tag}</p>
            <p className="suggestListTitle text-base font-bold">{region.name}</p>
            <span className="absolute right-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 bg-check"></span>
          </label>
          <input type="checkbox" className="suggestListCheckbox sr-only" id="category" />
        </li>
      ))}
    </ul>
  );
}

function RegionMostSearchList() {
  return <></>;
}

/* -------------------------------------------------------------------------- */

function Region() {
  return (
    <div className="max-w-3xl">
      {/* 창 닫기 */}
      <button type="button" className="ml-[calc(100%-14px)] mr-0">
        X
      </button>
      {/* 제목 */}
      <h2 className="text-2xl font-bold">관심 지역을 설정해주세요!</h2>
      {/* 검색바 */}
      <SearchRegion />
      {/* 내 관심지역 */}
      <RegionSelectedList />
      {/* '이런 지역 어때요' 리스트 */}
      <RegionSuggestList />
      {/* '요즘 많이 찾아봐요' 리스트 */}
      <RegionMostSearchList />
    </div>
  );
}

export default Region;
