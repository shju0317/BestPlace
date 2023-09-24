import { useState } from "react";
import { pb, read, update } from "@/api/pocketbase";
import { useNavigate } from "react-router-dom";
import { isRegValid, alertReg, alertMessage } from "@u/index";
import SignTitle from "@c/SignInUp/SignTitle";
import SignInput from "@c/SignInUp/SignInput";
import SignPhoto from "@c/SignInUp/SignPhoto";
import SignButton from "@c/SignInUp/SignButton";
import SignForm from "@c/SignInUp/SignForm";
import Header from "./../layout/header";
// import SignContents from "@c/SignInUp/SignContents";
// import { produce } from "immer";
// import Profile from "./../components/Profile";
// import ReviewPhoto from "@/components/Review/ReviewPhoto";
// import { getPbImageURL } from "./../utils/getPbImageURL";

function Register() {
  const navigate = useNavigate();

  // const [pw, setPw] = useState();
  const [avatar, setAvatar] = useState(pb.authStore.model.avatar);
  const [nickname, setNickname] = useState(pb.authStore.model.nickname);
  const [username, setUsername] = useState(pb.authStore.model.username);
  const [email, setEmail] = useState(pb.authStore.model.email);

  const updateData = {
    avatar: avatar,
    nickname: nickname,
    username: username,
    email: email,
  };

  let formData = new FormData();

  async function isUsed(field, value) {
    const fieldData = await read("users", field);
    const fieldObj = fieldData.items;
    const fieldArr = fieldObj.map((item) => item[field]);
    return fieldArr.includes(value);
  }

  function appendFormData() {
    for (const [key, value] of Object.entries(updateData)) {
      formData.append(key, value);
    }
  }

  async function handleUserDataUpdate() {
    for (const [key, value] of Object.entries(updateData)) {
      console.log(value === pb.authStore.model[key]);

      if (!(value === pb.authStore.model[key])) {
        if (await isUsed(key, value)) {
          alertMessage(`이미 사용중인 닉네임입니다.`);
          return;
        }
        if (!isRegValid(key, value)) {
          alertReg(key);
          return;
        }
      }
    }

    appendFormData();
    await update("users", pb.authStore.model.id, formData);
    navigate("/");
    // console.log("done");
  }
  // async function getPw() {
  //   let pw0 = await read("users", "", pb.authStore.model.id);
  //   pw0 = pw0.items;
  //   console.log(pw0);
  // }
  // console.log(avatar);
  // console.log(pb.authStore.model.avatar);
  // console.log(getPbImageURL(pb.authStore.model, pb.authStore.model.avatar));
  return (
    <div className="relative min-h-screen pb-28">
      <Header />
      <main className="mx-auto max-w-3xl px-3 py-10">
        <SignTitle value="프로필 설정" />

        <SignForm>
          <SignPhoto
            labelValue=""
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
            placeHolder="새 별명을 입력하세요"
            type="text"
            inputValue={setNickname}
            bgColor="bg-white"
            textColor="text-black"
            placeHolderColor="placeholder-gray-400"
          />
          {/* <SignInput
            labelValue="상태메세지"
            ariaText="상태메세지 입력창"
            placeHolder="새 상태메세지를 입력하세요"
            inputValue={setNickname}
            bgColor="bg-white"
            textColor="text-black"
            placeHolderColor="placeholder-gray-400"
          /> */}
          <input type="text" className="hidden"></input>
        </SignForm>

        <div className="flex gap-3 py-6">
          <SignButton value="취소" handleEvent={() => navigate("/")} bgColor="bg-white" textColor="text-red-600" />
          <SignButton
            value="수정완료"
            handleEvent={() => handleUserDataUpdate()}
            bgColor="bg-primary"
            textColor="text-white"
          />
        </div>
      </main>
    </div>
  );
}

export default Register;

{
  /* <SignTitle value="위험" />
        <SignInput
        labelValue="아이디"
        ariaText="아이디 입력창"
        placeHolder="사용할 새 아이디를 입력하세요"
        inputValue={setUsername}
        bgColor="bg-white"
        textColor="text-black"
        placeHolderColor="placeholder-black"
        />
        <SignInput
        labelValue="비밀번호"
        ariaText="아이디 입력창"
        placeHolder="아이디 변경을 위해서는 비밀번호를 입력해야 합니다"
        inputValue={setPw}
        bgColor="bg-white"
        textColor="text-black"
        placeHolderColor="placeholder-black"
      /> */
}
{
  /* <SignInput
          labelValue="email"
          ariaText="아이디 입력창"
          placeHolder="사용할 새 이메일을 입력하세요"
          inputValue={setEmail}
          bgColor="bg-white"
          textColor="text-black"
          placeHolderColor="placeholder-black"
        /> */
}
{
  /* <SignButton value="탈퇴" handleEvent={() => getPw()} bgColor="bg-white" textColor="text-red-600" /> */
}
