import pb from "@/api/pocketbase";
import { useState } from "react";

import SignTitle from "@c/SignInUp/SignTitle";
import SignInput from "@c/SignInUp/SignInput";
import SignButton from "@c/SignInUp/SignButton";

import { read, create } from "@u";

function Login() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  let idPw = [id, pw];

  console.log(idPw);

  async function getIds(pb) {
    const users = await pb.collection("users").getList(1, 99);
    const ids = users.items.map((item) => item.username);
    return ids;
  }
  function isId() {}

  async function setLogIn(pb, idPw) {
    await pb.collection("users").authWithPassword(...idPw);
    console.log(pb.authStore.model.nickname);
  }

  function setLogOut(pb) {
    pb.authStore.clear();
    console.log("Logout");
  }

  return (
    <>
      <SignTitle value="로그인" />

      <SignInput labelValue="아이디" ariaText="아이디 입력창" placeHolder="아이디를 입력하세요" inputValue={setId} />
      <SignInput
        labelValue="비밀번호"
        ariaText="비밀번호 입력창"
        placeHolder="비밀번호를 입력하세요"
        inputValue={setPw}
      />
      <br />

      <SignButton value="로그아웃" handleEvent={() => setLogOut(pb)} />
      <br />
      <SignButton value="로그인" handleEvent={() => setLogIn(pb, idPw)} />
      <br />
      <SignButton value="회원가입(미완)" handleEvent={() => setLogOut(pb)} />
    </>
  );
}

export default Login;
