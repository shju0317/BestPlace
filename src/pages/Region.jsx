import { pb, read, update } from "@/api/pocketbase";
import debounce from "@/utils/debounce";
import { array, bool, func, object } from "prop-types";
import { useEffect } from "react";
import { useRef, useState } from "react";
import { FaLocationArrow, FaSearch } from "react-icons/fa";
import { GoChevronLeft, GoX } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { suggestRegionList, popularRegionList, locations } from "./../data/regions";

/* -------------------------------------------------------------------------- */

//@ 검색바
function SearchRegion({ ...props }) {
  const checkedRegionList = props.checkedRegionList;
  const isFocusSearchBar = props.isFocusSearchBar;
  const inputRef = useRef("");
  const [isSearch, setIsSearch] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  const toggleInputSearch = () => {
    if (inputRef.current.value) {
      setIsSearch(true);
      setSearchResult(locations.filter((region) => region.includes(inputRef.current.value)));
    } else {
      setIsSearch(false);
      setSearchResult([]);
    }
  };

  // 검색 결과 초기화
  function resetSearchState() {
    inputRef.current.value = "";
    setIsSearch(false);
    setSearchResult([]);
  }

  // 텍스트 삭제 버튼 클릭 이벤트
  const handleClickRemoveText = () => {
    resetSearchState();
  };

  // 페이지 뒤로가기 버튼 클릭 이벤트
  const handleClickPageBack = () => {
    props.onFocus(false);
    resetSearchState();
  };

  // 검색 창에서 리전 추가
  const handleUpdateRegion = (e) => {
    let regionName = e.target.closest("li").querySelector("h4").innerText;

    props.onUpdate(
      !checkedRegionList.find((i) => i === regionName)
        ? [...checkedRegionList, regionName]
        : checkedRegionList.filter((i) => i !== regionName)
    );

    props.onFocus(false);
    resetSearchState();
  };

  // 검색창 포커스 시 이벤트
  const handleFocusSearchBar = () => {
    if (isFocusSearchBar === false) props.onFocus(true);
  };

  return (
    <>
      <div className="flex items-center gap-1">
        {!isFocusSearchBar || (
          <button type="button" onClick={handleClickPageBack} className="ml-1 px-1 text-4xl">
            <GoChevronLeft />
          </button>
        )}
        <div
          className={`flex grow items-center justify-between gap-2 rounded-xl border border-black px-4 py-3 focus:outline-none ${
            !isFocusSearchBar || "border-2"
          }`}
        >
          <label htmlFor="searchRegion">
            <FaSearch />
          </label>
          <input
            type="text"
            id="searchRegion"
            placeholder="원하는 지역을 검색해 보세요"
            className="grow appearance-none text-base focus:outline-none"
            onFocus={handleFocusSearchBar}
            onChange={debounce((e) => toggleInputSearch(e.target.value), 500)}
            ref={inputRef}
            role="searchbox"
          />
          {!isFocusSearchBar || (
            <button type="button" onClick={handleClickRemoveText}>
              <GoX className="text-xl" />
            </button>
          )}
        </div>
      </div>
      <div className={`mt-28 flex flex-col items-center ${!isSearch || "hidden"} ${isFocusSearchBar || "hidden"}`}>
        <img src="/search-guide.png" alt="현재 페이지가 검색 페이지임을 알리는 이미지" className="mb-2" />
        <p className="text-lg font-bold">지역명을 검색해서</p>
        <p className="text-lg font-bold">관심지역으로 설정할 수 있어요!</p>
        <p className="mt-2 text-sm font-semibold text-gray-500">예) 서울, 해운대구, 경주시 등</p>
      </div>
      <div className="mt-4">
        {searchResult.toSorted().map(
          (region, index) =>
            !isSearch || (
              <li key={index} className="mt-2 flex items-center justify-between gap-2 rounded-lg px-4 py-2 text-lg">
                <FaLocationArrow className="mr-2 inline-block text-primary" />
                <div className="flex grow items-center justify-start">
                  <h4 className="font-bold">{region}</h4>
                  {!checkedRegionList.includes(region) || (
                    <span className="mx-2 rounded-lg bg-gray-600 p-1 text-xs text-white">내 관심지역</span>
                  )}
                </div>
                <button
                  type="button"
                  className={`h-5 w-5 bg-contain ${!checkedRegionList.includes(region) ? "bg-check" : "bg-checked"}`}
                  onClick={handleUpdateRegion}
                ></button>
              </li>
            )
        )}
      </div>
    </>
  );
}

SearchRegion.propTypes = {
  checkedRegionList: array,
  isFocusSearchBar: bool,
  onFocus: func,
  onUpdate: func,
};

/* -------------------------------------------------------------------------- */

//@ 내 관심지역
function RegionSelectedList({ ...props }) {
  const checkedRegionList = props.checkedRegionList;

  const handleRemoveButton = (e) => {
    let regionName = e.target.closest("li").querySelector("h4").innerText;

    props.onUpdate(checkedRegionList.filter((i) => i !== regionName));
  };

  return (
    <div>
      <h3 className="text-lg font-bold">
        내 관심지역 <span className="text-primary">{checkedRegionList.length}</span>
      </h3>
      <div className="mb-4 flex">
        <p className="grow text-sm font-medium text-gray-400">길게 눌러 순서를 변경할 수 있습니다. (미구현)</p>
        <button type="button" className="text-sm font-semibold text-gray-700" onClick={props.onRemove}>
          전체 삭제
        </button>
      </div>

      <ul>
        {checkedRegionList.map((region, index) => (
          <li key={index} className="my-1 flex items-center justify-between rounded-lg border border-primary px-4 py-2">
            <FaLocationArrow className="mr-2 inline-block text-primary" />
            <h4 className="grow text-base font-bold">{region}</h4>
            <button type="button" onClick={handleRemoveButton}>
              <GoX className="text-xl" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

RegionSelectedList.propTypes = {
  checkedRegionList: array,
  onUpdate: func,
  onRemove: func,
};

/* -------------------------------------------------------------------------- */

//@ '이런 지역 어때요' 리스트
function SuggestRegionList({ ...props }) {
  const nickname = props.userData?.nickname;
  const checkedRegionList = props.checkedRegionList;

  const handleUpdateRegion = (e) => {
    // ! useRef 사용해보려 했으나 안됨... 마지막 요소가 선택됨
    let regionName = e.target.closest("li").querySelector("h4").innerText;

    props.onUpdate(
      !checkedRegionList.find((i) => i === regionName)
        ? [...checkedRegionList, regionName]
        : checkedRegionList.filter((i) => i !== regionName)
    );
  };

  return (
    <div>
      <h3 className="text-lg font-bold">이런 지역 어때요?</h3>
      <p className="my-2 mb-4">
        <span className="font-extrabold">{nickname}</span>님이 좋아하실 것 같아요
      </p>
      <ul className="grid grid-cols-2 gap-3">
        {suggestRegionList.map((region, index) => (
          <li
            key={index}
            className={`relative rounded-lg ${
              !checkedRegionList.includes(region.name) ? "bg-neutral-100" : "bg-sky-100 shadow-md"
            }`}
            aria-label={region.name + "를 관심 지역에 추가"}
          >
            <label htmlFor={"suggest " + region.name} className="block p-4">
              <p
                className={`text-xs text-gray-500 ${
                  !checkedRegionList.includes(region.name) ? "font-semibold " : "font-bold"
                }`}
              >
                {region.tag}
              </p>
              <h4 className={`${!checkedRegionList.includes(region.name) ? "font-bold " : "font-extrabold"}`}>
                {region.name}
              </h4>
              <span
                className={`absolute right-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 ${
                  !checkedRegionList.includes(region.name) ? "bg-check" : "bg-checked"
                }`}
              ></span>
              <input type="checkbox" className="sr-only" id={"suggest " + region.name} onChange={handleUpdateRegion} />
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

SuggestRegionList.propTypes = {
  checkedRegionList: array,
  userData: object,
  onUpdate: func,
};

/* -------------------------------------------------------------------------- */

//@ '요즘 많이 찾아봐요' 리스트
function PopularRegionList({ ...props }) {
  const checkedRegionList = props.checkedRegionList;

  const handleUpdateRegion = (e) => {
    // ! useRef 사용해보려 했으나 안됨... 마지막 요소가 선택됨
    let regionName = e.target.closest("li").querySelector("h4").innerText;

    props.onUpdate(
      !checkedRegionList.find((i) => i === regionName)
        ? [...checkedRegionList, regionName]
        : checkedRegionList.filter((i) => i !== regionName)
    );
  };

  return (
    <div>
      <h3 className="mb-4 text-lg font-bold">요즘 많이 찾아봐요</h3>
      <ul className="grid grid-cols-3 gap-3">
        {popularRegionList.map((region, index) => (
          <li
            key={index}
            className={`relative rounded-lg ${
              !checkedRegionList.includes(region.name) ? "bg-neutral-100" : "bg-sky-100 shadow-md"
            }`}
            aria-label={region.name + "를 관심 지역에 추가"}
          >
            <label htmlFor={"popular " + region.name} className="block flex flex-col items-center p-4">
              {/* 사진 div */}
              <img src={region.image} alt="" className="h-12 w-12 rounded-full" />
              <h4
                className={`mx-auto text-sm ${
                  !checkedRegionList.includes(region.name) ? "font-semibold " : "font-bold"
                }`}
              >
                {region.name}
              </h4>
              <span
                className={`absolute right-2 top-0 h-[18px] w-[18px] translate-y-1/2 ${
                  !checkedRegionList.includes(region.name) ? "bg-check" : "bg-checked"
                }`}
              ></span>
              <input type="checkbox" className="sr-only" id={"popular " + region.name} onChange={handleUpdateRegion} />
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

PopularRegionList.propTypes = {
  checkedRegionList: array,
  onUpdate: func,
};

/* -------------------------------------------------------------------------- */

//@ 저장하기 버튼
function RegionSaveButton({ onClick }) {
  return (
    <div className="sticky bottom-0 z-10 bg-gradient-to-b from-white/10 from-10% to-white to-40% pb-3 pt-8">
      <button type="button" className="w-full rounded-lg bg-primary py-3 font-bold text-white" onClick={onClick}>
        이대로 저장할래요
      </button>
    </div>
  );
}

RegionSaveButton.propTypes = {
  onClick: func,
};

/* -------------------------------------------------------------------------- */

//@ Region Component
function Region() {
  const userInfo = pb.authStore.model;
  const navigate = useNavigate();
  const [checkedRegionList, setCheckedRegionList] = useState([]);
  const [isFocusSearchBar, setIsFocusSearchBar] = useState(false);
  const [userData, setUserData] = useState();

  useEffect(() => {
    async function fetchUserData() {
      let data = await read("users", "", userInfo.id);
      setUserData(data);
      setCheckedRegionList(data.regions);
    }

    fetchUserData();
  }, []);

  const handleUpdateRegionList = (region) => {
    setCheckedRegionList(region);
  };

  const handleRemoveRegionList = () => {
    setCheckedRegionList([]);
  };

  const handleFocusSearchBar = (isFocus) => {
    setIsFocusSearchBar(isFocus);
  };

  const settingRegionList = () => {
    update("users", userInfo.id, { regions: checkedRegionList });
    navigate("/피드");
  };

  // console.log(checkedRegionList);

  return (
    <div className="max-w-3xl">
      <div className="sticky top-0 z-10 bg-gradient-to-b from-white from-80% to-white/10 to-90% pb-8">
        {isFocusSearchBar || (
          <div>
            {/* 창 닫기 */}
            <button type="button" className="float-right">
              <GoX className="text-3xl" />
            </button>
            {/* 제목 */}
            <h2 className="mb-3 pt-8 text-2xl font-bold">관심지역을 설정해주세요!</h2>
          </div>
        )}
        {/* 검색바 */}
        <SearchRegion
          checkedRegionList={checkedRegionList}
          isFocusSearchBar={isFocusSearchBar}
          onFocus={handleFocusSearchBar}
          onUpdate={handleUpdateRegionList}
        />
      </div>
      {isFocusSearchBar || (
        <div className="flex flex-col gap-8">
          {/* 내 관심지역 */}
          <RegionSelectedList
            checkedRegionList={checkedRegionList}
            onUpdate={handleUpdateRegionList}
            onRemove={handleRemoveRegionList}
          />
          {/* '이런 지역 어때요' 리스트 */}
          <SuggestRegionList
            userData={userData}
            checkedRegionList={checkedRegionList}
            onUpdate={handleUpdateRegionList}
          />
          {/* '요즘 많이 찾아봐요' 리스트 */}
          <PopularRegionList checkedRegionList={checkedRegionList} onUpdate={handleUpdateRegionList} />
          {/* 저장하기 버튼 */}
          <RegionSaveButton onClick={settingRegionList} />
        </div>
      )}
    </div>
  );
}

export default Region;
