import { useState } from "react";
import { pb, read, update } from "@/api/pocketbase";
import { useNavigate } from "react-router-dom";

import SignTitle from "@c/SignInUp/SignTitle";
import SignInput from "@c/SignInUp/SignInput";
import SignPhoto from "@c/SignInUp/SignPhoto";
import SignButton from "@c/SignInUp/SignButton";
import SignForm from "@c/SignInUp/SignForm";
import SignContents from "@c/SignInUp/SignContents";
import { produce } from "immer";
import Profile from "./../components/Profile";
import ReviewPhoto from "@/components/Review/ReviewPhoto";

function Register() {
  const navigate = useNavigate();

  const [nickname, setNickname] = useState(pb.authStore.model.nickname);
  const [avatar, setAvatar] = useState(pb.authStore.model.avatar);
  const [username, setUsername] = useState(pb.authStore.model.username);

  const updateData = {
    nickname: nickname,
    avatar: avatar,
    Username: username,
  };

  let formData = new FormData();

  function appendFormData() {
    for (const [key, value] of Object.entries(updateData)) {
      formData.append(key, value);
    }
  }
  function handleUserDataUpdate() {
    appendFormData();
    update("users", pb.authStore.model.id, formData);
    navigate("/")
  }

  return (
    <div className="flex flex-col gap-20 py-10">
      <SignTitle value="회원정보 업데이트" />

      <SignForm>
        <SignPhoto
          labelValue="프로필 사진"
          ariaText="새 프로필 사진 입력창"
          placeHolder=""
          inputValue={setAvatar}
          bgColor="bg-white"
          textColor="text-black"
          placeHolderColor="placeholder-black"
        />
        <SignInput
          labelValue="별명"
          ariaText="별명 입력창"
          placeHolder="사용할 새 별명을 입력하세요"
          inputValue={setNickname}
          bgColor="bg-white"
          textColor="text-black"
          placeHolderColor="placeholder-black"
        />
        <SignInput
          labelValue="아이디"
          ariaText="아이디 입력창"
          placeHolder="로그인에 사용할 새 아이디"
          inputValue={setUsername}
          bgColor="bg-white"
          textColor="text-black"
          placeHolderColor="placeholder-black"
        />
      </SignForm>

      <div className="flex gap-2">
        <SignButton value="취소" handleEvent={() => navigate("/")} bgColor="bg-white" textColor="text-red-600" />
        <SignButton
          value="수정완료"
          handleEvent={() => handleUserDataUpdate()}
          bgColor="bg-primary"
          textColor="text-white"
          />
      </div>
    </div>
  );
}

export default Register;