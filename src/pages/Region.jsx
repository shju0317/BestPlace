import { array, object, shape } from "prop-types";
import { useRef } from "react";
import { useState } from "react";
import { FaLocationArrow, FaSearch } from "react-icons/fa";
import { GoX } from "react-icons/go";

let suggestRegionList = [
  { name: "서울 서대문구", tag: "자주 방문한" },
  { name: "서울 마포구", tag: "함께 추천하는" },
  { name: "서울 강남구", tag: "함께 추천하는" },
  { name: "경기 가평군", tag: "함께 추천하는" },
  { name: "경기 성남시", tag: "함께 추천하는" },
  { name: "경기 수원시", tag: "함께 추천하는" },
  { name: "인천 강화도", tag: "함께 추천하는" },
  { name: "대구 중구", tag: "함께 추천하는" },
  { name: "충남 태안군", tag: "자주 검색한" },
  { name: "전남 목포시", tag: "자주 검색한" },
  { name: "전남 여수시", tag: "자주 검색한" },
];

let popularRegionList = [
  { name: "제주 제주시", image: "" },
  { name: "경북 경주시", image: "" },
  { name: "전북 전주시", image: "" },
  { name: "서울 마포구", image: "" },
  { name: "서울 종로구", image: "" },
  { name: "부산 해운대구", image: "" },
  { name: "강원 강릉시", image: "" },
  { name: "경기 수원시", image: "" },
  { name: "전남 순천시", image: "" },
  { name: "경북 포항시", image: "" },
  { name: "경남 거제시", image: "" },
  { name: "충북 천안시", image: "" },
  { name: "충북 청주시", image: "" },
  { name: "서울 강남구", image: "" },
  { name: "강원 속초시", image: "" },
  { name: "전남 여수시", image: "" },
  { name: "경기 남양주시", image: "" },
  { name: "경기 파주시", image: "" },
  { name: "경기 성남시", image: "" },
  { name: "부산 수영구", image: "" },
  { name: "서울 광진구", image: "" },
  { name: "전북 군산시", image: "" },
];

// prettier-ignore
let locations = ["서울 종로구", "서울 중구", "서울 용산구", "서울 성동구", "서울 광진구", "서울 동대문구", "서울 중랑구", "서울 성북구", "서울 강북구", "서울 도봉구", "서울 노원구", "서울 은평구", "서울 서대문구", "서울 마포구", "서울 양천구", "서울 강서구", "서울 구로구", "서울 금천구", "서울 영등포구", "서울 동작구", "서울 관악구", "서울 서초구", "서울 강남구", "서울 송파구", "서울 강동구", "부산 중구", "부산 서구", "부산 동구", "부산 영도구", "부산 부산진구", "부산 동래구", "부산 남구", "부산 북구", "부산 해운대구", "부산 사하구", "부산 금정구", "부산 강서구", "부산 연제구", "부산 수영구", "부산 사상구", "부산 기장군", "대구 중구", "대구 동구", "대구 서구", "대구 남구", "대구 북구", "대구 수성구", "대구 달서구", "대구 달성군", "인천 중구", "인천 동구", "인천 남구", "인천 미추홀구", "인천 연수구", "인천 남동구", "인천 부평구", "인천 계양구", "인천 서구", "인천 강화군", "인천 옹진군", "광주 동구", "광주 서구", "광주 남구", "광주 북구", "광주 광산구", "대전 동구", "대전 중구", "대전 서구", "대전 유성구", "대전 대덕구", "울산 중구", "울산 남구", "울산 동구", "울산 북구", "울산 울주군", "세종시", "경기 수원시", "경기 성남시", "경기 고양시", "경기 용인시", "경기 부천시", "경기 안산시", "경기 안양시", "경기 남양주시", "경기 화성시", "경기 평택시", "경기 의정부시", "경기 시흥시", "경기 파주시", "경기 광명시", "경기 김포시", "경기 군포시", "경기 광주시", "경기 이천시", "경기 양주시", "경기 오산시", "경기 구리시", "경기 안성시", "경기 포천시", "경기 의왕시", "경기 하남시", "경기 여주시", "경기 여주군", "경기 양평군", "경기 동두천시", "경기 과천시", "경기 가평군", "경기 연천군", "강원 춘천시", "강원 원주시", "강원 강릉시", "강원 동해시", "강원 태백시", "강원 속초시", "강원 삼척시", "강원 홍천군", "강원 횡성군", "강원 영월군", "강원 평창군", "강원 정선군", "강원 철원군", "강원 화천군", "강원 양구군", "강원 인제군", "강원 고성군", "강원 양양군", "충북 청주시", "충북 충주시", "충북 제천시", "충북 청원군", "충북 보은군", "충북 옥천군", "충북 영동군", "충북 진천군", "충북 괴산군", "충북 음성군", "충북 단양군", "충북 증평군", "충남 천안시", "충남 공주시", "충남 보령시", "충남 아산시", "충남 서산시", "충남 논산시", "충남 계룡시", "충남 당진시", "충남 당진군", "충남 금산군", "충남 연기군", "충남 부여군", "충남 서천군", "충남 청양군", "충남 홍성군", "충남 예산군", "충남 태안군", "전북 전주시", "전북 군산시", "전북 익산시", "전북 정읍시", "전북 남원시", "전북 김제시", "전북 완주군", "전북 진안군", "전북 무주군", "전북 장수군", "전북 임실군", "전북 순창군", "전북 고창군", "전북 부안군", "전남 목포시", "전남 여수시", "전남 순천시", "전남 나주시", "전남 광양시", "전남 담양군", "전남 곡성군", "전남 구례군", "전남 고흥군", "전남 보성군", "전남 화순군", "전남 장흥군", "전남 강진군", "전남 해남군", "전남 영암군", "전남 무안군", "전남 함평군", "전남 영광군", "전남 장성군", "전남 완도군", "전남 진도군", "전남 신안군", "경북 포항시", "경북 경주시", "경북 김천시", "경북 안동시", "경북 구미시", "경북 영주시", "경북 영천시", "경북 상주시", "경북 문경시", "경북 경산시", "경북 군위군", "경북 의성군", "경북 청송군", "경북 영양군", "경북 영덕군", "경북 청도군", "경북 고령군", "경북 성주군", "경북 칠곡군", "경북 예천군", "경북 봉화군", "경북 울진군", "경북 울릉군", "경남 창원시", "경남 마산시", "경남 진주시", "경남 진해시", "경남 통영시", "경남 사천시", "경남 김해시", "경남 밀양시", "경남 거제시", "경남 양산시", "경남 의령군", "경남 함안군", "경남 창녕군", "경남 고성군", "경남 남해군", "경남 하동군", "경남 산청군", "경남 함양군", "경남 거창군", "경남 합천군", "제주 제주시", "제주 서귀포시", "제주 북제주군", "제주 남제주군"]

/* -------------------------------------------------------------------------- */

//@ 검색바
function SearchRegion() {
  const inputRef = useRef("");
  const [inputText, setInputText] = useState();

  // 텍스트 삭제 버튼 클릭 이벤트
  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      setInputText("");
    }
  };

  return (
    <div className="flex items-center justify-between gap-2 rounded-xl border border-black px-4 py-2 focus:outline-none">
      <label htmlFor="searchRegion">
        <FaSearch />
      </label>
      <input
        type="search"
        id="searchRegion"
        placeholder="원하는 지역을 검색해 보세요"
        className="grow appearance-none text-base focus:outline-none"
        ref={inputRef}
      />
      <button type="button" onClick={handleClick}>
        <GoX className="text-xl" />
      </button>
    </div>
  );
}

//@ 내 관심지역
function RegionSelectedList(props) {
  const checkedRegionList = props.checkedRegionList;

  const handleDeleteRegion = (e) => {
    let regionName = e.target.closest("li").querySelector("h4").innerText;

    props.onUpdate(checkedRegionList.filter((i) => i !== regionName));
  };

  return (
    <div>
      <h3 className="text-lg font-bold">
        내 관심지역 <span className="text-primary">{checkedRegionList.length}</span>
      </h3>
      <div className="flex">
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
            <button type="button" onClick={handleDeleteRegion}>
              <GoX className="text-xl" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

//@ '이런 지역 어때요' 리스트
function SuggestRegionList(props) {
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
      <h3 className="font-bold">이런 지역 어때요?</h3>
      <p className="my-2 text-sm">
        <span className="font-bold">ㅇㅇ</span>님이 좋아하실 것 같아요
      </p>
      <ul className="grid grid-cols-2 gap-3">
        {suggestRegionList.map((region, index) => (
          <li
            key={index}
            className={`relative rounded-lg ${
              !checkedRegionList.includes(region.name) ? "bg-neutral-100" : "bg-sky-100"
            }`}
            aria-label={region.name + "를 관심 지역에 추가"}
          >
            <label htmlFor={"suggest " + region.name} className="block p-4">
              <p className={`text-xs font-semibold text-gray-500`}>{region.tag}</p>
              <h4 className={`font-bold`}>{region.name}</h4>
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

//@ '요즘 많이 찾아봐요' 리스트
function PopularRegionList(props) {
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
      <h3 className="font-bold">요즘 많이 찾아봐요</h3>
      <ul className="grid grid-cols-3 gap-3">
        {popularRegionList.map((region, index) => (
          <li
            key={index}
            className={`relative rounded-lg ${
              !checkedRegionList.includes(region.name) ? "bg-neutral-100" : "bg-sky-100"
            }`}
            aria-label={region.name + "를 관심 지역에 추가"}
          >
            <label htmlFor={"popular " + region.name} className="block flex flex-col items-center p-4">
              {/* 사진 div */}
              <img src="" alt="" className="h-12 w-12" />
              <h4 className="mx-auto text-sm font-bold">{region.name}</h4>
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
  props: shape({
    checkedRegionList: array,
    onUpdate: object,
  }),
};

/* -------------------------------------------------------------------------- */

//@ Region Component
function Region() {
  const [checkedRegionList, setCheckedRegionList] = useState([]);

  const handleUpdateRegionList = (region) => {
    setCheckedRegionList(region);
  };

  const handleRemoveRegionList = () => {
    setCheckedRegionList([]);
  };

  return (
    <div className="max-w-3xl">
      <div className="sticky top-0 z-10 bg-white">
        {/* 창 닫기 */}
        <button type="button" className="float-right">
          <GoX className="text-3xl" />
        </button>
        {/* 제목 */}
        <h2 className="mb-3 text-2xl font-bold">관심지역을 설정해주세요!</h2>
        {/* 검색바 */}
        <SearchRegion />
        <div className="h-4 bg-white opacity-50"></div>
      </div>
      <div className="flex flex-col gap-8">
        {/* 내 관심지역 */}
        <RegionSelectedList
          checkedRegionList={checkedRegionList}
          onUpdate={handleUpdateRegionList}
          onRemove={handleRemoveRegionList}
        />
        {/* '이런 지역 어때요' 리스트 */}
        <SuggestRegionList checkedRegionList={checkedRegionList} onUpdate={handleUpdateRegionList} />
        {/* '요즘 많이 찾아봐요' 리스트 */}
        <PopularRegionList checkedRegionList={checkedRegionList} onUpdate={handleUpdateRegionList} />
      </div>
    </div>
  );
}

export default Region;
