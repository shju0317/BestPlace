//이메일 양식에 맞는지 판별하는 정규표현식
const emailReg =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//문자/숫자/특수문자가 하나 이상 있으며 8~16자리인지 판별하는 정규표현식
const pwReg = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{8,16}$/;

//소문자/대문자/숫자로 이루어져 있는지 확인하는 정규표현식
const idReg = /^[a-zA-Z0-9]{4,20}$/;

export function isIdRegVaild(text) {
  return idReg.test(text);
}

export function isEmailRegVaild(text) {
  return emailReg.test(text);
}

export function isPwRegVaild(text) {
  return pwReg.test(text);
}
