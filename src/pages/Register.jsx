import { pb, read, create, update, setLogIn } from "@/api/pocketbase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { alertMessage, alertUnableInput, isRegValid } from "@u/index";

import SignTitle from "@c/SignInUp/SignTitle";
import SignInput from "@c/SignInUp/SignInput";
import SignButton from "@c/SignInUp/SignButton";
import SignForm from "@c/SignInUp/SignForm";
import SignContents from "@c/SignInUp/SignContents";
import SignLogo from "@c/SignInUp/SignLogo";
import { useEffect } from "react";

function Register() {
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [nickname, setNickname] = useState("");
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
    nickname: nickname,
    username: id,
    email: email,
    password: pw,
    passwordConfirm: pwCheck,
  };

  async function handleRegister() {
    alertUnableInput(createData)

    if(pw !== pwCheck && isRegValid("password", pw)){
      alertMessage("비밀번호가 일치하지 않습니다")
    }
    await create("users", createData);
    await setLogIn([id, pw]);
    await create("follow", { owner: pb.authStore.model.id});
    globalThis.location.href = "/";
    
  }
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
       handleRegister() 
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    // Don't forget to cleanup after component unmounts
    return () => window.removeEventListener('keydown', handleKeyDown);
  });
  return (
    <SignContents>
      <SignLogo />
      <SignTitle value="회원가입" />
      <SignForm>
        <SignInput labelValue="별명" ariaText="별명 입력창" placeHolder="별명을 입력하세요" inputValue={setNickname} />
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
          placeHolder="비밀번호를 입력하세요"
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
