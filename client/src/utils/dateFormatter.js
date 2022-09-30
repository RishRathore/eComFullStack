import moment from "moment";

export function formatDate(dt) {
  const formateDate = `${moment(dt).format("DD MMMM YYYY")}`;

  return formateDate;
}