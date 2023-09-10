export const getDate = (date, format) => {
  date = new Date(date);
  const map = {
    mm: date.getMonth() + 1,
    dd: date.getDate(),
    yy: date.getFullYear().toString().slice(-2),
    yyyy: date.getFullYear(),
    day: getDay(date.getDay()),
  };

  return format.replace(/mm|dd|yy|yyy|day/gi, (matched) => map[matched]);
};

export const getDay = (date) => {
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  return week[date];
};
