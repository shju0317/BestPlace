import { pb, read, create, update, setLogIn } from "@/api/pocketbase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isEmailRegVaild, isPwRegVaild, isIdRegVaild, alertMessage } from "@u/index";

import SignTitle from "@c/SignInUp/SignTitle";
import SignInput from "@c/SignInUp/SignInput";
import SignButton from "@c/SignInUp/SignButton";
import SignForm from "@c/SignInUp/SignForm";
import SignContents from "@c/SignInUp/SignContents";
import SignLogo from "@c/SignInUp/SignLogo";

function Register() {
  const navigate = useNavigate();

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

  const createData = {
    username: id,
    email: email,
    password: pw,
    passwordConfirm: pwCheck,
  };

  async function handleRegister() {
    switch (true) {
      case !isIdRegVaild(id):
        alertMessage("아이디는 소문자/대문자/숫자로 이루어진 4~20자리 문자여야 합니다");
        break;
      case !isEmailRegVaild(email):
        alertMessage("사용가능한 이메일 양식이 아닙니다");
        break;
      case !isPwRegVaild(pw):
        alertMessage("비밀번호는 숫자/영어/특수문자를 포함하는 8~16자리 양식이어야 합니다");
        break;
      case !(pw === pwCheck):
        alertMessage("비밀번호가 일치하지 않습니다");
        break;
    }

    console.log(createData)
    await create("users", createData);
    await setLogIn([id, pw]);
    // globalThis.location.href = "/";
  }
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
          type= "password"
        />
        <SignInput
          labelValue="비밀번호 확인"
          ariaText="비밀번호 재입력창"
          placeHolder="비밀번호를 다시 입력하세요"
          inputValue={setPwCheck}
          type= "password"
        />
      </SignForm>

      <div className="flex flex-col gap-2 max-w-3xl w-full">
        <SignButton value="회원가입" handleEvent={() => handleRegister()} bgColor="bg-white" textColor="text-black" />
        <SignButton value="로그인" handleEvent={() => navigate("/")} />
      </div>
    </SignContents>
  );
}

export default Register;
