import { pb, read } from "@/api/pocketbase";
import { isRegValid, alertReg, alertMessage } from "@u/index";

async function isUsed(field, value) {
  if (field === "password") {
    return false;
  }
  const fieldData = await read("users", field);
  const fieldObj = fieldData.items;
  const fieldArr = fieldObj.map((item) => item[field]);
  return fieldArr.includes(value);
}

export async function alertUnableInput(data) {
  for (const [key, value] of Object.entries(data)) {
    if (!isRegValid(key, value)) {
      alertReg(key);
      return;
    }
    if (await isUsed(key, value)) {
      alertMessage(`이미 사용된 ${key}입니다`);
      return;
    }
  }
}
