import { useState } from "react";
import { pb, read, update } from "@/api/pocketbase";
import { useNavigate } from "react-router-dom";

import SignTitle from "@c/SignInUp/SignTitle";
import SignInput from "@c/SignInUp/SignInput";
import SignButton from "@c/SignInUp/SignButton";
import SignForm from "@c/SignInUp/SignForm";
import SignContents from "@c/SignInUp/SignContents";
import { produce } from "immer";
import Profile from "./../components/Profile";

function Register() {
  const navigate = useNavigate();

  const [nickname, setNickname] = useState();
  const [avatar, setAvatar] = useState();
  const [username, setUsername] = useState();

  const UserDataFormat = {
    id: "",
    collectionName: "users",
    collectionId: "_pb_users_auth_",
    emailVisibility: false,
    verified: false,
    created: "2023-08-31 06:35:29.391Z",
    updated: "2023-08-31 06:35:29.391Z",
    follower: [],
    following: [],
    favorites: [],
    review: [],
    username: "id와 같음",
    nickname: "별명",
    email: "",
    password: "",
    passwordConfirm: "",
    avatar: "",
    regions: [],
  };

  const updateData = {
    nickname: nickname,
    username: username,
    avatar: avatar,
  };

  return (
    <div className="flex flex-col gap-20 py-10">
      <SignTitle value="회원정보 업데이트" />

      <SignForm>
        <SignInput
          labelValue="새 별명"
          ariaText="이메일 입력창"
          placeHolder="사용할 새 별명을 입력하세요"
          inputValue={setNickname}
          bgColor="bg-white"
          textColor="text-black"
          placeHolderColor="placeholder-black"
        />
        <SignInput
          labelValue="새 프로필 사진"
          ariaText="아이디 입력창"
          placeHolder="클릭하면 사진입력하는 기능 추가할것"
          inputValue={setAvatar}
          bgColor="bg-white"
          textColor="text-black"
          placeHolderColor="placeholder-black"
        />
        <SignInput
          labelValue="새 아이디"
          ariaText="아이디 입력창"
          placeHolder="로그인에 사용할 새 아이디"
          inputValue={setUsername}
          bgColor="bg-white"
          textColor="text-black"
          placeHolderColor="placeholder-black"
        />
      </SignForm>

      <div className="flex gap-2">
        <SignButton value="취소" handleEvent={() => navigate("/Feed")} bgColor="bg-white" textColor="text-red-600" />
        <SignButton
          value="수정완료"
          handleEvent={() => update("users", pb.authStore.model.id, updateData)}
          bgColor="bg-primary"
          textColor="text-white"
        />
      </div>
    </div>
  );
}

export default Register;
