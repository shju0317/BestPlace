import { pb, read, update } from "@/api/pocketbase";
import RegionSaveButton from "@/components/Region/RegionSaveButton";
import SearchRegion from "@/components/Region/SearchRegion";
import SelectedRegionList from "@/components/Region/SelectedRegionList";
import SuggestRegion from "@/components/Region/SuggestRegion";
import { useEffect, useState } from "react";
import { GoX } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import PopularRegion from "./../components/Region/PopularRegion";

//@ Set Region Component
function SetRegion() {
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

  const setRegionList = () => {
    update("users", userInfo.id, { regions: checkedRegionList });
    navigate("/피드");
  };

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
          <SelectedRegionList
            checkedRegionList={checkedRegionList}
            onUpdate={handleUpdateRegionList}
            onRemove={handleRemoveRegionList}
          />
          {/* '이런 지역 어때요' 리스트 */}
          <SuggestRegion userData={userData} checkedRegionList={checkedRegionList} onUpdate={handleUpdateRegionList} />
          {/* '요즘 많이 찾아봐요' 리스트 */}
          <PopularRegion checkedRegionList={checkedRegionList} onUpdate={handleUpdateRegionList} />
          {/* 저장하기 버튼 */}
          <RegionSaveButton onClick={setRegionList} />
        </div>
      )}
    </div>
  );
}

export default SetRegion;
