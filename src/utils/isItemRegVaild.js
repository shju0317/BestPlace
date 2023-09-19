//이메일 양식에 맞는지 판별하는 정규표현식
const emailReg =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  //문자/숫자/특수문자가 하나 이상 있으며 8~16자리인지 판별하는 정규표현식
const pwReg = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{8,16}$/;

export function isEmailRegVaild(text) {
  return emailReg.test(text);
}

export function isPwRegVaild(text) {
  return pwReg.test(text);
}
