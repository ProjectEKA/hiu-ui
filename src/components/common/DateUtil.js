import moment from "moment";

const compareDates = (dStr1, dStr2) => {
  if (dStr1 === dStr2) {
    return 0;
  }
  if (dStr1 === '-' && dStr2 !== '-') {
    return 1;
  }

  if (dStr1 !== '-' && dStr2 === '-') {
    return -1;
  }

  const d1 = moment(dStr1, 'DD/MM/YYYY HH:mm', true).toDate();
  const d2 = moment(dStr2, 'DD/MM/YYYY HH:mm', true).toDate();

  if (d1 < d2){
    return -1;
  }
  return (d1 === d2 ? 0 : 1);
};

export default compareDates;
