import { alertMessage } from "@/utils";

//이메일 양식에 맞는지 판별하는 정규표현식
const emailReg =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//문자/숫자/특수문자가 하나 이상 있으며 8~16자리인지 판별하는 정규표현식
const pwReg = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{8,16}$/;

//소문자/대문자/숫자로 이루어져 있는지 확인하는 정규표현식
const idReg = /^[a-zA-Z0-9]{4,20}$/;

// 전화번호 양식에 맞는지 판별하는 정규표현식
// const telReg = /^(01[016789])-(\d{3,4})-(\d{4})$|^02-(\d{3,4})-(\d{4})$|^\d{2,3}-\d{3,4}-\d{4}$|^\d{2,3}\-\d{4}\-\d{4}$/;
const telReg = /^01[016789]-?\d{3,4}-?\d{4}$/;

export function isIdRegValid(text) {
  return idReg.test(text);
}

export function isEmailRegValid(text) {
  return emailReg.test(text);
}

export function isPwRegValid(text) {
  return pwReg.test(text);
}

export function isTelRegValid(text){
  return telReg.test(text);
}

export function isRegValid(key, value) {
  switch (true) {
    case key === "nickname":
      return idReg.test(value);
    case key === "username":
      return idReg.test(value);
    case key === "email":
      return emailReg.test(value);
    case key === "pw":
      return pwReg.test(value);
    default:
      return true;
  }
}
export function alertReg(key) {
  switch (true) {
    case key === "username":
      alertMessage("아이디는 소문자/대문자/숫자로 이루어진 4~20자리 문자여야 합니다");
      break;
    case key === "nickname":
      alertMessage("별명은 소문자/대문자/숫자로 이루어진 4~20자리 문자여야 합니다");
      break;
    case key === "email":
      alertMessage("사용가능한 이메일 양식이 아닙니다");
      break;
    case key === "pw":
      alertMessage("비밀번호는 숫자/영어/특수문자를 포함하는 8~16자리 양식이어야 합니다");
      break;
  }
}
