import { useState } from "react";

import SignTitle from "@c/SignInUp/SignTitle";
import SignInput from "@c/SignInUp/SignInput";
import SignButton from "@c/SignInUp/SignButton";
import SignForm from "@c/SignInUp/SignForm";
import SignContents from "@c/SignInUp/SignContents";
import { pb, read, create, update } from "@/api/pocketbase";
import SignLogo from "@c/SignInUp/SignLogo";

function Register() {
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pwCheck, setPwCheck] = useState("");

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

  const userData = {
    username: id,
    email: email,
    password: pw,
    passwordConfirm: pwCheck,

  };
  const updateData = {
    nickname: "업데이트된 닉네임",
    //email이 업데이트 되지 않는 이슈
    // email: "ccc@ccc.com"
  };

  return (
    <SignContents>
      <SignLogo />
      <SignTitle value="회원가입" />
      <SignForm>
        <SignInput labelValue="아이디" ariaText="아이디 입력창" placeHolder="아이디를 입력하세요" inputValue={setId} />
        <SignInput
          labelValue="이메일"
          ariaText="이메일 입력창"
          placeHolder="이메일을 입력하세요"
          inputValue={setEmail}
        />
        <SignInput
          labelValue="비밀번호"
          ariaText="비밀번호 입력창"
          placeHolder="비밀번호의 길이는 8자리 이상"
          inputValue={setPw}
        />
        <SignInput
          labelValue="비밀번호 확인"
          ariaText="비밀번호 재입력창"
          placeHolder="비밀번호를 다시 입력하세요"
          inputValue={setPwCheck}
        />
      </SignForm>
      {/* <SignButton value="업데이트" handleEvent={() => update("users", pb.authStore.model.id, updateData)} /> */}
      <SignButton
        value="회원가입"
        handleEvent={() => create("users", userData)}
        bgColor="bg-white"
        textColor="text-black"
      />
      {/* <SignButton value="아이디 목록" handleEvent={() => read("users")} /> */}
    </SignContents>
  );
}

export default Register;
