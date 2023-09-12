import PocketBase from "pocketbase";

import SignTitle from "@c/SignInUp/SignTitle";
import SignButton from "@c/SignInUp/SignButton";

function TestLogin() {
  const pb = new PocketBase("https://lionplace-db.pockethost.io/");

  let idPw = ["abc", "12341234"];
  let idPw2 = ["www", "12341234"];

  async function setAuthAdmin(pb) {
    const authData = await pb.admins.authWithPassword("qqqqmmss11@gmail.com", "asdf@@1234");
    console.log(pb.authStore.model.email);
  }

  async function setLogIn(pb, idPw0) {
    let authData = await pb.collection("users").authWithPassword(...idPw0);
    console.log(pb.authStore.model.username);
  }

  function setLogOut(pb) {
    pb.authStore.clear();
    console.log("Logout");
  }

  function getPb(pb) {
    pb.authStore.model?.username ? console.log(pb.authStore.model.username) : console.log("no user");
  }

  function getLocalStorageAuth() {
    const pocketbase_auth = JSON.parse(localStorage.getItem("pocketbase_auth"));
    pocketbase_auth ? console.log(pocketbase_auth.model) : console.log("no Local Storage");
  }

  return (
    <>
      <SignTitle value="테스트 로그인" />
      <SignButton value="로그인 - 관리자, 로컬 스토리지로만 확인가능" handleEvent={() => setAuthAdmin(pb)} />
      <br />
      <SignButton value="로그인 - abc" handleEvent={() => setLogIn(pb, idPw)} />
      <br />
      <SignButton value="로그인 - www" handleEvent={() => setLogIn(pb, idPw2)} />
      <br />
      <SignButton value="로그 아웃" handleEvent={() => setLogOut(pb)} />
      <br />
      <SignButton value="유저 확인" handleEvent={() => getPb(pb)} />
      <br />
      <SignButton value="로컬 스토리지 확인" handleEvent={() => getLocalStorageAuth()} />
    </>
  );
}

export default TestLogin;
